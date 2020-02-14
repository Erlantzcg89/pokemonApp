import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  rutas: Array<any>;

  constructor() {
    console.trace('NavbarComponent constructor');
    this.rutas = [
      {
        'ruta': 'inicio',
        'nombre': 'Inicio',
        'icono': ''
      },
      {
        'ruta': 'compras',
        'nombre': 'Compras',
        'icono': ''
      }
    ];

  }// constructor

  ngOnInit() {
    console.trace('NavbarComponent ngOnInit');
  }// ngOnInit

  salir() {
    console.trace('NavbarComponent click boton Cerrar Sesión');

  }// salir

}// NavbarComponent