import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Email } from "src/app/models/email";


@Injectable({providedIn: 'root'})
export class EmailService {
    private apiServerUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { } 

    public sendEmail(email: Email): Observable<Email>{
        return this.http.post<Email>(`${this.apiServerUrl}/email/send`, email );
    }

    public sendEmailArgs(to: string, subject: string, text: string, file: Blob|null): Observable<string>{
        const formData = new FormData();

        file !== null
          ? formData.append('file', file)
          : formData.append('file', 'null');
        debugger
        return this.http.post<string>(`${this.apiServerUrl}/email/sendArgs?to=${to}&subject=${subject}&text=${text}`, formData );
    }

   

}