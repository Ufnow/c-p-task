import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SWApiService } from './sw-api.service';
import { API_URL, API_ROUTES_URLS } from '../../urls';
import { ApiPaginatedResponse } from '../../models/api-generic-responses.model';
import { PersonApiResponse } from '../../models/people/person-api-resposne.model';
import { StarshipApiResponse } from '../../models/starship/starship-api-response.model';

describe('SWApiService', () => {
  let service: SWApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SWApiService],
    });
    service = TestBed.inject(SWApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all people', () => {
    const dummyResponse: ApiPaginatedResponse = {
      message: 'ok',
      total_records: 10,
      total_pages: 1,
      previous: null,
      next: null,
      results: [
        {
          uid: '1',
          name: 'Luke Skywalker',
          url: 'https://swapi.tech/api/people/1',
        },
      ],
    };

    service.getAllPeople().subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/${API_ROUTES_URLS.People}/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch all starships', () => {
    const dummyResponse: ApiPaginatedResponse = {
      message: 'ok',
      total_records: 10,
      total_pages: 1,
      previous: null,
      next: null,
      results: [
        {
          uid: '1',
          name: 'Death Star',
          url: 'https://swapi.tech/api/starships/1',
        },
      ],
    };

    service.getAllStarships().subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${API_URL}/${API_ROUTES_URLS.Starship}/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch a person by ID', () => {
    const dummyPersonResponse: PersonApiResponse = {
      message: 'ok',
      result: {
        properties: {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          created: '2024-05-26T09:22:06.330Z',
          edited: '2024-05-26T09:22:06.330Z',
          homeworld: 'https://swapi.tech/api/planets/1',
          url: 'https://swapi.tech/api/people/1',
        },
        description: 'A person within the Star Wars universe',
        _id: '5f63a36eee9fd7000499be42',
        uid: '1',
        __v: 0,
      },
    };

    const personId = '1';

    service.getPerson(personId).subscribe((response) => {
      expect(response).toEqual(dummyPersonResponse);
    });

    const req = httpMock.expectOne(
      `${API_URL}/${API_ROUTES_URLS.People}/${personId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyPersonResponse);
  });

  it('should fetch a starship by ID', () => {
    const dummyStarshipResponse: StarshipApiResponse = {
      message: 'ok',
      result: {
        properties: {
          name: 'Death Star',
          model: 'DS-1 Orbital Battle Station',
          starship_class: 'Deep Space Mobile Battlestation',
          manufacturer:
            'Imperial Department of Military Research, Sienar Fleet Systems',
          cost_in_credits: '1000000000000',
          length: '120000',
          crew: '342,953',
          passengers: '843,342',
          max_atmosphering_speed: 'n/a',
          hyperdrive_rating: '4.0',
          MGLT: '10',
          cargo_capacity: '1000000000000',
          consumables: '3 years',
          pilots: [],
          created: '2020-09-17T17:55:06.604Z',
          edited: '2020-09-17T17:55:06.604Z',
          url: '',
        },
        description: 'A Starship',
        _id: '5f63a34fee9fd7000499be21',
        uid: '9',
        __v: 0,
      },
    };

    const starshipId = '9';

    service.getStarship(starshipId).subscribe((response) => {
      expect(response).toEqual(dummyStarshipResponse);
    });

    const req = httpMock.expectOne(
      `${API_URL}/${API_ROUTES_URLS.Starship}/${starshipId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyStarshipResponse);
  });
});
