import { Component, OnInit } from '@angular/core';
import { RUTAS } from '../../model/constantes';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public get usuarioService(): UsuarioService {
    return this._usuarioService;
  }
  public set usuarioService(value: UsuarioService) {
    this._usuarioService = value;
  }

  rutas: Array<any>;

  constructor(private _usuarioService: UsuarioService, private router: Router) {
    console.trace('NavbarComponent constructor');

    this.rutas = RUTAS;
  }// constructor

  ngOnInit() {
    console.trace('NavbarComponent ngOnInit');
  }// ngOnInit

  onSalir() {
    console.trace('TareasComponent onSalir');

    this.usuarioService.cerrarSesion();
    this.router.navigate(['login']);

  }// salir

}// NavbarComponent