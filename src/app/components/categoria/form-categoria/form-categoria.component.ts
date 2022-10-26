import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/services/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {
  categoria: Categoria;
  idCat: number;
  listCategorias: Categoria[];
  adding: boolean = true;
  pressed: boolean = false;
  msgError: string = '';
  

  constructor(private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.idCat = 0;
    this.categoria = {
      id: 0,
      descripcion: ''
    }

    this.listCategorias = [];

    
  }

  ngOnInit(): void {
    this.getCategorias();

    //Recogemos el id de la ruta
    this.activatedRoute.paramMap.subscribe((parameters: any) => { 
      this.idCat = parameters.get('idCategoria');
    }, error =>{ //que devuelve si hay error
      console.log('No hay id en la ruta o ha fallado', error)
    }, () =>{ //para hacer algo tras la ejecucion
      
    });

    if(!this.idCat){ //si no hay id en la ruta significa que se esta añadiendo uno nuevo
      this.adding=true;

     
    }else{
      this.adding=false;
      //Recogemos el libro con ese id
      this.categoriaService.getCategoriaById(this.idCat).subscribe(result => {
        if(result.success){
          this.categoria = result.message;          
          // this.buildLibroForm();
        }else{
          console.log("Error al encontrar la categoría por id");
        this.adding = true;
        }
      });
    }

  }

  getCategorias(){
    this.categoriaService.getCategoria().subscribe((result) => {
      if(result.success){
        this.listCategorias = result.message;
      }else{
        alert(result.error)
      }
    });
  }

  guardarCategoria(values: Categoria){
    if(this.categoria.descripcion){
      if(this.adding){
        debugger
        this.categoriaService.addCategoria(values).subscribe(result =>{ 
          if(result.success){
            window.alert("La categoría se ha guardado con éxito");
            this.router.navigate(['/inicio/categoria']);
          }else{
            window.alert(result.error);
          }   
        });
      }else{
        debugger
        this.categoriaService.updateCategoria(values, this.idCat).subscribe(result =>{ 
          debugger
          if(result.success){
            window.alert("La categoría se ha editado con éxito");
            this.router.navigate(['/inicio/categoria']);
          }else{
            window.alert(result.error);
          }   
        });
      }

    }else{
      this.msgError = 'Rellena el campo Descripción';
    }
  }

  toggle(event: any): void {
    this.pressed = !this.pressed;
 }

}
