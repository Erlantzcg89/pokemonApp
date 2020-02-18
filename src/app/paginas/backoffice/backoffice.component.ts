import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Alerta } from 'src/app/model/alerta';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  pokemons: Array<any>;
  pSeleccionado: any;
  alerta: any;

  constructor(private pokemonService: PokemonService) {
    console.log('BackofficeComponent constructor');

    this.pokemons = [];
    this.pSeleccionado = '';
    this.alerta = undefined;
  }// BackofficeComponent constructor

  ngOnInit() {
    console.log('BackofficeComponent ngOnInit');

    this.onGet();

  }// BackofficeComponent ngOnInit

  seleccionarPokemon = function (pokemon) {
    console.log("seleccionarPokemon( id: " + pokemon.id + ", nombre: " + pokemon.nombre + ")");

    this.pSeleccionado = pokemon;

  }// seleccionarPokemon

  onGet() {

    this.pokemonService.listar().subscribe(
      datos => {
        console.debug('get pokemons ok %o', datos);

        this.pokemons = datos;

      },
      error => {
        console.warn(error);

        this.alerta = {
          "tipo": "danger",
          "cuerpo": "Aplicación fuera de servicio"
        }

      }
    )

  }//BackofficeComponent onGet

  onBorrar(p: any) {
    console.trace('onBorrar id: %o', p);

    confirm('estas seguro?');

    this.pokemonService.borrar(p.id).subscribe(
      data => {
        console.debug('elemento borrado ok %o', data);

        this.onGet();

        // this.alerta = new Alerta();
        // this.alerta.tipo = 'success';
        // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" borrada con éxito';
        // console.log('alerta: %o', this.alerta);
      },
      error => {
        console.warn(error);
      }
    );

  }// onBorrar

  onCrear(nombre: string) {
    console.trace('onCrear tarea: %s', nombre);

    if (nombre.trim() !== '') {

      let p = new Object();
      p['nombre'] = nombre;

      this.pokemonService.crear(p).subscribe(
        data => {
          console.debug('tarea creada ok %o', data);

          this.onGet();

          // this.alerta = new Alerta();
          // this.alerta.tipo = 'success';
          // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" borrada con éxito';
          // console.log('alerta: %o', this.alerta);
        },
        error => {
          console.warn(error);
        }
      );

    } else {

      this.alerta = new Alerta();
      this.alerta.tipo = 'warning';
      this.alerta.cuerpo = 'Tarea vacía';

    }

  }// onCrear

  onModificar(nombre: string, p: any) {
    console.trace('onModificar elemento: %s', nombre);

    if (nombre.trim() !== '') {

      p.nombre = nombre;

      this.pokemonService.modificar(p).subscribe(
        data => {
          console.debug('elemento modificado ok %o', data);

          this.onGet();

          // this.alerta = new Alerta();
          // this.alerta.tipo = 'success';
          // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" borrada con éxito';
          // console.log('alerta: %o', this.alerta);
        },
        error => {
          console.warn(error);
        }
      );

    } else {

      this.alerta = new Alerta();
      this.alerta.tipo = 'warning';
      this.alerta.cuerpo = 'Nombre vacío';

    }

  }// onModificar

}// BackofficeComponent
