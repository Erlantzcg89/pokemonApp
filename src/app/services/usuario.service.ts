import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { PokemonService } from './pokemon.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private isLogged: boolean;
  private usuario: Usuario;
  private sesion: Usuario;

  constructor(private router: Router, private pokemonService: PokemonService) {
    console.trace('UsuarioService constructor');
    this.isLogged = false;
    this.usuario = undefined;
    this.sesion = undefined;

  }// constructor

  estaLogeado(): boolean {
    console.trace('UsuarioService estaLogeado');

    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));

    if (this.usuario) {
      this.isLogged = true;
    }

    return this.isLogged;
  }

  login(nombre: string, password: string): any {
    console.trace('UsuarioService login nombre %s password %s', nombre, password);

    this.pokemonService.login(nombre, password).subscribe(
      datos => {
        console.debug('login ok %o', datos);

        this.usuario = datos;

        if (this.usuario) {

          this.sesion = new Usuario();
          this.sesion.nombre = nombre;

          sessionStorage.setItem('usuario', JSON.stringify(this.sesion));

          this.isLogged = true;

          console.trace('usuario encontrado');

          this.router.navigate(['backoffice']);

        } else {
          console.trace('usuario NO encontrado');
          this.isLogged = false;
        }

        return this.sesion;

      },
      error => {
        console.warn(error);

      });


  }// login

  getSesion() {
    this.sesion = JSON.parse(sessionStorage.getItem('usuario'));
    return this.sesion;
  }// getSesion

  cerrarSesion() {
    console.trace('UsuarioService cerrarSesion');
    this.isLogged = false;
    sessionStorage.removeItem('usuario');
  }

}// UsuarioService