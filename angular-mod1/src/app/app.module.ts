import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaParticipantesComponent } from './lista-participantes/lista-participantes.component';
import { ParticipantesComponent } from './participantes/participantes.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaParticipantesComponent,
    ParticipantesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
