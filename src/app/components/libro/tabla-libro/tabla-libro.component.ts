import { Component, OnInit } from '@angular/core';
import { OrderBy, RecalculateTableParams } from 'desy-angular';
import { Libro } from 'src/app/models/libro';
import { EmailService } from 'src/app/services/services/email.service';
import { LibroService } from 'src/app/services/services/libro.service';
import { Files } from 'src/app/utils/Files';
import { SearchUtils } from 'src/app/utils/search-utils';

@Component({
  selector: 'app-tabla-libro',
  templateUrl: './tabla-libro.component.html',
  styleUrls: ['./tabla-libro.component.css']
})
export class TablaLibroComponent implements OnInit {
  listLibros: Libro[] = [];
  visibleLibros: Libro[] = [];
  pageCompanyList: Libro[] = [] ;
  isEnabled: boolean = false;
  pressed: boolean = false;
  checked: boolean = false;
  columnOrder = ['titulo', 'edicion', 'fecha_lanzamiento', 'autor.nombre', 'categoria.descripcion'];
  listLibrosExcel: Libro[] = [];
  marcarDes: string = 'Marcar todos';

  currentCompanyPage = 1; 
  companyPageElems = 5;

  constructor( private libroService: LibroService, private emailService: EmailService) { 
    
  }

  ngOnInit(): void {
    this.recogerLibros();
    
  }

  recogerLibros(){
    this.libroService.getLibro().subscribe((result) =>{
      if(result.success){
        this.listLibros = result.message;
        this.visibleLibros = this.listLibros;
        this.pageCompanyList = this.listLibros;
        this.handleCompanyPagChange(this.currentCompanyPage);
      }else{
        alert(result.error);
      }
    });
  }

  marcarTodos(){
    
    this.checked=!this.checked;
    if(!this.checked){
      this.listLibrosExcel = [];
      this.marcarDes = 'Marcar todos';
    }else{
      this.listLibrosExcel = this.listLibros;
      this.marcarDes = 'Desmarcar todos';
    }
  }

  addToArray(libro: Libro){
    const found = this.listLibrosExcel.includes(libro);
    const libroFound = this.listLibrosExcel.find(element => element.id === libro.id);
  
    if(found===false){
      this.listLibrosExcel.push(libro);
    }else{
      // this.listLibrosExcel.forEach((element, i) =>{
      const nuevaArray = this.listLibrosExcel.filter(element => element.id !== libroFound?.id)
      this.listLibrosExcel = nuevaArray;
      
      // });
    }
  }

  exportarEx() {
    if(this.listLibrosExcel.length==0){
      window.alert("Tienes que seleccionar algun libro")
    }else{
      this.libroService.exportExcel(this.listLibrosExcel).subscribe((result) =>{
        Files.saveBlobAsFile(result, result.type, 'libros.xls');
      },()=> {
        console.log('Error al generar el archivo excel')
      
      });
    }
  }

 
  borrar(libroId: Number){
    if(confirm("¿Seguro que quieres borrar el libro?")){
      this.libroService.deleteLibro(libroId).subscribe((result) =>{
        if(result.success){
          alert("El libro se ha eliminado correctamente");
        window.location.reload();
        }else{
          alert(result.error);
        }
      });
      
    }
  }

  borrarSeleccionados(){
    if(this.listLibrosExcel.length==0){
      alert("Tienes que seleccionar algun libro.")
    }else{
      if(confirm("¿Estás seguro de que quieres borrar estos libros?")){
      this.libroService.deleteMultipleLibro(this.listLibrosExcel).subscribe((result) =>{
        if(result.success){
          alert("Los libros se han eliminado correctamente");
        window.location.reload();
        }else{
          alert(result.error);
        }
      });
      } 
    }
  }


  handleRecalculateCompanyTable(recalculateParams: RecalculateTableParams): void {
    
    let rows = this.listLibros;
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

    this.visibleLibros=rows;
    this.pageCompanyList = rows.slice((this.currentCompanyPage - 1) * this.companyPageElems,
      Math.min(this.currentCompanyPage * this.companyPageElems, this.listLibros.length));
  }

  handleCompanyPagChange(page: number): void {
    this.pageCompanyList = this.visibleLibros.slice((page - 1) * this.companyPageElems,
        Math.min(page * this.companyPageElems, this.listLibros.length));
    this.currentCompanyPage = page;
  }



  getCellString(row:any, columnIndex: number): string {
    if (columnIndex === 0) {
      return row.titulo + '';
    } else if (columnIndex === 1) {
      return row.edicion+'ª';
    } else if (columnIndex === 2) {
      return row.fecha_lanzamiento;
    } else if (columnIndex === 3) {
      return row.autor.nombre+''+row.autor.apellido1+''+row.autor.apellido2;
    } else if (columnIndex === 4) {
      return row.categoria.id+''+row.categoria.descripcion;
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

  toggle(event: any): void {
    this.pressed = !this.pressed;
 }

}
