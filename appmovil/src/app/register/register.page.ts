import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  register() {
    console.log('Correo Electrónico:', this.email);
    console.log('Nombre de Usuario:', this.username);
    console.log('Contraseña:', this.password);

    this.router.navigate(['/home']);
  }
}
