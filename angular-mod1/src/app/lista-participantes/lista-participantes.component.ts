import { Component, OnInit, Input } from '@angular/core';
import { Participante } from '../models/participantes.models';

@Component({
  selector: 'app-lista-participantes',
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.scss']
})
export class ListaParticipantesComponent implements OnInit {
  participante: Participante[];
  constructor() { 
    this.participante = [];
  }

  ngOnInit(): void {
  }
  
  guardar(n:string,c:string,l:string):boolean {
    this.participante.push(new Participante(n,c,l));
    return false;
  }
}
