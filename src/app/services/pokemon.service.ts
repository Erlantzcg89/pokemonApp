import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
    console.trace("PokemonService Constructor");
  }// PokemonService constructor

  listar(): Observable<any[]> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    console.trace('PokemonService listar' + url);
    return this.http.get<any[]>(url);
  }

  detalle(id: number): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id}`;
    console.trace('PokemonService detalle' + url);
    return this.http.get<any>(url);
  }

  public crear(pokemon: any): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/`;
    console.trace('PokemonService crear' + url);
    return this.http.post<any>(url, pokemon);
  }

  public modificar(pokemon: any): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${pokemon.id}`;
    console.trace('PokemonService modificar' + url);
    return this.http.put<any>(url, pokemon);
  }

  public borrar(id: number): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id}`;
    console.trace('PokemonService borrar' + url);
    return this.http.delete<any>(url);
  }

}// PokemonService
