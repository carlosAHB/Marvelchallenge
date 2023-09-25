import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{CharactersComponent} from './characters/characters.component'
import {CharacterComponent} from'./characters/character/character.component'

const routes: Routes = [

  {path: '', redirectTo: '/characters', pathMatch: 'full'},
  {path:'characters', component:CharactersComponent},
  {path:'characterdetail/:id', component:CharacterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
