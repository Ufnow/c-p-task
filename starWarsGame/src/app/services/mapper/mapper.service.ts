import { Injectable } from '@angular/core';
import { StarshipApiResponse } from '../../models/starship/starship-api-response.model';
import { Person } from '../../models/people/person.model';
import { Starship } from '../../models/starship/starship.model';
import { PersonApiResponse } from '../../models/people/person-api-resposne.model';

@Injectable({
  providedIn: 'root',
})
export class DataMappingService {
  constructor() {}

  mapPersonResponse(response: PersonApiResponse): Person {
    const data = {
      ...response.result.properties,
      description: response.result.description,
    };

    return {
      height: parseFloat(data.height),
      mass: isNaN(parseFloat(data.mass)) ? 0 : parseFloat(data.mass),
      hairColor: data.hair_color,
      skinColor: data.skin_color,
      eyeColor: data.eye_color,
      birthYear: data.birth_year,
      gender: data.gender,
      description: data.description,
      name: data.name,
    };
  }

  mapStarshipResponse(response: StarshipApiResponse): Starship {
    const data = {
      ...response.result.properties,
      description: response.result.description,
    };

    return {
      name: data.name,
      model: data.model,
      starshipClass: data.starship_class,
      manufacturer: data.manufacturer,
      costInCredits: isNaN(parseFloat(data.cost_in_credits))
        ? 0
        : parseFloat(data.cost_in_credits),
      length: parseFloat(data.length),
      crew: isNaN(parseFloat(data.crew)) ? 0 : parseFloat(data.crew),
      passengers: parseInt(data.passengers, 10),
      maxAtmospheringSpeed: data.max_atmosphering_speed,
      hyperdriveRating: data.hyperdrive_rating,
      MGLT: data.MGLT,
      cargoCapacity: parseFloat(data.cargo_capacity),
      consumables: data.consumables,
      created: data.created,
      edited: data.edited,
      description: data.description,
    };
  }
}
