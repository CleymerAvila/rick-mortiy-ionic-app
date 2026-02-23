import { Injectable } from '@angular/core';
import { ICharacterInfo, ICharacterResponse, ILocationInfo } from 'src/app/interfaces/ICharacterResponse';
import { CharacterProvider } from './character-provider';

@Injectable({
  providedIn: 'root',
})
export class ProxyProvider {
    private cache = {
      characters: new Map<number, ICharacterInfo>(),
      pages: new Map<number, ICharacterResponse>(),
      locations: new Map<string, ILocationInfo>()
    }

    constructor(private characterProvider: CharacterProvider){}


    async loadInitialData(): Promise<ICharacterResponse> {
      try {
        const [pageData ] = await Promise.all([
          this.characterProvider.getCharacters(1)
        ]);

        this.cachePage(1, pageData);
        return pageData;
      } catch (error) {
        console.error('[Proxy] error en carga inicial:', error)
        throw error;
      }
    }

    async getPage(page: number): Promise<ICharacterResponse> {
      if(this.cache.pages.has(page)){
        return this.cache.pages.get(page)!;
      }

      try {
        const data = await this.characterProvider.getCharacters(page);
        this.cachePage(page, data)
        return data;
      } catch (error) {
        console.error(`[Proxy] error página ${page}: `, error)
        throw error;
      }
    }

    async getCharacter(id: number): Promise<ICharacterInfo> {
      if(this.cache.characters.has(id)){
        return this.cache.characters.get(id)!;
      }

      try {
        const character = await this.characterProvider.getCharacterById(id);
        this.cache.characters.set(id, character);
        return character;
      } catch (error) {
        console.error(`[Proxy] Error personaje ${id}:`, error)
        throw error;
      }
    }

    async getLocation(url: string): Promise<ILocationInfo> {
      if(this.cache.locations.has(url)){
        return this.cache.locations.get(url)!;
      }

      try {
        const location = await this.characterProvider.getLocation(url);
        this.cache.locations.set(url, location);
        return location;
      } catch(error) {
        console.error(`[Proxy] error location ${url}: `, error)
        throw error;
      }
    }

    async getCharacterByUrl(url: string): Promise<ICharacterInfo> {
      let parts = url.split('/');
      let lastNumberString = parts.pop() || parts.pop();
      let lastNumber = Number(lastNumberString);
      if(this.cache.characters.has(lastNumber)){
        return this.cache.characters.get(lastNumber)!;
      }

      try {
        const character = await this.characterProvider.getCharacterByUrl(url);
        this.cache.characters.set(character.id, character);
        return character;
      } catch ( error ) {
        console.error('[Error] getting character by url')
        throw error;
      }
    }

    private cachePage(page: number, data: ICharacterResponse): void {
      this.cache.pages.set(page, data);
      data.results.forEach( (character) => this.cache.characters.set(character.id, character));
    }
}
