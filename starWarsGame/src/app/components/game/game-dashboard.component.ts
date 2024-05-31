import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { SWGameStore } from '../../_store/swgame.store';
import { GameType } from '../../enums/game-type.enum';
import { Player } from '../../enums/player.enum';
import { GenericCardComponent } from '../generic-card/generic-card.component';
import { Starship } from '../../models/starship/starship.model';
import { Person } from '../../models/people/person.model';
import { getRandomElements } from '../../utils/get-random-elements-from-array';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GameResult } from 'src/app/enums/game-result.enum';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-game-dashboard',
  standalone: true,
  imports: [
    GenericCardComponent,
    LoaderComponent,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  providers: [SWGameStore],
  styleUrl: './game-dashboard.component.scss',
  templateUrl: './game-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GameDashboardComponent implements OnInit {
  store = inject(SWGameStore);

  gameType = GameType.PEOPLE;
  firstCard?: Person | Starship;
  secondCard?: Person | Starship;
  player = Player;

  gameTypes = GameType;
  gameResult = GameResult;

  ngOnInit(): void {
    this.store.loadData(null);
  }

  /**
   * Switches the game type and updates the store accordingly.
   * @param {GameType} gameType - The type of game to switch to.
   */
  switchGameType(gameType: GameType): void {
    this.gameType = gameType;
    this.store.switchCategory();
  }

  /**
   * Initiates the game by selecting random elements and loading the corresponding cards.
   */
  play() {
    const getRandomIds = this.prepareRandomIds();

    if (getRandomIds.length === 2) {
      this.store.loadCards({
        gameType: this.gameType,
        firstCardId: getRandomIds[0],
        secondCardId: getRandomIds[1],
      });
    }
  }

  /**
   * Resets the game.
   */
  resetGame(): void {
    this.store.resetStore();
  }

  /**
   * Prepare random Ids to fetch cards
   */
  private prepareRandomIds(): string[] {
    let idListFromStore;

    if (this.gameType === GameType.PEOPLE) {
      idListFromStore = this.store.peopleIdList();
    } else {
      idListFromStore = this.store.starshipsIdList();
    }

    return getRandomElements(idListFromStore);
  }
}
