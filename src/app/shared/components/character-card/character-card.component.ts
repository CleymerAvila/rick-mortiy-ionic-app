import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrigin } from 'src/app/interfaces/ICharacterResponse';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  standalone: false,
})
export class CharacterCardComponent implements OnInit {
  @Input() characterId: number | undefined = 0;
  @Input() title: string | undefined = '';
  @Input() subtitle: string | undefined = '';
  @Input() image: string | undefined = '';
  @Input() origin: IOrigin | undefined = undefined;
  @Input() status: string | undefined = ''
  @Input() species: string | undefined = '';
  @Input() isDetail: boolean = false;
  @Output() touchedCharacter  = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onSelected() {
    this.touchedCharacter.emit(this.characterId);
  }
}
