import { ProxyProvider } from './../../shared/providers/proxy-provider';
import { ICharacterInfo, ILocationInfo } from 'src/app/interfaces/ICharacterResponse';
import { HttpService } from './../../shared/services/http-service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {
  characterInfo: ICharacterInfo | null = null;
  locationInfo: ILocationInfo | null = null;
  residents: ICharacterInfo[] = [];
  route = inject(ActivatedRoute);
  isLoading = false;

  constructor(private proxyProvider: ProxyProvider) { }

  async ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.params['id'];

    const character = await this.proxyProvider.getCharacter(id);
    const location = await this.proxyProvider.getLocation(character.location.url);

    location.residents.forEach(async res => {
      const resident = await this.proxyProvider.getCharacterByUrl(res);
      this.residents.push(resident);
    });

    this.characterInfo = character;
    this.locationInfo = location;
    this.isLoading = false;
  }

}
