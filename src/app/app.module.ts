import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesyAngularModule } from 'desy-angular';
import { NewEmailComponent } from './components/new-email/new-email.component';
import { TablaLibroComponent } from './components/libro/tabla-libro/tabla-libro.component';
import { AutorService } from './services/services/autor.service';
import { LibroService } from './services/services/libro.service';
import { CategoriaService } from './services/services/categoria.service';
import { EmailService } from './services/services/email.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormLibroComponent } from './components/libro/form-libro/form-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaCategoriaComponent } from './components/categoria/tabla-categoria/tabla-categoria.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormCategoriaComponent } from './components/categoria/form-categoria/form-categoria.component';
import { TablaAutorComponent } from './components/autor/tabla-autor/tabla-autor.component';
import { FormAutorComponent } from './components/autor/form-autor/form-autor.component';
import { InjectorService } from './services/services/injector.service';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NewEmailComponent,
    TablaLibroComponent,
    FormLibroComponent,
    TablaCategoriaComponent,
    NavbarComponent,
    FormCategoriaComponent,
    TablaAutorComponent,
    FormAutorComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DesyAngularModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [AutorService, LibroService, CategoriaService, EmailService, InjectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
