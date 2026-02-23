import { Injectable } from '@angular/core';
import { HttpService } from '../services/http-service';
import { ICharacterInfo, ICharacterResponse, ILocationInfo } from 'src/app/interfaces/ICharacterResponse';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterProvider {

  constructor(private httpService: HttpService){}


  getCharacters(page: number): Promise<ICharacterResponse> {
    return firstValueFrom(this.httpService.getCharacters(page));
  }


  getCharacterById(characterId: number): Promise<ICharacterInfo>{
    return firstValueFrom(this.httpService.getCharacterById(characterId));
  }

  getLocation(locationUrl: string): Promise<ILocationInfo> {
    return firstValueFrom (this.httpService.getLocationByUrl(locationUrl));
  }

  getCharacterByUrl(url: string): Promise<ICharacterInfo>{
    return firstValueFrom(this.httpService.getCharacterByUrl(url));
  }

}
