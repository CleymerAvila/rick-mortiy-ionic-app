import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { HeaderComponent } from './components/header/header.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CharacterCardComponent,
    HeaderComponent,
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
],
  exports: [
    IonicModule,
    CharacterCardComponent,
    HeaderComponent,
    CharacterListComponent
  ]
})
export class SharedModule { }
