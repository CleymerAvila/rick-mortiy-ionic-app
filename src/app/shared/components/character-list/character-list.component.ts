import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICharacterInfo, ICharacterResponse } from 'src/app/interfaces/ICharacterResponse';
import { ProxyProvider } from '../../providers/proxy-provider';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  standalone: false,
})
export class CharacterListComponent  implements OnInit {
  @Input() characterList: ICharacterInfo[] = [];
  route = inject(Router)
  @Input() currentPage: number = 1;
  totalPages: number = 0;

  constructor(private proxyProvider: ProxyProvider) { }

  async ngOnInit(): Promise<void> {
    // this.httpService.getCharacters<ICharacterResponse>(this.page).subscribe({
    //   next: (data) => {
    //     this.characterList = data.results;
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })

    const response = await this.proxyProvider.getPage(this.currentPage);
    this.characterList = response.results;
    this.totalPages = response.results.length;
  }

  characterSelected(characterId: number){
    this.route.navigate(['detail', characterId]);
  }

  async onIonInfinite(event: any): Promise<void> {
    if(this.currentPage >=  this.totalPages){
      event.target.complete();
      event.target.disabled = true;
      return;
    }
    try {
      this.currentPage++;
      const data = await this.proxyProvider.getPage(this.currentPage);
      this.characterList = [...this.characterList, ...data.results];
    } catch (error) {
      console.log('Error al cargar más: ', error)
    } finally {
      event.target.complete();
    }
    // this.httpService.getCharacters<ICharacterResponse>(this.currentPage).subscribe({
    //   next: (data) => {
    //     this.characterList = [...this.characterList, ...data.results]
    //     console.log('CharacterList', this.characterList)
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
