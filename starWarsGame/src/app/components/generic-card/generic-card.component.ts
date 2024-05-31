import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  input,
} from '@angular/core';
import { GameType } from '../../enums/game-type.enum';
import { CommonModule } from '@angular/common';
import { Starship } from '../../models/starship/starship.model';
import { Person } from '../../models/people/person.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericCardComponent {
  @Input() type?: GameType;
  item = input<Person | Starship | null>();
  gameType = GameType;

  person = computed(() => this.item() as Person);
  starship = computed(() => this.item() as Starship);
}
