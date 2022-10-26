import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Autor } from 'src/app/models/autor';
import { Categoria } from 'src/app/models/categoria';
import { Libro } from 'src/app/models/libro';
import { AutorService } from 'src/app/services/services/autor.service';
import { CategoriaService } from 'src/app/services/services/categoria.service';
import { LibroService } from 'src/app/services/services/libro.service';

export interface Fecha{
  day: string,
  month: string,
  year: string
}
@Component({
  selector: 'app-form-libro',
  templateUrl: './form-libro.component.html',
  styleUrls: ['./form-libro.component.css']
})

export class FormLibroComponent implements OnInit {
  // libroForm : FormGroup;
  libro: Libro;
  listLibros: Libro[];
  listAutores: Autor[];
  listCategorias: Categoria[];
  listCategoriasSelect: Array<any> = [];
  idLibro: number;
  adding: boolean;
  open: boolean;
  fecha:Fecha;
  
  constructor(private fb: FormBuilder, private libroService: LibroService, private categoriaService: CategoriaService, 
    private autorService: AutorService, private activatedRoute: ActivatedRoute, private router: Router) { 

      this.listLibros = [];
      this.listAutores = [];
      this.listCategorias = [];
      this.idLibro = 0;
      this.adding = false;
      this.open = false;


      this.fecha={
        day:'',
        month:'',
        year:''
      }

      this.libro = {
        id: 0,
       
          titulo: '',
          edicion: 0,
          fecha_lanzamiento: '',
          autor: {dni: '', nombre: '', apellido1: '', apellido2: '', telefono: '', email: ''},
          categoria: {id: 0, descripcion: ''}
      }
  }

  ngOnInit(): void {
    this.findAutores();
    this.findCategorias();

  
    this.libroService.getLibro().subscribe(result => {
      if(result.success){
        this.listLibros=result.message;
      }else{
        console.log('Error al recoger todos los libros');
      }     
    });
    
    //Recogemos el id de la ruta
    this.activatedRoute.paramMap.subscribe((parameters: any) => { 
      this.idLibro = parameters.get('idLibro');
    }, error =>{ //que devuelve si hay error
      console.log('No hay id en la ruta o ha fallado', error)
    }, () =>{ //para hacer algo tras la ejecucion
      
    });
  

    if(!this.idLibro){ //si no hay id en la ruta significa que se esta añadiendo uno nuevo
      this.adding=true;

     
    }else{
      this.adding=false;
      //Recogemos el libro con ese id
      this.libroService.getLibroById(this.idLibro).subscribe(result => {
        if(result.success){
          this.libro = result.message;
    
          
          let arrayFecha=this.libro.fecha_lanzamiento.split('/')
          this.fecha={
            day: arrayFecha[0],
            month: arrayFecha[1],
            year: arrayFecha[2],
          }
  
          
          // debugger
          // this.buildLibroForm();
        }else{
          console.log("Error al encontrar el libro por id");
        this.adding = true;
        }
      });
    }
  }

  findAutores(){
    this.open=true;
    this.autorService.getAutor().subscribe(result =>{  //recogemos todos los autores
      if (result.success){
        this.listAutores = result.message;
      } else{
        let error = result.error;
        console.log("Error al encontrar el autor por dni", error);
      }
    });
  }

  findCategorias(){
    this.categoriaService.getCategoria().subscribe(result =>{  //recogemos todos las categorias
      if (result.success){
        this.listCategorias = result.message;
        if (this.listCategorias.length){
          this.listCategoriasSelect.push({ //por cada categoria creamos un objeto en la nueva array con texto y valor
            text: '-',
            value: '-'
          }    
        )
          this.listCategorias.forEach(categoria => {
            this.listCategoriasSelect.push({ //por cada categoria creamos un objeto en la nueva array con texto y valor
                text: categoria.id + '. ' + categoria.descripcion,
                value: categoria.id
              }    
            )
          })
        }
      } else{
        let error = result.error;
        console.log("Error al recoger las categorias", error);
      }
    });
  }
  

  guardarLibro(): void{
    //encuentra y guarda el autor de listAutores que tenga la misma dni que en el formulario
    const autor1 = this.listAutores.find(item => item.dni === this.libro.autor.dni);
    
    // if (autor1) values.autor = autor1;
    const categoria1 = this.listCategorias.find(item => item.id === this.libro.categoria.id);
    // if (categoria1) this.libro.categoria = categoria1;

    // si ambos existen
    
    this.libro.fecha_lanzamiento = this.fecha.day+'/'+this.fecha.month+'/'+this.fecha.year;

    if(this.adding){
      debugger
      this.libroService.addLibro(this.libro).subscribe(result =>{ 
        if(result.success){
          window.alert("El libro se ha guardado con éxito");
          this.router.navigate(['/inicio/libro']);
        }else{
          window.alert(result.error);
        }   
      });
    }else{
      debugger
      this.libroService.updateLibro(this.libro, this.libro.id).subscribe(result =>{ 
        debugger
        if(result.success){
          window.alert("El libro se ha editado con éxito");
          this.router.navigate(['/inicio/libro']);
        }else{
          window.alert(result.error);
        }   
      });
    }
  }

  

}
