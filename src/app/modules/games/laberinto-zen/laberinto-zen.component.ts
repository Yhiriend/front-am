import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { openModal } from '../../../utils/modal';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  getActualDate,
  getDataFromLocalStorage,
  getDataFromSessionStorage,
} from '../../../utils/data-from-storage';
import { UserProgress } from '../../../models/userprogress';
import { startLoading, stopLoading } from '../../auth/auth-state/auth.actions';
import { updateUserProgress } from '../../user/actions/user.actions';
import { selectUserProgressUpdate } from '../../user/selectors/user.selectors';

@Component({
  selector: 'app-laberinto-zen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './laberinto-zen.component.html',
  styleUrl: './laberinto-zen.component.css',
})
export class LaberintoZenComponent implements OnInit {
  @Output() puntuacionEmitted = new EventEmitter<number>();
  maze: number[][] = [];
  playerPosition = { x: 0, y: 0 };
  gameData: any;
  puntuation: number = 3000;
  interval: NodeJS.Timeout | undefined;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private readonly store: Store
  ) {
    this.gameData = getDataFromSessionStorage('activity');
    if (this.gameData) {
      this.loadMaze(this.gameData.next_level);
    }
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.puntuation = this.puntuation - 100;
      this.puntuacionEmitted.emit(this.puntuation);
      if (this.puntuation <= 400) {
        clearInterval(this.interval);

        openModal(
          this.dialog,
          '🕔 Tiempo agotado 🕑',
          'Lo siento, pero tu puntuación ha caído muy bajo. Vuelve a empezar 😓',
          false,
          () => {
            window.location.reload();
          }
        );
      }
    }, 1000);
  }

  loadMaze(level: number) {
    this.http
      .get(`assets/zen/${level}.txt`, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          const rows = data.split('\n').map((row) => row.trim());
          if (rows.length === 18 && rows.every((row) => row.length === 18)) {
            this.maze = rows.map((row) => row.split('').map(Number));
            this.setInitialPosition();
          } else {
            console.error('El archivo no es de 18x18.');
          }
        },
        (error: any) => {
          console.error('Error loading maze:', error);
        }
      );
  }

  setInitialPosition() {
    for (let x = 0; x < this.maze.length; x++) {
      for (let y = 0; y < this.maze[x].length; y++) {
        if (this.maze[x][y] === 2) {
          this.playerPosition = { x, y };
          return;
        }
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const { x, y } = this.playerPosition;
    switch (event.key) {
      case 'ArrowUp':
        if (this.canMove(x - 1, y)) this.playerPosition.x--;
        break;
      case 'ArrowDown':
        if (this.canMove(x + 1, y)) this.playerPosition.x++;
        break;
      case 'ArrowLeft':
        if (this.canMove(x, y - 1)) this.playerPosition.y--;
        break;
      case 'ArrowRight':
        if (this.canMove(x, y + 1)) this.playerPosition.y++;
        break;
    }
  }

  canMove(x: number, y: number): boolean {
    const cellValue = this.maze[x][y];
    if (cellValue === 3) {
      console.log('WINNER');
      this.hasWon();
    }
    console.log('moving...');
    return (
      (this.maze[x] && this.maze[x][y] === 0) ||
      (this.maze[x] && this.maze[x][y] === 3) ||
      (this.maze[x] && this.maze[x][y] === 2)
    );
  }

  hasWon() {
    clearInterval(this.interval);
    openModal(
      this.dialog,
      '🎊👏¡Felicitaciones!👏🎊',
      'Has encontrado la salida, ya puedes avanzar al siguiente nivel. 🥳',
      false,
      () => {
        this.store.dispatch(startLoading());
        const { token } = getDataFromLocalStorage();
        const progress: UserProgress = {
          id: this.gameData.next_level_register_id,
          total_points: this.puntuation,
          completed: true,
          last_date: getActualDate(),
        };
        this.store.dispatch(updateUserProgress({ progress, token }));
        this.store.dispatch(stopLoading());
        this.store
          .select(selectUserProgressUpdate)
          .subscribe((hasProgressBeenUpdated) => {
            if (hasProgressBeenUpdated) {
              window.location.href = '/activity';
            }
          });
      }
    );
  }
}
