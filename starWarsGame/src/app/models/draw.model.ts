import { GameType } from '../enums/game-type.enum';

export interface Draw {
  gameType: GameType;
  firstCardId: string;
  secondCardId: string;
}
