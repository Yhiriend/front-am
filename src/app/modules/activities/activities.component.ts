import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  getActivityById,
  getGeneralUserProgress,
} from '../user/actions/user.actions';
import {
  selectGeneralUserProgress,
  selectHasAccess,
  selectUserActivities,
} from '../user/selectors/user.selectors';
import { getDataFromLocalStorage } from '../../utils/data-from-storage';
import { openModal } from '../../utils/modal';
import { combineLatest, map, skip, take } from 'rxjs';

@Component({
  selector: 'app-activities',
  standalone: true,
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css',
  imports: [CommonModule, SharedModule, MatIconModule],
})
export default class ActivitiesComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { static: true }) container: ElementRef | undefined;

  activityName: string;
  totalActivitiesCompleted: string;
  totalActivitiesToComplete: string;
  totalProgress: string;
  data: any;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private readonly store: Store,
    private renderer: Renderer2
  ) {
    this.activityName = '';
    this.totalActivitiesToComplete = '';
    this.totalActivitiesCompleted = '';
    this.totalProgress = '';
    this.data = getDataFromLocalStorage();
    if (this.data && this.data.token) {
      const userData = this.data.userLoggedIn;
      this.store.dispatch(
        getGeneralUserProgress({ id: userData.id, token: this.data.token })
      );
    } else {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }

  ngAfterViewInit(): void {
    combineLatest([
      this.store.select(selectGeneralUserProgress),
      this.store.select(selectHasAccess),
    ]).subscribe(([progress, hasAccess]) => {
      if (hasAccess) {
        if (progress) {
          this.createCardActivity(progress);
        }
      } else if (hasAccess === false) {
        openModal(
          this.dialog,
          'UPS! 😱',
          'Al parecer tu sesión ha expirado. Vuelve a iniciar sesión🙄.',
          false,
          () => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/login';
          }
        );
      }
    });
  }

  ngOnInit(): void {}

  goHome() {
    window.location.href = '/dashboard';
  }

  onCardClick() {
    if (this.totalActivitiesCompleted === this.totalActivitiesToComplete) {
      openModal(
        this.dialog,
        'Vaya 😮',
        'Parece que ya has completado todos los niveles 😱. Te avisaremos pronto cual es tu siguiente reto 🤠.',
        false,
        () => {}
      );
    } else {
      window.location.href = '/activity/game-launcher';
    }
  }

  calculatePercentage(levelsCompleted: number, levelsToComplete: number) {
    const percentage = (levelsCompleted / levelsToComplete) * 100;
    return percentage;
  }

  getTheNextLevel(progress: any[]) {
    const nextLevelActivity = progress.find((item) => !item.completed);
    return nextLevelActivity ?? null;
  }

  createCardActivity(dataProgress: any[]) {
    const cardContainer = this.container?.nativeElement;
    cardContainer.innerHTML = '';
    dataProgress.forEach((activity) => {
      const card = this.renderer.createElement('div');
      this.renderer.addClass(card, 'card');
      const titleCard = this.renderer.createElement('h1');
      this.renderer.addClass(titleCard, 'title-card');
      const titleText = this.renderer.createText(activity.name);
      this.renderer.appendChild(titleCard, titleText);

      this.renderer.appendChild(card, titleCard);

      const progressLevels = this.renderer.createElement('p');
      this.renderer.addClass(progressLevels, 'p-levels');

      const progressLevelsText = this.renderer.createText(
        'Completado: ' +
          activity.completed_levels +
          ' / ' +
          activity.total_levels
      );

      this.renderer.appendChild(progressLevels, progressLevelsText);

      this.renderer.appendChild(card, progressLevels);

      const progressPercent = this.renderer.createElement('div');
      this.renderer.addClass(progressPercent, 'p-data');

      const progressElementLeft = this.renderer.createElement('p');
      this.renderer.addClass(progressElementLeft, 'p-text');

      const progressTextLeft = this.renderer.createText('Progreso');
      this.renderer.appendChild(progressElementLeft, progressTextLeft);

      const progressElementRight = this.renderer.createElement('p');
      this.renderer.addClass(progressElementRight, 'p-percent');

      const progress = this.calculatePercentage(
        activity.completed_levels,
        activity.total_levels
      );

      const progressTextRight = this.renderer.createText(progress + '%');

      this.renderer.appendChild(progressElementRight, progressTextRight);

      this.renderer.appendChild(progressPercent, progressElementLeft);
      this.renderer.appendChild(progressPercent, progressElementRight);

      this.renderer.appendChild(card, progressPercent);

      const progressBar = this.renderer.createElement('div');
      this.renderer.addClass(progressBar, 'progress-bar');
      const progressBarInside = this.renderer.createElement('div');
      this.renderer.addClass(progressBarInside, 'progress-bar-inside');

      this.renderer.setStyle(progressBarInside, 'width', progress + '%');

      this.renderer.appendChild(progressBar, progressBarInside);

      this.renderer.appendChild(card, progressBar);
      this.renderer.listen(card, 'click', () => {
        if (activity.name === 'MEMORAMA') {
          if (progress === 100) {
            openModal(
              this.dialog,
              'Modo Experto 🤫.',
              'Ya eres todo un experto en esta actividad 🧐, por el momento no tenemos más niveles para tu SUPER PODER 🙄.',
              false,
              () => {}
            );
          } else {
            if (activity.completed_levels === 0) {
              this.store.dispatch(
                getActivityById({
                  id: activity.activity_id,
                  token: this.data.token,
                })
              );
              this.store
                .select(selectUserActivities)
                .subscribe((activities) => {
                  if (activities) {
                    openModal(
                      this.dialog,
                      activities.data.name,
                      activities.data.description,
                      false,
                      () => {
                        sessionStorage.setItem(
                          'activity',
                          JSON.stringify(activity)
                        );
                        window.location.href = '/activity/game-launcher';
                      }
                    );
                  }
                });
            } else {
              sessionStorage.setItem('activity', JSON.stringify(activity));
              window.location.href = '/activity/game-launcher';
            }
          }
        } else if (activity.name === 'LABERINTO DE ZEN') {
          if (progress === 100) {
            openModal(
              this.dialog,
              'Modo Experto 🤫.',
              'Ya eres todo un experto en esta actividad 🧐, por el momento no tenemos más niveles para tu SUPER PODER 🙄.',
              false,
              () => {}
            );
          } else {
            if (activity.completed_levels === 0) {
              this.store.dispatch(
                getActivityById({
                  id: activity.activity_id,
                  token: this.data.token,
                })
              );
              this.store
                .select(selectUserActivities)
                .subscribe((activities) => {
                  if (activities) {
                    openModal(
                      this.dialog,
                      activities.data.name,
                      activities.data.description,
                      false,
                      () => {
                        sessionStorage.setItem(
                          'activity',
                          JSON.stringify(activity)
                        );
                        window.location.href = '/activity/game-launcher';
                      }
                    );
                  }
                });
            } else {
              sessionStorage.setItem('activity', JSON.stringify(activity));
              window.location.href = '/activity/game-launcher';
            }
          }
        } else if (activity.name === 'ARMONÍA DEL COLOR') {
          if (progress === 100) {
            openModal(
              this.dialog,
              'Modo Experto 🤫.',
              'Ya eres todo un experto en esta actividad 🧐, por el momento no tenemos más niveles para tu SUPER PODER 🙄.',
              false,
              () => {}
            );
          } else {
            if (activity.completed_levels === 0) {
              this.store.dispatch(
                getActivityById({
                  id: activity.activity_id,
                  token: this.data.token,
                })
              );
              this.store
                .select(selectUserActivities)
                .subscribe((activities) => {
                  if (activities) {
                    openModal(
                      this.dialog,
                      activities.data.name,
                      activities.data.description,
                      false,
                      () => {
                        sessionStorage.setItem(
                          'activity',
                          JSON.stringify(activity)
                        );
                        window.location.href = '/activity/game-launcher';
                      }
                    );
                  }
                });
            } else {
              sessionStorage.setItem('activity', JSON.stringify(activity));
              window.location.href = '/activity/game-launcher';
            }
          }
        } else {
          openModal(
            this.dialog,
            'UPS!',
            'Esta ACTIVIDAD se encuentra actualmente en desarrollo',
            false,
            () => {}
          );
        }
      });

      this.renderer.appendChild(cardContainer, card);
    });
  }
}
