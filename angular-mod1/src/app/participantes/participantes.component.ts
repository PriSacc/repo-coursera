import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Participante } from '../models/participantes.models';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.scss']
})
export class ParticipantesComponent implements OnInit {
  @Input() participante: Participante;
  @HostBinding ('attr.class') cssClass = 'col-md-4';
  
  constructor() { }

  ngOnInit(): void {
  }

}
