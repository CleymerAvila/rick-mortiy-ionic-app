import { Component, OnInit } from '@angular/core';
import { ICharacterResponse } from '../../interfaces/ICharacterResponse';
import { HttpService } from '../../shared/services/http-service';
import { ProxyProvider } from 'src/app/shared/providers/proxy-provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  characterResponse!: ICharacterResponse;
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(private proxyProvider: ProxyProvider){

  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.proxyProvider.loadInitialData();
      this.characterResponse= data;
      this.totalPages = data.results.length;
    } catch (error) {
      console.error('Error en ngOnInit: ', error)
    }
  }
}
