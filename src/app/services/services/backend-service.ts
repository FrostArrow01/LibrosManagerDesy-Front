import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InjectorInstance } from './injector.service';

export type Respuesta = ObjectResponse<any>;
export interface ObjectResponse<T> {
  error: string;
  message: T;
  success: boolean;
}

export interface ListResponse<T> {
  error: string;
  message: ArrayResponse<T>;
  success: boolean;
}

export interface ArrayResponse<T> {
  content: Array<T>;
  paginacion: Paginacion;
}

export interface Paginacion {
  paginas: number;
  total: number;
  itemPerPage: number;
}

export class BackendService {
  httpClient: HttpClient;
  urlApi: string;

  constructor() {
    this.httpClient = InjectorInstance.get(HttpClient);
    this.urlApi = `${'http://localhost:8080'}api`;

  }
  // handleResponse<T>(
  //   response: ObjectResponse<T>,
  //   resolve: (value?: T | PromiseLike<T>) => void,
  //   reject: (reason?: any) => void
  // ): void;

  // handleResponse<T>(
  //   response: ListResponse<T>,
  //   resolve: (value?: ArrayResponse<T> | PromiseLike<ArrayResponse<T>>) => void,
  //   reject: (reason?: any) => void
  // ): void;

  // async handleResponse<T>(
  //   response: ListResponse<T> | ObjectResponse<T>,
  //   resolve: (value?: any) => void,
  //   reject: (reason?: any) => void
  // ): Promise<void> {
  //   const isBlob = response instanceof Blob;
  //   if (isBlob) {
  //     // tslint:disable-next-line:no-string-literal
  //     if (response['type'] === 'application/json') {
  //       const blob = response as any; // as Blob
  //       const textPromise = blob.text();
  //       const text = await textPromise;
  //       response = JSON.parse(text);
  //     } else {
  //       resolve(response);
  //     }
  //   }

  //   // para cuando el back manda la respuesta "a pelo"
  //   // if (typeof response.success == 'undefined') {
  //   //   resolve(response);
  //   // }

  //   if (!!response.success) {
  //     resolve(response.message);
  //   } else {
  //     reject(response.error || 'ERROR');
  //   }

  // }



  // handleError(
  //   error: HttpErrorResponse,
  //   resolve: (value?: any) => void,
  //   reject: (reason?: any) => void
  // ): void {
  //   if (error.status === 0) {
  //     reject('No hay conexión con el servidor');
  //   } else if (error.status === 500 || error.status === 404) {
  //     reject('Ha ocurrido un error en la llamada');
  //   } else if (error.message !== '') {
  //     reject(error.message);
  //   } else if (error.status === 403) {
  //     reject('No estás autorizado a acceder a este recurso');
  //   } else {
  //     reject('Ha ocurrido un error');
  //   }
  // }

  // handleResponseToNumber(
  //   response: ObjectResponse<string>,
  //   resolve: (value?: number) => void,
  //   reject: (reason?: any) => void
  // ): void {
  //   if (!!response.success) {
  //     resolve(Number(response.message));
  //   } else {
  //     reject(response.error);
  //   }
  // }

  // async get<T>(path: string, msgError: string, httpParams?: HttpParams): Promise<T> {

  //   if (!httpParams) {
  //     httpParams = new HttpParams();
  //   }

  //   return new Promise((resolve, reject) => {
  //     this.httpClient.get(`${this.urlApi}/${path}`, { params: httpParams })
  //       .subscribe((response: ObjectResponse<T>) => {
  //         this.handleResponse(response, resolve, reject);
  //       },
  //         (error) => {
  //           if (!msgError) {
  //             msgError = error;
  //           }
  //           reject(msgError);
  //         }
  //       );
  //   });

  // }

  // async post<T>(path: string, msgError: string, bodyParams?: any): Promise<T> {

  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(`${this.urlApi}/${path}`, bodyParams)
  //       .subscribe((response: ObjectResponse<T>) => {
  //         this.handleResponse(response, resolve, reject);
  //       },
  //         (error) => {
  //           if (!msgError) {
  //             msgError = error;
  //           }
  //           reject(msgError);
  //         }
  //       );
  //   });

  // }

  // async patch<T>(path: string, msgError: string, bodyParams?: any): Promise<T> {

  //   return new Promise((resolve, reject) => {
  //     this.httpClient.patch(`${this.urlApi}/${path}`, bodyParams)
  //       .subscribe((response: ObjectResponse<T>) => {
  //         this.handleResponse(response, resolve, reject);
  //       },
  //         (error) => {
  //           if (!msgError) {
  //             msgError = error;
  //           }
  //           reject(msgError);
  //         }
  //       );
  //   });

  // }

  // async delete<T>(path: string, msgError: string): Promise<T> {

  //   return new Promise((resolve, reject) => {
  //     this.httpClient.delete(`${this.urlApi}/${path}`).subscribe(
  //       (response: ObjectResponse<T>) => {
  //         this.handleResponse(response, resolve, reject);
  //       },
  //       (error) => {
  //         if (!msgError) {
  //           msgError = error;
  //         }
  //         reject(msgError);
  //       }
  //     );
  //   });

  // }
}
