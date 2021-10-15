import { NgModule } from '@angular/core';
import {RouterModule, Routes, ExtraOptions} from '@angular/router';

const routes: Routes = [];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
