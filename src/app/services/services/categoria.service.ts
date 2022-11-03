import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ObjectResponse } from './backend-service';
import { Categoria } from 'src/app/models/categoria';


@Injectable({providedIn: 'root'})
export class CategoriaService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  public getCategoria(): Observable<ObjectResponse<Categoria[]>>{
    return this.http.get<ObjectResponse<Categoria[]>>(`${this.apiServerUrl}/categoria/all`);
  }

  public getCategoriaById(categoriaId: number): Observable<ObjectResponse<Categoria>>{
    return this.http.get<ObjectResponse<Categoria>>(`${this.apiServerUrl}/categoria/getById/${categoriaId}`);
  }

  public addCategoria(categoria: Categoria): Observable<ObjectResponse<Categoria>>{
    return this.http.post<ObjectResponse<Categoria>>(`${this.apiServerUrl}/categoria/add`, categoria);
  }

  public updateCategoria( categoria: Categoria, categoriaId: number): Observable<ObjectResponse<Categoria>>{
    return this.http.put<ObjectResponse<Categoria>>(`${this.apiServerUrl}/categoria/editar/${categoriaId}`, categoria);
  }

  public deleteCategoria(categoriaId: number): Observable<ObjectResponse<Categoria>>{
    return this.http.delete<ObjectResponse<Categoria>>(`${this.apiServerUrl}/categoria/delete/${categoriaId}`);
  }

  public deleteMultipleCategoria(categorias: Categoria[]): Observable<ObjectResponse<Categoria>>{
    
    return this.http.post<ObjectResponse<Categoria>>(`${this.apiServerUrl}/categoria/deleteM`, categorias);
  }


}
