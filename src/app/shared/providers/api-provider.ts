import { ICharacterInfo, ILocationInfo } from 'src/app/interfaces/ICharacterResponse';
import { Injectable } from '@angular/core';
import { HttpService } from '../services/http-service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiProvider {
  private BASE_URL = environment.BASE_URL;

  constructor(private httpService: HttpService){}


}
