import { NgModule } from '@angular/core';
import {RouterModule, Routes, ExtraOptions} from '@angular/router';
import { FormAutorComponent } from './components/autor/form-autor/form-autor.component';
import { TablaAutorComponent } from './components/autor/tabla-autor/tabla-autor.component';
import { FormCategoriaComponent } from './components/categoria/form-categoria/form-categoria.component';
import { TablaCategoriaComponent } from './components/categoria/tabla-categoria/tabla-categoria.component';
import { FormLibroComponent } from './components/libro/form-libro/form-libro.component';
import { TablaLibroComponent } from './components/libro/tabla-libro/tabla-libro.component';
import { NewEmailComponent } from './components/new-email/new-email.component';

const routes: Routes = [

 

  //Libro
  {path: 'inicio/libro', component: TablaLibroComponent},
  { path: 'inicio/libro/add', component: FormLibroComponent },
  { path: 'inicio/libro/add/:idLibro', component: FormLibroComponent },

  //Categoria
  {path: 'inicio/categoria', component: TablaCategoriaComponent},
  { path: 'inicio/categoria/add', component: FormCategoriaComponent },
  { path: 'inicio/categoria/add/:idCategoria', component: FormCategoriaComponent },

  //Autor
  {path: 'inicio/autor', component: TablaAutorComponent},
  { path: 'inicio/autor/add', component: FormAutorComponent },
  { path: 'inicio/autor/add/:idAutor', component: FormAutorComponent },

  //Email
  {path: 'inicio/email', component: NewEmailComponent},

  
  { path: '**', redirectTo: 'inicio/libro' }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
