import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  pokemons: Array<any>;
  habilidades: Array<any>;
  alerta: any;
  pSeleccionado: any;
  hSeleccionadas: any;
  busqueda: string;

  constructor(private pokemonService: PokemonService) {
    console.log('InicioComponent constructor');

    this.pokemons = [];
    this.habilidades = [];
    this.alerta = undefined;
    this.pSeleccionado = '';
    this.hSeleccionadas = [];
    this.busqueda = '';

  }// InicioComponent constructor

  ngOnInit() {
    console.log('InicioComponent ngOnInit');

    this.onGet();

  }// InicioComponent ngOnInit

  seleccionarPokemon = function (pokemon) {
    console.log("seleccionarPokemon( id: " + pokemon.id + ", nombre: " + pokemon.nombre + ")");

    this.pSeleccionado = pokemon;

  }// seleccionarReceta

  checkHabilidad(h) {
    console.log('clicada habilidad: %o', h);

    // en el constructor se empieza en vacio, si se clica se añade a hSeleccionadas, sino se remueve
    if (this.hSeleccionadas.includes(h)) {

      // TODO array.splice();
      // this.hSeleccionadas.pop();
    } else {
      this.hSeleccionadas.push(h);
    }

    console.log('clicada habilidad: %o', this.hSeleccionadas);
  }

  onGet() {

    this.pokemonService.listar().subscribe(
      datos => {
        console.debug('get pokemons ok %o', datos);

        this.pokemons = datos;

        let ids = new Set();

        this.habilidades = this.pokemons.map((el) => {
          console.log('map habilidades');
          return el.habilidades;
        }).reduce((p, c) => {
          console.log('reduce habilidades');
          return p.concat(c)
        }, []).filter((el, index, padre) => {
          console.log('quitar duplicados habilidades');
          // guardamos las id para no duplicar

          if (!ids.has(el.id)) {
            ids.add(el.id);
            return el;
          }
        });

        console.log('habilidades %o', this.habilidades);

      },
      error => {
        console.warn(error);

        this.alerta = {
          "tipo": "danger",
          "cuerpo": "Aplicación fuera de servicio"
        }

      }
    )

  }// onGet

  onBorrar(p: any) {
    console.trace('onBorrar pokemon: %o', p);

    this.pokemonService.borrar(p.id).subscribe(
      data => {
        console.debug('borrar pokemon ok %o', data);

        this.onGet();

      },
      error => console.warn(error)
    );

  }// onBorrar

}// InicioComponent
