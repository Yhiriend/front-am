import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared.module";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-am-modal',
    standalone: true,
    templateUrl: './am-modal.component.html',
    styleUrl: './am-modal.component.css',
    imports: [CommonModule, SharedModule]
})
export class AmModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AmModalComponent>){}

  onBackgroundClick(): void {
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
