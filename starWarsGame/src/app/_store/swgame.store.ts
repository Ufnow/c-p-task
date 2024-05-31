import {
  signalStore,
  withState,
  withMethods,
  patchState,
  StateSignal,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { SWApiService } from '../services/sw-api/sw-api.service';
import { distinctUntilChanged, forkJoin, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { DataMappingService } from '../services/mapper/mapper.service';
import { GameType } from '../enums/game-type.enum';
import { Draw } from '../models/draw.model';
import { PersonApiResponse } from '../models/people/person-api-resposne.model';
import { StarshipApiResponse } from '../models/starship/starship-api-response.model';
import { Starship } from '../models/starship/starship.model';
import { Person } from '../models/people/person.model';
import { GameResult } from '../enums/game-result.enum';

export interface SWGameState {
  peopleIdList: string[];
  starshipsIdList: string[];
  firstPlayerScore: number;
  secondPlayerScore: number;
  firstPlayerCard: Person | Starship | null;
  secondPlayerCard: Person | Starship | null;
  gameResult: GameResult | null;
  loading: boolean;
  error: boolean;
}

export const initialState = {
  peopleIdList: [],
  starshipsIdList: [],
  firstPlayerScore: 0,
  secondPlayerScore: 0,
  firstPlayerCard: null,
  secondPlayerCard: null,
  gameResult: null,
  loading: false,
  error: false,
};

export const SWGameStore = signalStore(
  withState<SWGameState>(initialState),
  withMethods(
    (
      store,
      swApiService = inject(SWApiService),
      mapperService = inject(DataMappingService)
    ) => ({
      loadData: rxMethod(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { loading: true })),
          switchMap(() => {
            return forkJoin([
              swApiService.getAllPeople(),
              swApiService.getAllStarships(),
            ]).pipe(
              tapResponse({
                next: ([people, starships]) =>
                  patchState(store, {
                    loading: false,
                    peopleIdList: people.results.map((result) => result.uid),
                    starshipsIdList: starships.results.map(
                      (result) => result.uid
                    ),
                  }),

                error: () => {
                  patchState(store, { loading: false, error: true });
                },
              })
            );
          })
        )
      ),
      loadCards: rxMethod<Draw>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { loading: true })),
          switchMap((draw) => {
            const gameTypeDataFetchMethod =
              draw.gameType === GameType.PEOPLE
                ? (id: string) => swApiService.getPerson(id)
                : (id: string) => swApiService.getStarship(id);

            return forkJoin({
              firstCard: gameTypeDataFetchMethod(draw.firstCardId),
              secondCard: gameTypeDataFetchMethod(draw.secondCardId),
            }).pipe(
              tapResponse({
                next: ({ firstCard, secondCard }) => {
                  const firstPlayerCard =
                    draw.gameType === GameType.PEOPLE
                      ? mapperService.mapPersonResponse(
                          firstCard as PersonApiResponse
                        )
                      : mapperService.mapStarshipResponse(
                          firstCard as StarshipApiResponse
                        );

                  const secondPlayerCard =
                    draw.gameType === GameType.PEOPLE
                      ? mapperService.mapPersonResponse(
                          secondCard as PersonApiResponse
                        )
                      : mapperService.mapStarshipResponse(
                          secondCard as StarshipApiResponse
                        );

                  const firstValue =
                    draw.gameType === GameType.PEOPLE
                      ? (firstPlayerCard as Person).mass
                      : (firstPlayerCard as Starship).crew;

                  const secondValue =
                    draw.gameType === GameType.PEOPLE
                      ? (secondPlayerCard as Person).mass
                      : (secondPlayerCard as Starship).crew;

                  if (firstValue > secondValue) {
                    patchState(store, (state) => ({
                      firstPlayerScore: state.firstPlayerScore + 1,
                      gameResult: GameResult.FIRST_PLAYER_WIN,
                    }));
                  } else if (secondValue > firstValue) {
                    patchState(store, (state) => ({
                      secondPlayerScore: state.secondPlayerScore + 1,
                      gameResult: GameResult.SECOND_PLAYER_WIN,
                    }));
                  } else {
                    patchState(store, (state) => ({
                      gameResult: GameResult.DRAW,
                    }));
                  }

                  return patchState(store, {
                    firstPlayerCard,
                    secondPlayerCard,
                    loading: false,
                  });
                },
                error: () => {
                  patchState(store, { loading: false, error: true });
                },
              })
            );
          })
        )
      ),
      resetStore: () => {
        patchState(store, {
          firstPlayerScore: 0,
          secondPlayerScore: 0,
          firstPlayerCard: null,
          secondPlayerCard: null,
          gameResult: null,
        });
      },
      switchCategory: () => {
        patchState(store, {
          firstPlayerCard: null,
          secondPlayerCard: null,
        });
      },
    })
  )
);
