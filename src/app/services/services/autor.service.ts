import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from 'src/app/models/autor';
import { ObjectResponse } from './backend-service';


@Injectable({providedIn: 'root'})
export class AutorService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  
  public getAutor(): Observable<ObjectResponse<Autor[]>>{
    return this.http.get<ObjectResponse<Autor[]>>(`${this.apiServerUrl}/autor/all`);
  }

  public getAutorById(autorDni: string): Observable<ObjectResponse<Autor>>{
    return this.http.get<ObjectResponse<Autor>>(`${this.apiServerUrl}/autor/getById/${autorDni}`);
  }

  public addAutor(autor: Autor): Observable<ObjectResponse<Autor>>{
    return this.http.post<ObjectResponse<Autor>>(`${this.apiServerUrl}/autor/add`, autor);
  }

  public updateAutor( autor: Autor, autorDni: string): Observable<ObjectResponse<Autor>>{
    return this.http.put<ObjectResponse<Autor>>(`${this.apiServerUrl}/autor/editar/${autorDni}`, autor);
  }

  public deleteAutor(autorDni: string): Observable<ObjectResponse<Autor>>{
    return this.http.delete<ObjectResponse<Autor>>(`${this.apiServerUrl}/autor/delete/${autorDni}`);
  }

  public deleteMultipleAutor(autores: Autor[]): Observable<ObjectResponse<Autor>>{
    debugger
    return this.http.post<ObjectResponse<Autor>>(`${this.apiServerUrl}/autor/deleteM`, autores);
  }


}
