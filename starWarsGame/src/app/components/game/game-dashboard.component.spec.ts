import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDashboardComponent } from './game-dashboard.component';
import { SWGameStore } from '../../_store/swgame.store';
import { GameType } from '../../enums/game-type.enum';
import { GenericCardComponent } from '../generic-card/generic-card.component';
import { getRandomElements } from '../../utils/get-random-elements-from-array';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LoaderComponent } from '../loader/loader.component';
import { HttpClientModule } from '@angular/common/http';

jest.mock('../../utils/get-random-elements-from-array', () => ({
  getRandomElements: jest.fn(),
}));

describe('GameDashboardComponent', () => {
  let component: GameDashboardComponent;
  let fixture: ComponentFixture<GameDashboardComponent>;
  let store: any;

  //   const swGameStoreMock = {
  //     loadData: jest.fn(),
  //     switchCategory: jest.fn(),
  //     loadCards: jest.fn(),
  //     resetStore: jest.fn(),
  //     peopleIdList: jest.fn().mockReturnValue(['1', '2', '3']),
  //     starshipsIdList: jest.fn().mockReturnValue(['4', '5', '6']),
  //   };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatButtonModule,
        MatButtonToggleModule,
        GenericCardComponent,
        LoaderComponent,
        GameDashboardComponent,
      ],
      providers: [SWGameStore],
    }).compileComponents();

    fixture = TestBed.createComponent(GameDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SWGameStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('prepareRandomIds', () => {
    it('should return random IDs for people', () => {
      (getRandomElements as jest.Mock).mockReturnValue(['1', '2']);
      component.gameType = GameType.PEOPLE;

      // @ts-ignore
      const randomIds = component.prepareRandomIds();

      expect(randomIds).toEqual(['1', '2']);
    });

    it('should return random IDs for starships', () => {
      (getRandomElements as jest.Mock).mockReturnValue(['4', '5']);
      component.gameType = GameType.STARSHIP;

      // @ts-ignore
      const randomIds = component.prepareRandomIds();

      expect(randomIds).toEqual(['4', '5']);
    });
  });
});
