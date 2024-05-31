import { ApiSingleResultResponse } from '../api-generic-responses.model';

export type PersonApiResponse = ApiSingleResultResponse<PersonProperties>;

interface PersonProperties {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  name: string;
  homeworld: string;
  url: string;
}
