import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { register } from '../actions/register.actions';
import { User } from '../../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AmModalComponent } from '../../../../shared/components/am-modal/am-modal.component';
import { selectAuthToken } from '../../auth-state/auth.selectors';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export default class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });

  msg: string = '';

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required),
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      if (
        this.registerForm.controls['password'].value ===
        this.registerForm.controls['passwordConfirm'].value
      ) {
        const user: User = {
          name: this.registerForm.controls['name'].value?.toUpperCase() || '',
          surname: this.registerForm.controls['surname'].value?.toUpperCase() || '',
          email: this.registerForm.controls['email'].value?.toUpperCase() || '',
          password: this.registerForm.controls['password'].value,
        };
        this.store.dispatch(register({ user }));
        this.store.select(selectAuthToken).subscribe((token) => {
          if (token === 'Successfully registered') {
            this.openNewModal(
              'Registro exitoso!',
              'Tu registro ha sido exitoso, ya puedes acceder a la plataforma 😍😍'
            );
          }
        });
      } else {
        this.msg = 'Las contraseñas no coinciden';
      }
    }
  }
  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  openNewModal(title: string, message: string) {
    const dialogRef = this.dialog.open(AmModalComponent, {
      data: { title: title, message: message },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('modal: ', result);
      this.router.navigate(['/login']);
    });
  }
}
