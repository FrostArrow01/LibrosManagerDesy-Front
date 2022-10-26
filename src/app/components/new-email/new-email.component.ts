import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Email } from 'src/app/models/email';
import { Libro } from 'src/app/models/libro';
import { EmailService } from 'src/app/services/services/email.service';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.css']
})
export class NewEmailComponent implements OnInit {
  emailForm : FormGroup;
  file: File | null = null; 
  enableArchivo: Boolean;
  email: Email;
  buttonC: number = 1;
  open: boolean=false;
 

  constructor(private fb: FormBuilder, private emailService: EmailService ) {
    this.enableArchivo = false
    this.email = {
      to: '',
      subject: '',
      text: '',
    }

    this.emailForm = this.fb.group({
      to: [null, []],
      subject: [null, []],
      text: [null, []],    
    });
   }

  ngOnInit(): void {
  }

  habilitarArch(){
    this.enableArchivo = !this.enableArchivo;
  }


  volver(){
    window.location.reload();
  }

  guardarEmail(event: any){
    this.buttonC =2;
    // const libroM: Email = {
    //   to: values.to,
    //   subject: values.subject,
    //   text: values.text,
    //   file: values.file
    // }

    if(this.enableArchivo){
      this.emailService.sendEmailArgs(this.email.to, this.email.subject, this.email.text, this.file).subscribe((result) =>{
        this.buttonC=3;
        
        window.alert("El email con asunto: '"+this.email.subject+ "' ha sido enviado a '"+this.email.to+"' con éxito.");
        window.location.reload()
      
      } ,(error) =>{
        this.buttonC=1;
        this.open = true;
       
      }
      
      );

    }else{
      this.emailService.sendEmail(this.email).subscribe((result) =>{
        this.buttonC=3;
        window.alert("El email con asunto: '"+this.email.subject+ "' ha sido enviado a '"+this.email.to+"' con éxito.");
        window.location.reload()
      } ,(error) =>{
        this.buttonC=1;
        this.open = true;
      
      });
    }

  }

}
