# desy-angular-starter
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/npm-%3E%3D6.14.0-blue.svg)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D12.18.0-blue.svg)
[![License: EUPL--1.2](https://img.shields.io/badge/License-EUPL--1.2-yellow.svg)](https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12)

> desy-angular-starter is a boilerplate project to build webapps for 
> Gobierno de Aragón government, using desy-angular npm package as dependecy.

## Purpose
desy-angular-starter provides a ready-to-use base project to start building new
angular webapps using design system (DESY) through desy-angular npm package.

## What is it based on?
The project is based on desy-angular library, which in turn is based on the
desy-frontend library. Both libraries are published in the npm repository:
* [desy-angular](https://www.npmjs.com/package/desy-angular)
* [desy-frontend](https://www.npmjs.com/package/desy-frontend)

## Get started
1. Create a new project based on desy-angular-starter
     * Bitbucket
         1. Go to https://bitbucket.org/sdaragon/desy-angular-starter/
         2. Click on the [...] icon on the top menu and select "Fork this repository"
         3. Choose your workspace, project and name to create your new repository
     * Github
         1. Go to https://github.com/new and create your new repository
         2. On the next page, click on "Import code" 
         3. Copy the desy-angular-starter project URL 
            ``https://bitbucket.org/sdaragon/desy-angular-starter/``
            and paste it on the form 
         4. Click on "Begin import"
     * Local repository
         1. Clone desy-angular-starter with your new project name
            ```sh
            git clone https://bitbucket.org/sdaragon/desy-angular-starter.git your-project-name
            ```
2. Clone it
     * Bitbucket: ``git clone https://bitbucket.org/your-workspace/your-project.git``
     * Github: ``git clone https://github.com/your-workspace/your-project.git``
3. Rename all 'desy-angular-starter' occurrences by your project name using your IDE,
   or manually checking in the following files:
     * angular.json
     * karma.conf.js
     * package.json
     * index.html
4. Install dependencies
   ```sh
   npm install
   ```
5. Run development server
   ```sh
   npm run start
   ```
6. Clean the placeholder content from ``app.component.html`` to get started with
   your own content

## FAQ

### How to add a component?
If desy-angular module (or the sub-module you are interested in) is imported in
your module, you can use its components directly in your templates.
Every desy-angular component is prefixed by "desy". For example:
```html
<desy-button [id]="'example'">Click me</desy-button> 
```

### Where to find component examples to build my app?
In desy-angular documentation you can find some usage examples of every
component:
https://paega2.atlassian.net/wiki/spaces/AreaUsuariosIntegradores/pages/2996699584/desy-angular

In addition, there is a demo website where you can see every component in action and
modify its properties dynamically: https://desy.aragon.es/desy-angular


### How to write a desy-frontend example with desy-angular?
Every component in desy-frontend has its corresponding component in desy-angular,
so you can create very similar structures in desy-frontend than in desy-angular.
For example, the following tooltip component from [desy-frontend examples](https://desy.aragon.es/examples-spinner.html):
```html
{% from "components/spinner/_macro.spinner.njk" import componentSpinner %}
{{ componentSpinner({
    "classes": "text-primary-base"
})  }}
```
could be written with desy-angular as follows:
```html
<desy-spinner [classes]="'text-primary-base'"></desy-spinner >
```
In this example, desy-angular has the same parameter 'classes' than its corresponding in
desy-frontend, but that's not a rule. In addition, desy-angular allows output events,
content projection or even other sub-components (like row and cell components for tables),
so keep desy-angular documentation in hand to develop with this library properly.
You can find it here:
https://paega2.atlassian.net/wiki/spaces/AreaUsuariosIntegradores/pages/2996699584/desy-angular


## Troubleshooting
### About angular versions
desy-angular-starter has desy-angular as dependency, which requires any angular
version compatible with angular 11.0. If you are trying to use desy-angular in
a project with angular 10 or angular 12, you will have compatibility issues.

### I've found a bug. How can I solve it?
All DESY products are officially maintained by SDA Servicios Digitales de Aragón.
If you think you've found a bug, let us know by contacting to [soportesae@aragon.es](mailto:soportesae@aragon.es)
