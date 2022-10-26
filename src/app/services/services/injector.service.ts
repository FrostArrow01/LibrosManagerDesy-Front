import { Injectable, Injector } from '@angular/core';

export let InjectorInstance: Injector

@Injectable({
  providedIn: 'root'
})

export class InjectorService {

  injectorInstance: Injector | undefined;

  constructor() {
  }

  setInjector(injector: Injector) {
    InjectorInstance = injector;
  }
}
