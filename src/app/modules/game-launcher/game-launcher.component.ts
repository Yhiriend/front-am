import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryComponent } from '../games/memory/memory.component';
import {
  getDataFromLocalStorage,
  getDataFromSessionStorage,
} from '../../utils/data-from-storage';
import { SharedModule } from '../../shared/shared.module';
import { LaberintoZenComponent } from '../games/laberinto-zen/laberinto-zen.component';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../auth/auth-state/auth.actions';
import { ColorMemoryComponent } from '../games/color-memory/color-memory.component';

@Component({
  selector: 'app-game-launcher',
  standalone: true,
  templateUrl: './game-launcher.component.html',
  styleUrl: './game-launcher.component.css',
  imports: [
    CommonModule,
    MemoryComponent,
    SharedModule,
    LaberintoZenComponent,
    ColorMemoryComponent,
  ],
})
export default class GameLauncherComponent implements AfterViewInit, OnInit {
  @ViewChild(MemoryComponent) memoryComponent: MemoryComponent | undefined;
  levelToPlay: number = 1;
  activityName: string = '';
  activityProgressId: number = 0;
  totalMoves = 0;
  targetMoves = 0;
  points = '0';
  targetPoints: number = 500;
  armonyLevel: number = 0;
  constructor(private renderer: Renderer2, private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(startLoading());
    const data = getDataFromLocalStorage();
    if (!data?.token) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    this.store.dispatch(stopLoading());

    const dataSession = getDataFromSessionStorage('activity');
    this.activityName = dataSession.name;

    this.points = '2,500';
  }

  ngAfterViewInit(): void {}

  receiveMoves(moves: any) {
    this.totalMoves = moves.totalMoves;
    this.targetMoves = moves.targetMoves;
    if (this.totalMoves > 0) {
      this.points = this.calculatePuntuation(
        this.totalMoves,
        this.targetMoves
      ).toLocaleString();
    }
  }

  calculatePuntuation(totalMoves: number, targetMoves: number): number {
    const result = (targetMoves / totalMoves) * 1000;
    return Math.ceil(result);
  }

  launchActivity(activityName: string) {
    switch (activityName) {
      case 'MEMORAMA':
        break;
      case 'ARMONÍA DEL COLOR':
        break;
      case 'LABERINTO DE ZEN':
        break;
      default:
        break;
    }
  }

  goToActivity() {
    window.location.href = '/activity';
  }

  handlePuntuacion(puntuation: number) {
    this.points = puntuation.toLocaleString();
  }
}
