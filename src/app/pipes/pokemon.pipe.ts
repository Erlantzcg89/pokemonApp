import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonFiltro'
})
export class PokemonPipe implements PipeTransform {

  /**
      * filtro para filtrar por nombre
      * @param recetas: array de pokemons json
      * @param busqueda: cadena de texto a filtrar
      */
  transform(pokemons: any, busqueda: string): any {

    let resultado = pokemons;

    console.debug('busqueda ', busqueda);

    // filtrar por nombre pokemon
    if (busqueda && '' !== busqueda) {

      busqueda = busqueda.toLowerCase();

      resultado = resultado.filter((el) => {
        return el.nombre.includes(busqueda);
      });

    }

    return resultado;
  }// transform

}