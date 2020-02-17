import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  pokemons: Array<any>;
  pSeleccionado: any;
  pFiltrados: Array<any>;
  habilidades: Array<any>;
  hSeleccionadas: any;
  busqueda: string;
  alerta: any;

  constructor(private pokemonService: PokemonService) {
    console.log('InicioComponent constructor');

    this.pokemons = [];
    this.pSeleccionado = '';
    this.pFiltrados = [];
    this.habilidades = [];
    this.hSeleccionadas = [];
    this.busqueda = '';
    this.alerta = undefined;

  }// InicioComponent constructor

  ngOnInit() {
    console.log('InicioComponent ngOnInit');

    this.onGet();

  }// InicioComponent ngOnInit

  seleccionarPokemon = function (pokemon) {
    console.log("seleccionarPokemon( id: " + pokemon.id + ", nombre: " + pokemon.nombre + ")");

    this.pSeleccionado = pokemon;

  }// seleccionarPokemon

  checkHabilidad(h) {
    console.log('clicada habilidad: %o', h);

    // en el constructor se empieza en vacio, si se clica se añade a hSeleccionadas, sino se remueve
    if (this.hSeleccionadas.includes(h.id)) {

      this.hSeleccionadas.splice(this.hSeleccionadas.indexOf(h.id), 1);
      console.log('habilidades seleccionadas: %o', this.hSeleccionadas)

    } else {
      this.hSeleccionadas.push(h.id);
    }

    console.log('habilidades seleccionadas: %o', this.hSeleccionadas);


    // trabajar para obtener pFiltrados apartir del filtro en pokemons
    this.pFiltrados = this.pokemons.filter((el, index, array) => {

      console.log('el.habilidades : %o', el.habilidades);

      return el.habilidades.find(h => this.hSeleccionadas.includes(h.id));
    })

    console.log('el.habilidades : %o', this.pFiltrados);

    if (this.hSeleccionadas.length === 0) {
      this.pFiltrados = this.pokemons;
    }

  }


  onGet() {

    this.pokemonService.listar().subscribe(
      datos => {
        console.debug('get pokemons ok %o', datos);

        this.pokemons = datos;
        this.pFiltrados = datos;

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
