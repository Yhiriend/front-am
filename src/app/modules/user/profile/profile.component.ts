import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { decryptData } from '../../../utils/datahelper';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { openModal } from '../../../utils/modal';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { updateUser, updateUserResponse } from '../actions/user.actions';
import {
  Subject,
  first,
  last,
  skip,
  switchMap,
  take,
  takeLast,
  takeUntil,
  takeWhile,
} from 'rxjs';
import { selectUserUpdate } from '../selectors/user.selectors';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [CommonModule, SharedModule, MatIconModule, ReactiveFormsModule],
})
export default class ProfileComponent implements OnInit, OnDestroy {
  userId: number | null = null;
  token: string = '';
  hasPassword: boolean = false;
  private ngUnsubscribe = new Subject();

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    newPassword: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    address: new FormControl(''),
  });
genderList: any = [{value: 'MASCULINO', label: 'MASCULINO'}, {value: 'FEMENINO', label: 'FEMENINO'}];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private readonly store: Store
  ) {}

  ngOnDestroy(): void {
    this.store.complete();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    const data = this.getDataFromLocalStorage();
    if(!data.token){
      window.location.href = '/login'
    }
    const userData = data.userLoggedIn;
    this.userId = userData.id;
    this.token = data.token;

    this.editForm = this.fb.group({
      name: new FormControl(userData.name, Validators.required),
      surname: new FormControl(userData.surname, Validators.required),
      phone: new FormControl(userData.phone ?? null),
      email: new FormControl(userData.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', Validators.required),
      newPassword: new FormControl(''),
      age: new FormControl(userData.age ?? null),
      gender: new FormControl(userData.gender ?? ''),
      address: new FormControl(userData.address ?? null),
    });

    this.editForm.get('password')?.valueChanges.subscribe((value) => {
      if (value) {
        this.hasPassword = true;
      } else {
        this.hasPassword = false;
      }
    });
  }

  onLogoutClick() {
    if (localStorage.length !== 0) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }

  onCancelEditing() {
    window.location.href = '/dashboard'
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.editForm.valid) {
      const user: User = {
        id: this.userId!,
        name: this.editForm.controls['name'].value?.toUpperCase()!,
        surname: this.editForm.controls['surname'].value?.toUpperCase()!,
        email: this.editForm.controls['email'].value?.toUpperCase()!,
        address: this.editForm.controls['address'].value ?? null,
        age:
          Number(this.editForm.controls['age'].value) === 0
            ? null
            : Number(this.editForm.controls['age'].value),
        gender: this.editForm.controls['gender'].value ?? null,
        phone: this.editForm.controls['phone'].value ?? null,
        password: this.editForm.controls['password'].value,
      };

      const newPassword = this.editForm.controls['newPassword'].value;

      this.store.dispatch(updateUser({ user, newPassword, token: this.token }));

      this.store
        .select(selectUserUpdate)
        .pipe(
          skip(1),
          takeUntil(this.ngUnsubscribe),
          switchMap((updated: any): any => {
            if (!updated) {
              openModal(
                this.dialog,
                'Ups! 😶',
                'Algo salió mal 😓. Valida que tu contraseña actual sea la correcta o inténtalo más tarde.',
                false,
                () => {}
              );
              const result = { ...updated };
              this.store.dispatch(
                updateUserResponse({ result: { msg: null } })
              );
              return !result;
            }
            if (updated) {
              openModal(
                this.dialog,
                'Datos Actualizados',
                'Tus datos han sido actualizados. Para que puedas ver reflejado los cambios debes volver a iniciar sesión 🙄. Además, debes tener en cuenta que si actualizaste también tu correo o contraseña, debes iniciar sesión con el nuevo correo y la nueva contraseña 😋😋 ',
                false,
                () => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }
              );
            }
          })
        )
        .subscribe();
    } else {
      if (this.editForm.controls['password'].status === 'INVALID') {
        openModal(
          this.dialog,
          '¡Datos incompletos! 😶',
          'Para poder actualizar tus datos, debemos validar que realmente eres tú 🙄, para ello debes ingresar tu contraseña actual.',
          false,
          () => {}
        );
      }
    }
  }

  getDataFromLocalStorage() {
    const dataStorage = localStorage.getItem('token');
    let decryptedData: any = {};
    if (dataStorage) {
      decryptedData = decryptData(
        JSON.parse(dataStorage),
        environment.secretKey
      );
    }
    return decryptedData;
  }
}
