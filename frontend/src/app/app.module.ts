import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { MenuComponent } from './menu.component';
import { DisplayComponent } from './display.component';
import { EditComponent } from './edit.component';
import { PageNotFoundComponent } from './page-not-found.component'

const appRoutes: Routes = [
  { path: '',   component: MenuComponent },
  { path: 'display', component: DisplayComponent },
  { path: 'edit', component: EditComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule , RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, MenuComponent, DisplayComponent, EditComponent, PageNotFoundComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [  ]
})
export class AppModule { }
