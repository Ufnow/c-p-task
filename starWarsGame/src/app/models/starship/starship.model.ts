import { Person } from '../people/person.model';

export interface Starship {
  name: string;
  model: string;
  starshipClass: string;
  manufacturer: string;
  costInCredits: number;
  length: number;
  crew: number;
  passengers: number;
  maxAtmospheringSpeed: string;
  hyperdriveRating: string;
  MGLT: string;
  cargoCapacity: number;
  consumables: string;
  created: string;
  edited: string;
  description: string;
}
