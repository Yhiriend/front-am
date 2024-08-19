import {
  Component,
  ElementRef,
  Renderer2,
  OnInit,
  ContentChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { openModal } from '../../../utils/modal';
import { Store } from '@ngrx/store';
import { updateUserProgress } from '../../user/actions/user.actions';
import { UserProgress } from '../../../models/userprogress';
import { selectUserProgressUpdate } from '../../user/selectors/user.selectors';
import {
  getActualDate,
  getDataFromLocalStorage,
} from '../../../utils/data-from-storage';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css',
})
export class MemoryComponent implements OnInit {
  @ContentChild('customTemplate', { static: true })
  customTemplate: TemplateRef<any> | null = null;
  totalCards: number = 2;
  @Output() emitMoves = new EventEmitter<any>();
  cards: any = [];
  selectedCards: any = [];
  valuesUsed: any = [];
  currentMove = 0;
  resolvedCards: any = [];
  totalMoves: number = 0;
  targetMoves: number = 0;
  cardWidth!: number;
  cardHeight!: number;
  gameData: any;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private dialog: MatDialog,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.gameData = JSON.parse(sessionStorage.getItem('activity') ?? '');
      this.totalCards = this.calculateTotalCards(this.gameData.next_level);
      this.targetMoves = this.totalCards / 2 + 3;
      const { width, height } = this.calculateCardSize(this.totalCards);
      this.cardWidth = width;
      this.cardHeight = height;
      this.constructGame();
      this.emitMovesEvent();
    }
  }

  emitMovesEvent() {
    const moves = {
      totalMoves: this.totalMoves,
      targetMoves: this.targetMoves,
    };
    this.emitMoves.emit(moves);
  }

  constructGame(): void {
    const gameElement = this.el.nativeElement.querySelector('#game');

    if (gameElement) {
      for (let i = 0; i < this.totalCards; i++) {
        const card = this.createCard();
        this.renderer.appendChild(gameElement, card);
        this.cards.push(card);
        this.randomValue();
        this.renderer.setProperty(
          card.querySelector('.face'),
          'innerHTML',
          this.valuesUsed[i]
        );
        this.renderer.listen(card, 'click', () => this.activate(card));
      }
    }
  }

  createCard(): HTMLElement {
    const card = this.renderer.createElement('div');
    this.renderer.addClass(card, 'card');

    this.renderer.setStyle(card, 'width', `${this.cardWidth}px`);
    this.renderer.setStyle(card, 'height', `${this.cardHeight}px`);

    const backDiv = this.renderer.createElement('div');
    this.renderer.addClass(backDiv, 'back');

    const faceDiv = this.renderer.createElement('div');
    this.renderer.addClass(faceDiv, 'face');

    this.renderer.appendChild(card, backDiv);
    this.renderer.appendChild(card, faceDiv);
    return card;
  }

  //before update
  activate(card: HTMLElement) {
    if (this.currentMove < 2) {
      const target = card;

      if (target instanceof HTMLElement) {
        const cardToEvaluate = target.querySelector('.face')?.innerHTML;

        if (!this.validateWithResolvedCards(cardToEvaluate!.toString())) {
          this.renderer.addClass(target, 'active');

          if (!this.selectedCards[0] || this.selectedCards[0] !== target) {
            this.selectedCards.push(target);

            if (++this.currentMove == 2) {
              this.totalMoves++;
              this.emitMovesEvent();
              const firstCardFace =
                this.selectedCards[0].querySelector('.face');
              const secondCardFace =
                this.selectedCards[1].querySelector('.face');

              if (firstCardFace && secondCardFace) {
                if (firstCardFace.innerHTML === secondCardFace.innerHTML) {
                  this.resolvedCards.push(firstCardFace.innerHTML);

                  this.renderer.addClass(firstCardFace, 'resolved');
                  this.renderer.addClass(secondCardFace, 'resolved');

                  this.selectedCards = [];
                  this.currentMove = 0;

                  if (this.checkWinner()) {
                    const totalPuntuation = this.calculatePuntuation(
                      this.totalMoves,
                      this.targetMoves
                    );
                    if (totalPuntuation >= 500) {
                      openModal(
                        this.dialog,
                        '🎊👏¡Felicitaciones!👏🎊',
                        'Has superado la puntuación mínima 🧐. Ya puedes avanzar al siguiente nivel🥳.',
                        false,
                        () => {
                          const { token } = getDataFromLocalStorage();
                          const progress: UserProgress = {
                            id: this.gameData.next_level_register_id,
                            total_points: totalPuntuation,
                            completed: true,
                            last_date: getActualDate(),
                          };
                          this.store.dispatch(
                            updateUserProgress({ progress, token })
                          );
                        }
                      );
                    } else {
                      openModal(
                        this.dialog,
                        '¡Terminaste!😶',
                        'Has revelado todas las cartas, pero para poder superar este nivel debes obtener una puntuación mayor o igual a 500 puntos 🙄🙄.',
                        false,
                        () => {
                          window.location.reload();
                        }
                      );
                    }

                    this.store
                      .select(selectUserProgressUpdate)
                      .subscribe((hasProgressBeenUpdated) => {
                        if (hasProgressBeenUpdated) {
                          window.location.href = '/activity';
                        }
                      });
                  }
                } else {
                  setTimeout(() => {
                    this.selectedCards.forEach((selectedCard: any) => {
                      this.renderer.removeClass(selectedCard, 'active');
                    });
                    this.selectedCards = [];
                    this.currentMove = 0;
                  }, 600);
                }
              }
            }
          }
        }
      }
    }
  }

  validateWithResolvedCards(cardFace: string): boolean {
    return this.resolvedCards.includes(cardFace);
  }

  randomValue() {
    let rnd = Math.floor(Math.random() * this.totalCards * 0.5);
    let values = this.valuesUsed.filter((value: any) => value === rnd);
    if (values.length < 2) {
      this.valuesUsed.push(rnd);
    } else {
      this.randomValue();
    }
  }

  checkWinner(): boolean {
    let totalResolved = this.resolvedCards.length;
    return totalResolved === this.targetMoves - 3;
  }

  calculateCardSize(totalCards: number): { width: number; height: number } {
    const containerWidth = 430;
    const containerHeight = 450;

    const columns = Math.ceil(Math.sqrt(totalCards));
    const rows = Math.ceil(totalCards / columns);

    const margin = 10;

    const cardWidth = (containerWidth - (columns - 1) * margin) / columns;
    const cardHeight = (containerHeight - (rows - 1) * margin) / rows;

    return { width: cardWidth, height: cardHeight };
  }

  calculateTotalCards(activityLevel: number) {
    return activityLevel * 2 + 2;
  }

  calculatePuntuation(totalMoves: number, targetMoves: number): number {
    const result = (targetMoves / totalMoves) * 1000;
    return Math.ceil(result);
  }
}
