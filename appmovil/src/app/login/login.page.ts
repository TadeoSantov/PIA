import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private router: Router) {}

  login() {
    // Aquí puedes agregar la lógica para iniciar sesión
    // Puedes verificar las credenciales ingresadas, realizar una solicitud a una API, etc.
    // Por ahora, simplemente redirigiremos a la página de inicio después de hacer clic en "Iniciar Sesión"
    this.router.navigate(['/home']);
  }
}
