import { TestBed } from '@angular/core/testing';
import { SWApiService } from '../services/sw-api/sw-api.service';
import { DataMappingService } from '../services/mapper/mapper.service';
import { of } from 'rxjs';
import { GameType } from '../enums/game-type.enum';
import { SWGameState, SWGameStore, initialState } from './swgame.store';
import { getState, patchState } from '@ngrx/signals';
import { Starship } from '../models/starship/starship.model';

describe('SWGameStore', () => {
  //I had a problems with creating a store type,
  //and I couldn't find any proper solution for that,
  //the feature is still quite fresh and it is hard to find proper documentation for that
  let store: any;

  const swApiServiceMock = {
    getAllPeople: jest.fn(),
    getAllStarships: jest.fn(),
    getPerson: jest.fn(),
    getStarship: jest.fn(),
  };

  const mapperServiceMock = {
    mapPersonResponse: jest.fn(),
    mapStarshipResponse: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SWApiService, useValue: swApiServiceMock },
        { provide: DataMappingService, useValue: mapperServiceMock },
        SWGameStore,
      ],
    });

    store = TestBed.inject(SWGameStore);
  });

  it('should initialize with the default state', () => {
    const state = getState(store);
    expect(state).toEqual(initialState);
  });

  it('should load data and update the state', () => {
    swApiServiceMock.getAllPeople.mockReturnValue(
      of({ results: [{ uid: '1' }] })
    );
    swApiServiceMock.getAllStarships.mockReturnValue(
      of({ results: [{ uid: '2' }] })
    );

    store.loadData(null);
    expect(store.peopleIdList()).toEqual(['1']);
    expect(store.starshipsIdList()).toEqual(['2']);
    expect(store.loading()).toBe(false);
  });

  describe('Load cards', () => {
    it('should load cards and update the state, when game type is PEOPLE', () => {
      swApiServiceMock.getPerson.mockReturnValue(of({ uid: '1', mass: 70 }));
      mapperServiceMock.mapPersonResponse.mockReturnValue({
        uid: '1',
        mass: 70,
      });

      store.loadCards({
        gameType: GameType.PEOPLE,
        firstCardId: '1',
        secondCardId: '2',
      });

      expect(store.firstPlayerCard()).toEqual({ uid: '1', mass: 70 });
      expect(store.secondPlayerCard()).toEqual({ uid: '1', mass: 70 });
      expect(store.loading()).toBe(false);
    });

    it('should load cards and update the state, when game type is Starship', () => {
      swApiServiceMock.getStarship.mockReturnValue(of({ uid: '1', crew: 70 }));
      mapperServiceMock.mapStarshipResponse.mockReturnValue({
        uid: '1',
        crew: 70,
      });

      store.loadCards({
        gameType: GameType.STARSHIP,
        firstCardId: '1',
        secondCardId: '1',
      });

      expect(store.firstPlayerCard()).toEqual({ uid: '1', crew: 70 });
      expect(store.secondPlayerCard()).toEqual({ uid: '1', crew: 70 });
      expect(store.loading()).toBe(false);
    });
  });

  it('should reset the store state', () => {
    const mockedChangedState: Partial<SWGameState> = {
      firstPlayerScore: 5,
      secondPlayerScore: 2,
    };
    patchState(store, mockedChangedState);

    store.resetStore();

    expect(getState(store)).toEqual(initialState);
  });

  it('should switch category and clean cards in state', () => {
    const mockedChangedState: Partial<SWGameState> = {
      firstPlayerCard: { crew: 5 } as Starship,
      secondPlayerCard: { crew: 4 } as Starship,
    };
    patchState(store, mockedChangedState);

    const expectedStateAfterChange: SWGameState = {
      ...initialState,
      firstPlayerCard: null,
      secondPlayerCard: null,
    };

    store.switchCategory();

    expect(getState(store)).toEqual(expectedStateAfterChange);
  });
});
