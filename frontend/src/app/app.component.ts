import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
   <h1>{{title}}</h1>
   <nav>
     <a routerLink="/display" routerLinkActive="active">Visa Lagersaldo</a>
     <a routerLink="/edit" routerLinkActive="active">Ny Leverans</a>
   </nav>
   <router-outlet></router-outlet>
    `
})

export class AppComponent  {
  title = 'Pärons Lilla Lagertjänst';

}

