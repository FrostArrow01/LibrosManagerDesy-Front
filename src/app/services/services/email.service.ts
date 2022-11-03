import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Email } from "src/app/models/email";
import { ObjectResponse } from "./backend-service";


@Injectable({providedIn: 'root'})
export class EmailService {
    private apiServerUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { } 

    public sendEmail(email: Email): Observable<ObjectResponse<Email>>{
        return this.http.post<ObjectResponse<Email>>(`${this.apiServerUrl}/email/send`, email );
    }

    public sendEmailArgs(to: string, subject: string, text: string, file: Blob|null): Observable<ObjectResponse<string>>{
        const formData = new FormData();

        file !== null
          ? formData.append('file', file)
          : formData.append('file', 'null');
        
        return this.http.post<ObjectResponse<string>>(`${this.apiServerUrl}/email/sendArgs?to=${to}&subject=${subject}&text=${text}`, formData );
    }

   

}