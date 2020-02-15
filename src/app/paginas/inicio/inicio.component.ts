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
  busqueda: string;

  constructor(private pokemonService: PokemonService) {
    console.log('InicioComponent constructor');

    this.pokemons = [];
    this.habilidades = [];
    this.alerta = undefined;
    this.pSeleccionado = '';
    this.busqueda = '';

  }// InicioComponent constructor

  ngOnInit() {
    console.log('InicioComponent ngOnInit');

    this.onGet();

    //TODO practicar filter reduce map @arrays frutas!!!

    // filter su return true lo acepta return false lo quita

  }// InicioComponent ngOnInit

  seleccionarPokemon = function (pokemon) {
    console.log("seleccionarPokemon( id: " + pokemon.id + ", nombre: " + pokemon.nombre + ")");

    this.pSeleccionado = pokemon;

  }// seleccionarReceta

  onGet() {

    this.pokemonService.listar().subscribe(
      datos => {
        console.debug('get pokemons ok %o', datos);

        this.pokemons = datos;
        // TODO   que no se repitan los pokemons
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
