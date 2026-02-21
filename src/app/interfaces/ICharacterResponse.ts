
export interface ICharacterResponse {
  info: Iinfo;
  results : ICharacterInfo[]
}

export interface Iinfo{
  count: number;
  pages:number;
  next: string | null;
  prev: string | null;
}


export interface ICharacterInfo {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin | undefined;
  location: Ilocation;
  image: string;
}

export interface IOrigin {
  name: string;
}
export interface Ilocation {
  name: string;
  url: string;
}


export interface ILocationInfo {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}
