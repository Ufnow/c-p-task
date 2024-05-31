import { Person } from './people/person.model';
import { Starship } from './starship/starship.model';

export type Card = Person & Starship;
