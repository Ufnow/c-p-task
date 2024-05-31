import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameDashboardComponent } from './components/game/game-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'starWarsGame';
}
