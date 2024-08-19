import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../../auth/auth-state/auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { openModal } from '../../../utils/modal';
import {
  getActualDate,
  getDataFromLocalStorage,
  getDataFromSessionStorage,
} from '../../../utils/data-from-storage';
import { UserProgress } from '../../../models/userprogress';
import { updateUserProgress } from '../../user/actions/user.actions';
import { selectUserProgressUpdate } from '../../user/selectors/user.selectors';
import { SharedModule } from '../../../shared/shared.module';
interface Color {
  colorCode: string;
  colorNumber: number;
}
@Component({
  selector: 'app-color-memory',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './color-memory.component.html',
  styleUrl: './color-memory.component.css',
})
export class ColorMemoryComponent {
  @Output() puntuacionEmitted = new EventEmitter<number>();
  colorSequence: Color[] = [];
  guessedSequence: Color[] = [];
  colors: Color[] = [
    { colorCode: 'red', colorNumber: 1 },
    { colorCode: 'green', colorNumber: 2 },
    { colorCode: 'blue', colorNumber: 3 },
    { colorCode: 'yellow', colorNumber: 4 },
    { colorCode: 'purple', colorNumber: 5 },
    { colorCode: 'orange', colorNumber: 6 },
    { colorCode: 'pink', colorNumber: 7 },
    { colorCode: 'brown', colorNumber: 8 },
    { colorCode: 'cyan', colorNumber: 9 },
    { colorCode: 'lime', colorNumber: 10 },
  ];
  isGuessing: boolean = false;
  selectedCardIndex: number | null = null;
  counter: number = 5;
  interval: NodeJS.Timeout | undefined;
  gameData: any;
  timesChecked: number = 0;
  totalPoints = 2500;
  constructor(private readonly store: Store, private dialog: MatDialog) {
    this.gameData = getDataFromSessionStorage('activity');
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter);
    }, 1000);

    this.startGame();
  }

  startGame() {
    this.colorSequence = this.generateRandomSequence(this.gameData.next_level);
    console.log(this.colorSequence);
    this.guessedSequence = this.colorSequence.map(() => ({
      colorCode: 'white',
      colorNumber: 0,
    }));
    setTimeout(() => {
      this.isGuessing = true;
      clearInterval(this.interval);
    }, 5000);
  }

  generateRandomSequence(length: number): Color[] {
    const sequence: Color[] = [];
    for (let i = 0; i < length; i++) {
      sequence.push(
        this.colors[Math.floor(Math.random() * this.colors.length)]
      );
    }
    return sequence;
  }

  selectCard(index: number) {
    this.selectedCardIndex = index;
  }

  selectColor(color: Color) {
    if (this.selectedCardIndex !== null) {
      this.guessedSequence[this.selectedCardIndex] = color;
      this.selectedCardIndex = null;
    }
  }

  checkSequence() {
    this.timesChecked += 1;
    const isCorrect = this.guessedSequence.every(
      (color, index) =>
        color.colorNumber === this.colorSequence[index].colorNumber
    );
    const puntuation = this.calculatePuntuation(
      this.timesChecked,
      this.gameData.next_level
    );
    this.puntuacionEmitted.emit(puntuation);
    if (isCorrect) {
      if (puntuation < 500) {
        openModal(
          this.dialog,
          'OH NOOO! 😱',
          'Parece que tu secuencia de colores es correcta, pero tus puntos no son suficientes 🙄.',
          false,
          () => {
            window.location.reload();
          }
        );
        return;
      }
      openModal(
        this.dialog,
        '🎊👏¡Felicitaciones!👏🎊',
        'Tu secuencia es igual a la original, ya puedes avanzar al siguiente nivel. 🥳',
        false,
        () => {
          this.store.dispatch(startLoading());
          const { token } = getDataFromLocalStorage();
          const progress: UserProgress = {
            id: this.gameData.next_level_register_id,
            total_points: puntuation,
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
    } else {
      if (puntuation < 300) {
        openModal(
          this.dialog,
          'OH NOOO! 🤦',
          'Tienes una puntuación muy baja, vuelve a empezar 🙄.',
          false,
          () => {
            window.location.reload();
          }
        );
        return;
      } else {
        openModal(
          this.dialog,
          'UPS! 😱',
          'Parece que tu secuencia de colores no corresponde a la secuencia original 🙄. Vuelve a intentarlo',
          false,
          () => {}
        );
      }
    }
  }

  calculatePuntuation(timesChecked: number, level: number) {
    const calculate = () => {
      return this.totalPoints / (level + timesChecked);
    };

    const puntuacion = timesChecked <= 1 ? this.totalPoints : calculate();
    console.log('pts', { checks: this.timesChecked, puntuacion });
    return Math.round(puntuacion);
  }
}
