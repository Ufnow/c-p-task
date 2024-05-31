import { ApiSingleResultResponse } from '../api-generic-responses.model';

export type StarshipApiResponse = ApiSingleResultResponse<StarshipProperties>;

interface StarshipProperties {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: any[];
  created: string;
  edited: string;
  name: string;
  url: string;
}
