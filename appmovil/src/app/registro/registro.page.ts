import { Component } from "@angular/core";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor() {}

  registrar() {
    
    console.log('Nombre de usuario:', this.username);
    console.log('Correo electrónico:', this.email);
    console.log('Contraseña:', this.password);
  }
}


