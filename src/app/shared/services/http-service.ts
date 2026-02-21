import { ICharacterResponse, ICharacterInfo } from 'src/app/interfaces/ICharacterResponse';
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
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }
}
