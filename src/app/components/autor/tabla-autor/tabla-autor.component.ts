import { Component, OnInit } from '@angular/core';
import { OrderBy, RecalculateTableParams } from 'desy-angular';
import { Autor } from 'src/app/models/autor';
import { Libro } from 'src/app/models/libro';
import { AutorService } from 'src/app/services/services/autor.service';
import { LibroService } from 'src/app/services/services/libro.service';
import { SearchUtils } from 'src/app/utils/search-utils';

@Component({
  selector: 'app-tabla-autor',
  templateUrl: './tabla-autor.component.html',
  styleUrls: ['./tabla-autor.component.css']
})
export class TablaAutorComponent implements OnInit {

  isEnabled: boolean= false;
  listAutor: Autor[];
  listLibrosAut: Libro[];
  visibleAutor: Autor[] = [];
  autorMandar: Autor;
  checked: boolean = false;
  columnOrder = ['dni', 'nombre', 'telefono', 'email'];
  listLibrosExcel: Autor[] = [];
  pageCompanyList: Autor[] = [] ;
  currentCompanyPage = 1; 
  companyPageElems = 5;

  marcarDes: string = 'Marcar todos';

  
  
  constructor(private autorService: AutorService, private libroService: LibroService) { 
    this.listAutor = [];
    this.listLibrosAut= [];
  
    this.autorMandar = {
      dni: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      telefono: '',
      email: ''
    }   
    
  }

  ngOnInit(): void {
    this.autorService.getAutor().subscribe(result =>{ 
      if (result.success){
        this.listAutor = result.message;
        debugger
        this.visibleAutor = this.listAutor;
        this.pageCompanyList = this.listAutor;
      } else{
        let error = result.error;
        console.log("Error al recoger las categorias", error);
      }
    });
  }

  marcarTodos(){
    debugger
    this.checked=!this.checked;
    if(!this.checked){
      this.listLibrosExcel = [];
      this.marcarDes = 'Marcar todos';
    }else{
      this.listLibrosExcel = this.listAutor;
      this.marcarDes = 'Desmarcar todos';
    }
  }



  addToArray(autor: Autor){
    const found = this.listLibrosExcel.includes(autor);
    const libroFound = this.listLibrosExcel.find(element => element.dni === autor.dni);
  
    if(found===false){
      this.listLibrosExcel.push(autor);
    }else{
      // this.listLibrosExcel.forEach((element, i) =>{
      const nuevaArray = this.listLibrosExcel.filter(element => element.dni !== libroFound?.dni)
      this.listLibrosExcel = nuevaArray;
      
      // });
    }
  }

  borrarSeleccionados(){
    if(this.listLibrosExcel){
      if(confirm("¿Estás seguro de que quieres borrar estos autores? Esto eliminará libros asociados a ellos.")){
      this.autorService.deleteMultipleAutor(this.listLibrosExcel).subscribe((result) =>{
        if(result.success){
          alert("Los libros se han eliminado correctamente");
        window.location.reload();
        }else{
          alert(result.error);
        }
      });
      }

    }else{
      alert("Tienes que seleccionar al menos un libro")
    }

  }


  borrarAutor(autor: Autor): void{
    
    this.libroService.getLibrobyAutor(autor.dni).subscribe(result =>{ 
      if(result.success){
        this.listLibrosAut = result.message;

        var mensaje = this.listLibrosAut.length>0 
        ? "¿Estás seguro de que quieres borrar la categoría: \n'"+autor.dni+". " + autor.nombre+"'? Esto borrara "+ this.listLibrosAut.length+ " libro(s) con esta categoría." 
        : "¿Estás seguro de que quieres borrar la categoría: \n'"+autor.dni+". " + autor.nombre+"'?";
   
        if(confirm(mensaje)){
          if(result.success){
            this.autorService.deleteAutor(autor.dni).subscribe(result =>{
              if(result.success){
                window.alert("Se ha borrado la categoría con exito")
                window.location.reload();
              }else{
                console.log("Error al borrar la categoria");
              }
          });
          }
        }
           
      }else{
        console.log("Error al encontrar los libros por categoria");
      }
      
    });
  }



  handleRecalculateCompanyTable(recalculateParams: RecalculateTableParams): void {
    debugger
    let rows = this.listAutor;
    recalculateParams.filters.forEach(filter => {
      rows = rows.filter(row =>
          SearchUtils.containsAnyWordFrom(this.getCellString(row, filter.columnIndex) + '', filter.filterText));
    });

    if (recalculateParams.sort) {
      const columnIndex = recalculateParams.sort.columnIndex;
      const isAsc = recalculateParams.sort.order === OrderBy.asc;
      rows = rows.sort((a, b) =>
          this.compareCellContent(this.getCellString(a, columnIndex), this.getCellString(b, columnIndex), isAsc));
    }

    this.visibleAutor=rows;
    this.pageCompanyList = rows.slice((this.currentCompanyPage - 1) * this.companyPageElems,
      Math.min(this.currentCompanyPage * this.companyPageElems, this.listAutor.length));
  }

  handleCompanyPagChange(page: number): void {
    this.pageCompanyList = this.visibleAutor.slice((page - 1) * this.companyPageElems,
        Math.min(page * this.companyPageElems, this.listAutor.length));
    this.currentCompanyPage = page;
  }

  getCellString(row:any, columnIndex: number): string {
    if (columnIndex === 0) {
      return row.dni + '';
    } else if (columnIndex === 1) {
      return row.nombre+''+row.apellido1+''+row.apellido2;
    } else if (columnIndex === 2) {
      return row.telefono;
    }else if (columnIndex === 3) {
      return row.email;
    }
    return row.name;
  }

  /**
   * Compara el contenido de dos celdas. Este se invierte si el orden especificado es descendente.
   */
  compareCellContent(a: string, b: string, isAsc: boolean): number{
    let result;

    if (isNaN(+a) && isNaN(+b) ) { // son textos
      result = a.localeCompare(b, 'es', { sensitivity: 'base', ignorePunctuation: true });
    }else{ // son numeros
      result = a.localeCompare(b, undefined, { numeric: true });
    }

    return result * (isAsc ? 1 : -1);
  }

}
