import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from 'src/app/models/autor';
import { AutorService } from 'src/app/services/services/autor.service';

@Component({
  selector: 'app-form-autor',
  templateUrl: './form-autor.component.html',
  styleUrls: ['./form-autor.component.css']
})
export class FormAutorComponent implements OnInit {
  autor: Autor;
  idAutor: string = '';
  adding: boolean = false;
  msgError: string = '';
  isnotEnabled: boolean = false;
  listAutores: Autor[] = [];
  

  constructor( private autorService: AutorService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.autor = {
      dni: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      telefono: '',
      email: ''
    }
   }

  ngOnInit(): void {
    this.recogerAutores()
    //Recogemos el id de la ruta
    this.activatedRoute.paramMap.subscribe((parameters: any) => { 
      this.idAutor = parameters.get('idAutor');
    }, error =>{ //que devuelve si hay error
      console.log('No hay id en la ruta o ha fallado', error)
    }, () =>{ //para hacer algo tras la ejecucion
      
    });

    if(!this.idAutor){ //si no hay id en la ruta significa que se esta añadiendo uno nuevo
      this.adding=true;

     
    }else{
      this.adding=false;
      //Recogemos el libro con ese id
      this.autorService.getAutorById(this.idAutor).subscribe(result => {
        if(result.success){
          this.autor = result.message;          
          // this.buildLibroForm();
        }else{
          console.log("Error al encontrar la categoría por id");
        this.adding = true;
        }
      });
    }

    if(this.autor.dni){
      
    }
  }

  recogerAutores(){
    this.autorService.getAutor().subscribe((result)=>{
      if(result.success){
        this.listAutores = result.message;
      }else{
        alert(result.error)
      }
    });
  }

  guardarAutor(){
    if(this.autor.dni && this.autor.apellido1 && this.autor.nombre){
      if(this.adding){
        debugger
        this.autorService.addAutor(this.autor).subscribe(result =>{ 
          if(result.success){
            window.alert("El autor se ha guardado con éxito");
            this.router.navigate(['/inicio/autor']);
          }else{
            window.alert(result.error);
          }   
        });
      }else{
        debugger
        this.autorService.updateAutor(this.autor, this.autor.dni).subscribe(result =>{ 
          debugger
          if(result.success){
            window.alert("El autor se ha editado con éxito");
            this.router.navigate(['/inicio/autor']);
          }else{
            window.alert(result.error);
          }   
        });
      }

    }else{
      this.msgError = "Completa al menos Dni, Nombre y Primer apellido";
    }
  }

  //Evento que señala que el dni no puede estar repetido
  keyPress(event: KeyboardEvent){
    debugger
    let presente = false;
    this.msgError='';
    this.isnotEnabled=false;

    if(this.adding == true){
      this.listAutores.forEach(element => {
        if(presente){
          return;
        }
        if(this.autor.dni===element.dni){
          presente = true;
          this.msgError="Dni repetido";
          this.isnotEnabled=true;
        }
      });
    }

  }
  
}
