import { MatDialog } from '@angular/material/dialog';
import { AmModalComponent } from '../shared/components/am-modal/am-modal.component';
import { filter, take } from 'rxjs';

let isModalOpen = false;

export const openModal = (
  dialog: MatDialog,
  title: string,
  message: string,
  secondaryButtonEnabled: boolean = true,
  onResult: () => void
) => {
  if (isModalOpen) {
    // Si ya hay un modal abierto, no hacemos nada
    return;
  }

  isModalOpen = true;

  const dialogRef = dialog.open(AmModalComponent, {
    minWidth: '300px',
    maxWidth: '50vw',
    disableClose: true,
    data: { title: title, message: message, secondaryButtonEnabled },
  });
  dialogRef
    .afterClosed()
    .pipe(
      take(1),
      filter(() => isModalOpen)
    )
    .subscribe(() => {
      onResult();
      isModalOpen = false;
    });
};
