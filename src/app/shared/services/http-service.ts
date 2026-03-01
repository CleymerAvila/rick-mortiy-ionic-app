import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient){
  }

  getCharacters<ICharacterResponse>(page: number): Observable<ICharacterResponse> {
    return this.httpClient.get<ICharacterResponse>(`${this.BASE_URL}character?page=${page}`)
  }

  getCharacterById<ICharacterInfo>(characterId: number): Observable<ICharacterInfo> {
    return this.httpClient.get<ICharacterInfo>(`${this.BASE_URL}character/${characterId}`);
  }

  getLocationByUrl<ILocationInfo>(locationUrl: string): Observable<ILocationInfo> {
    return this.httpClient.get<ILocationInfo>(locationUrl);
  }

  getCharacterByUrl<ICharacterInfo>(url: string): Observable<ICharacterInfo> {
    return  this.httpClient.get<ICharacterInfo>(url);
  }
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  getResidentsByIds<ICharacterInfo>(characterIds: number[]): Observable<ICharacterInfo[]> {
    return this.httpClient.get<ICharacterInfo[]>(`${this.BASE_URL}character/${characterIds}`);
  }

}
