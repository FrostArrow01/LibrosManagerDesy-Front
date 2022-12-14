import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Email } from 'src/app/models/email';
import { EmailService } from 'src/app/services/services/email.service';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.css']
})
export class NewEmailComponent implements OnInit {
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
  
    if(this.enableArchivo){
      this.emailService.sendEmailArgs(this.email.to, this.email.subject, this.email.text, this.file).subscribe((result) =>{
        if(result.success){
          this.buttonC=3;
          window.alert(result.message);
          window.location.reload()

        }else{
          this.buttonC=1;
          this.open = true;
        }      
      });

    }else{
      this.emailService.sendEmail(this.email).subscribe((result) =>{
        if(result.success){
          this.buttonC=3;
          alert(result.message);
          // window.location.reload();
          this.email = {
            to: '',
            subject: '',
            text: ''
          }
          this.buttonC=1
        }else{
          this.buttonC=1;
          this.open = true;
        }  
      });
     
    }

  }

}
