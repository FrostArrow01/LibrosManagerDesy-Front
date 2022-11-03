import { Component, OnInit } from '@angular/core';
import { OrderBy, RecalculateTableParams } from 'desy-angular';
import { Categoria } from 'src/app/models/categoria';
import { Libro } from 'src/app/models/libro';
import { CategoriaService } from 'src/app/services/services/categoria.service';
import { LibroService } from 'src/app/services/services/libro.service';
import { SearchUtils } from 'src/app/utils/search-utils';

@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css']
})
export class TablaCategoriaComponent implements OnInit {

  isEnabled: boolean= false;
  listCategorias: Categoria[];
  formularioAct: boolean;
  categoriaMandar: Categoria;
  listLibrosCat: Libro[];
  visibleCat: Categoria[] = [];
  listLibrosExcel: Categoria[] = [];
  pageCompanyList: Categoria[] = [] ;
  checked: boolean = false;
  marcarDes: string = 'Marcar todos';
  currentCompanyPage = 1; 
  companyPageElems = 5;
  
  constructor(private categoriaService: CategoriaService, private libroService: LibroService) { 
    this.listCategorias = [];
    this.listLibrosCat = [];
    this.formularioAct = false;
    this.categoriaMandar = {
      id: 0,
      descripcion: '',
    }   
    
  }

  ngOnInit(): void {
    this.categoriaService.getCategoria().subscribe(result =>{ 
      if (result.success){
        this.listCategorias = result.message;
        this.visibleCat = this.listCategorias
        this.pageCompanyList = this.listCategorias;
        this.handleCompanyPagChange(this.currentCompanyPage);
      } else{
        let error = result.error;
        console.log("Error al recoger las categorias", error);
      }
    });
  }

  marcarTodos(){
    
    this.checked=!this.checked;
    if(!this.checked){
      this.listLibrosExcel = [];
      this.marcarDes = 'Marcar todos';
    }else{
      this.listLibrosExcel = this.listCategorias;
      this.marcarDes = 'Desmarcar todos';
    }
  }

  addToArray(categoria: Categoria){
    const found = this.listLibrosExcel.includes(categoria);
    const libroFound = this.listLibrosExcel.find(element => element.id === categoria.id);
  
    if(found===false){
      this.listLibrosExcel.push(categoria);
    }else{
      // this.listLibrosExcel.forEach((element, i) =>{
      const nuevaArray = this.listLibrosExcel.filter(element => element.id !== libroFound?.id)
      this.listLibrosExcel = nuevaArray;
      
      // });
    }
  }

  borrarSeleccionados(){
    if(confirm("¿Estás seguro de que quieres borrar estas categorías? Esto eliminará libros asociados a ellas.")){
      this.categoriaService.deleteMultipleCategoria(this.listLibrosExcel).subscribe((result) =>{
        if(result.success){
          alert("Los libros se han eliminado correctamente");
        window.location.reload();
        }else{
          alert(result.error);
        }
      });
    }
  }


  borrarCategoria(categoria: Categoria): void{
    
    this.libroService.getLibrobyCategoria(categoria.id).subscribe(result =>{ 
      if(result.success){
        this.listLibrosCat = result.message;

        var mensaje = this.listLibrosCat.length>0 
        ? "¿Estás seguro de que quieres borrar la categoría: \n'"+categoria.id+". " + categoria.descripcion+"'? Esto borrara "+ this.listLibrosCat.length+ " libro(s) con esta categoría." 
        : "¿Estás seguro de que quieres borrar la categoría: \n'"+categoria.id+". " + categoria.descripcion+"'?";
   
        if(confirm(mensaje)){
          if(result.success){
            this.categoriaService.deleteCategoria(categoria.id).subscribe(result =>{
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
    let rows = this.listCategorias;
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

    this.visibleCat = rows;
    this.pageCompanyList = rows.slice((this.currentCompanyPage - 1) * this.companyPageElems,
      Math.min(this.currentCompanyPage * this.companyPageElems, this.listCategorias.length));
  }

  handleCompanyPagChange(page: number): void {
    this.pageCompanyList = this.visibleCat.slice((page - 1) * this.companyPageElems,
        Math.min(page * this.companyPageElems, this.listCategorias.length));
    this.currentCompanyPage = page;
  }

  getCellString(row:any, columnIndex: number): string {
    if (columnIndex === 0) {
      return row.id + '';
    } else if (columnIndex === 1) {
      return row.descripcion;
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
