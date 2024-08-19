import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memorama',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css'],
})
export class MemoramaComponent implements OnInit {
  totalCards = 6;
  cards: any = [];
  selectedCards: any = [];
  valuesUsed: any = [];
  currentMove = 0;
  resolvedCards: any = [];
  n = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    console.log('first memorama constructor')
  }

  ngOnInit(): void {
    this.constructGame();
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
    console.log('card number', this.n++)
    const card = this.renderer.createElement('div');
    this.renderer.addClass(card, 'card');
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
              const firstCardFace =
                this.selectedCards[0].querySelector('.face');
              const secondCardFace =
                this.selectedCards[1].querySelector('.face');

              if (firstCardFace && secondCardFace) {
                if (firstCardFace.innerHTML === secondCardFace.innerHTML) {
                  this.resolvedCards.push(firstCardFace.innerHTML);
                  console.log(this.selectedCards[0])

                  this.renderer.addClass(firstCardFace,'resolved');
                  this.renderer.addClass(secondCardFace,'resolved');

                  console.log('cards resolved', this.resolvedCards);
                  this.selectedCards = [];
                  this.currentMove = 0;
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
}
