import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICharacterInfo, ICharacterResponse } from 'src/app/interfaces/ICharacterResponse';
import { HttpService } from '../../services/http-service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  standalone: false,
})
export class CharacterListComponent  implements OnInit {
  @Input() characterList: ICharacterInfo[] = [];
  route = inject(Router)
  page: number = 1;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getCharacters<ICharacterResponse>(this.page).subscribe({
      next: (data) => {
        this.characterList = data.results;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  characterSelected(characterId: number){
    this.route.navigate(['detail', characterId]);
  }

  onIonInfinite(event: any) {
    this.page++;
    this.httpService.getCharacters<ICharacterResponse>(this.page).subscribe({
      next: (data) => {
        this.characterList = [...this.characterList, ...data.results]
        console.log('CharacterList', this.characterList)
      },
      error: (error) => {
        console.log(error)
      }
    })
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
