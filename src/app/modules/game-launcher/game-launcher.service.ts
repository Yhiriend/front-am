// game-launcher.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameLauncherService {
  private isMemoramaActive = false;

  isMemoramaAllowed(): boolean {
    return !this.isMemoramaActive;
  }

  setMemoramaActive() {
    this.isMemoramaActive = true;
  }

  setMemoramaInactive() {
    this.isMemoramaActive = false;
  }
}
