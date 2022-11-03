import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectResponse } from './backend-service';
import { Libro } from 'src/app/models/libro';




@Injectable({providedIn: 'root'})
export class LibroService {
  private apiServerUrl = 'http://localhost:8080';

  
  constructor(private http: HttpClient) { 

  }

  public exportExcel(lista2: Libro[]): Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Blob>(`${this.apiServerUrl}/libro/exportExcel`, lista2,
    {headers: headers, responseType: 'blob' as 'json', observe: 'body'});
  }


  public getLibro(): Observable<ObjectResponse<Libro[]>>{
    return this.http.get<ObjectResponse<Libro[]>>(`${this.apiServerUrl}/libro/all`);
  }

  public getLibroById(libroId: number): Observable<ObjectResponse<Libro>>{
    return this.http.get<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/getById/${libroId}`);
  }

  public addLibro(libro: Libro): Observable<ObjectResponse<Libro>>{
    return this.http.post<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/add`, libro);
  }

  public updateLibro(libro: Libro, libroId: any): Observable<ObjectResponse<Libro>>{
    
    return this.http.put<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/editar/${libroId}`, libro);
  }

  public deleteLibro(libroId: Number): Observable<ObjectResponse<Libro>>{
    return this.http.delete<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/delete/${libroId}`);
  }

  public deleteMultipleLibro(libros: Libro[]): Observable<ObjectResponse<Libro>>{
    
    return this.http.post<ObjectResponse<Libro>>(`${this.apiServerUrl}/libro/deleteM`, libros);
  }

  public getLibrobyAutor(autorDni: String): Observable<ObjectResponse<Libro[]>>{
    return this.http.get<ObjectResponse<Libro[]>>(`${this.apiServerUrl}/libro/autor/${autorDni}`);
  }
  
  public getLibrobyCategoria(categoriaId: Number): Observable<ObjectResponse<Libro[]>>{
    return this.http.get<ObjectResponse<Libro[]>>(`${this.apiServerUrl}/libro/categoria/${categoriaId}`);
  }

}
