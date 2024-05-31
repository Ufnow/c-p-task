import { TestBed } from '@angular/core/testing';
import { StarshipApiResponse } from '../../models/starship/starship-api-response.model';
import { PersonApiResponse } from '../../models/people/person-api-resposne.model';
import { DataMappingService } from './mapper.service';

describe('DataMappingService', () => {
  let service: DataMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapPersonResponse', () => {
    it('should map PersonApiResponse to Person', () => {
      const response: PersonApiResponse = {
        message: 'success',
        result: {
          properties: {
            height: '180',
            mass: '80',
            hair_color: 'brown',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            name: 'Luke Skywalker',
            created: '2014-12-10T16:59:45.094000Z',
            edited: '2014-12-20T21:23:49.880000Z',
            homeworld: 'Tatooine',
            url: 'http://swapi.dev/api/people/1/',
          },
          description: 'A Jedi Knight',
          _id: '1',
          uid: '1',
          __v: 0,
        },
      };

      const expectedPerson = {
        height: 180,
        mass: 80,
        hairColor: 'brown',
        skinColor: 'fair',
        eyeColor: 'blue',
        birthYear: '19BBY',
        gender: 'male',
        description: 'A Jedi Knight',
        name: 'Luke Skywalker',
      };

      const result = service.mapPersonResponse(response);
      expect(result).toEqual(expectedPerson);
    });

    it('should handle missing mass value gracefully', () => {
      const response: PersonApiResponse = {
        message: 'success',
        result: {
          properties: {
            height: '180',
            mass: 'unknown',
            hair_color: 'brown',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            name: 'Luke Skywalker',
            created: '2014-12-10T16:59:45.094000Z',
            edited: '2014-12-20T21:23:49.880000Z',
            homeworld: 'Tatooine',
            url: 'http://swapi.dev/api/people/1/',
          },
          description: 'A Jedi Knight',
          _id: '1',
          uid: '1',
          __v: 0,
        },
      };

      const expectedPerson = {
        height: 180,
        mass: 0,
        hairColor: 'brown',
        skinColor: 'fair',
        eyeColor: 'blue',
        birthYear: '19BBY',
        gender: 'male',
        description: 'A Jedi Knight',
        name: 'Luke Skywalker',
      };

      const result = service.mapPersonResponse(response);
      expect(result).toEqual(expectedPerson);
    });
  });

  describe('mapStarshipResponse', () => {
    it('should map StarshipApiResponse to Starship', () => {
      const response: StarshipApiResponse = {
        message: 'success',
        result: {
          properties: {
            name: 'Millennium Falcon',
            model: 'YT-1300 light freighter',
            starship_class: 'Light freighter',
            manufacturer: 'Corellian Engineering Corporation',
            cost_in_credits: '100000',
            length: '34.37',
            crew: '4',
            passengers: '6',
            max_atmosphering_speed: '1050',
            hyperdrive_rating: '0.5',
            MGLT: '75',
            cargo_capacity: '100000',
            consumables: '2 months',
            pilots: [],
            created: '2014-12-10T16:59:45.094000Z',
            edited: '2014-12-20T21:23:49.880000Z',
            url: 'http://swapi.dev/api/starships/10/',
          },
          description: 'A famous starship',
          _id: '10',
          uid: '10',
          __v: 0,
        },
      };

      const expectedStarship = {
        name: 'Millennium Falcon',
        model: 'YT-1300 light freighter',
        starshipClass: 'Light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        costInCredits: 100000,
        length: 34.37,
        crew: 4,
        passengers: 6,
        maxAtmospheringSpeed: '1050',
        hyperdriveRating: '0.5',
        MGLT: '75',
        cargoCapacity: 100000,
        consumables: '2 months',
        created: '2014-12-10T16:59:45.094000Z',
        edited: '2014-12-20T21:23:49.880000Z',
        description: 'A famous starship',
      };

      const result = service.mapStarshipResponse(response);
      expect(result).toEqual(expectedStarship);
    });

    it('should handle missing crew value gracefully', () => {
      const response: StarshipApiResponse = {
        message: 'success',
        result: {
          properties: {
            name: 'Millennium Falcon',
            model: 'YT-1300 light freighter',
            starship_class: 'Light freighter',
            manufacturer: 'Corellian Engineering Corporation',
            cost_in_credits: '100000',
            length: '34.37',
            crew: 'unknown',
            passengers: '6',
            max_atmosphering_speed: '1050',
            hyperdrive_rating: '0.5',
            MGLT: '75',
            cargo_capacity: '100000',
            consumables: '2 months',
            pilots: [],
            created: '2014-12-10T16:59:45.094000Z',
            edited: '2014-12-20T21:23:49.880000Z',
            url: 'http://swapi.dev/api/starships/10/',
          },
          description: 'A famous starship',
          _id: '10',
          uid: '10',
          __v: 0,
        },
      };

      const expectedStarship = {
        name: 'Millennium Falcon',
        model: 'YT-1300 light freighter',
        starshipClass: 'Light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        costInCredits: 100000,
        length: 34.37,
        crew: 0,
        passengers: 6,
        maxAtmospheringSpeed: '1050',
        hyperdriveRating: '0.5',
        MGLT: '75',
        cargoCapacity: 100000,
        consumables: '2 months',
        created: '2014-12-10T16:59:45.094000Z',
        edited: '2014-12-20T21:23:49.880000Z',
        description: 'A famous starship',
      };

      const result = service.mapStarshipResponse(response);
      expect(result).toEqual(expectedStarship);
    });
  });
});
