import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaginatedResponse } from '../../models/api-generic-responses.model';
import { API_ROUTES_URLS, API_URL } from '../../urls';
import { PersonApiResponse } from '../../models/people/person-api-resposne.model';
import { StarshipApiResponse } from '../../models/starship/starship-api-response.model';

@Injectable({ providedIn: 'root' })
export class SWApiService {
  readonly http = inject(HttpClient);

  getAllPeople(): Observable<ApiPaginatedResponse> {
    return this.http.get<ApiPaginatedResponse>(
      `${API_URL}/${API_ROUTES_URLS.People}/?page=1&limit=9999`
    );
  }

  getAllStarships(): Observable<ApiPaginatedResponse> {
    return this.http.get<ApiPaginatedResponse>(
      `${API_URL}/${API_ROUTES_URLS.Starship}/?page=1&limit=9999`
    );
  }

  getPerson(id: string): Observable<PersonApiResponse> {
    return this.http.get<PersonApiResponse>(
      `${API_URL}/${API_ROUTES_URLS.People}/${id}`
    );
  }

  getStarship(id: string): Observable<StarshipApiResponse> {
    return this.http.get<StarshipApiResponse>(
      `${API_URL}/${API_ROUTES_URLS.Starship}/${id}`
    );
  }
}
