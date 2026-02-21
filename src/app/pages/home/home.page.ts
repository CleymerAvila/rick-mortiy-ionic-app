import { Component, OnInit } from '@angular/core';
import { ICharacterResponse } from '../../interfaces/ICharacterResponse';
import { HttpService } from '../../shared/services/http-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  characterResponse!: ICharacterResponse;

  constructor(private httpService : HttpService){
    this.httpService.getCharacters<ICharacterResponse>(1).subscribe({
      next: (data) => {
        this.characterResponse = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {}
}
