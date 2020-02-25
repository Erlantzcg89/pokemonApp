import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENTORNO } from '../model/constantes';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  endpoint: string;

  constructor(private http: HttpClient) {
    console.trace("PokemonService Constructor");

    //local, produccion
    this.endpoint = ENTORNO.find(el => el.nombre === 'produccion').url;

  }// PokemonService constructor

  login(nombre: string, password: string): Observable<any> {
    const url = `${this.endpoint}api/usuario/?nombre=${nombre}&password=${password}`;

    return this.http.get<any>(url);
  }// login

  listar(): Observable<any[]> {
    const url = `${this.endpoint}api/pokemon/`;
    console.trace('PokemonService listar' + url);
    return this.http.get<any[]>(url);
  }

  detalle(id: number): Observable<any> {
    const url = `${this.endpoint}api/pokemon/${id}`;
    console.trace('PokemonService detalle' + url);
    return this.http.get<any>(url);
  }

  public crear(pokemon: any): Observable<any> {
    const url = `${this.endpoint}api/pokemon/`;
    console.trace('PokemonService crear' + url);

    return this.http.post<any>(url, pokemon);
  }

  public modificar(pokemon: any): Observable<any> {
    const url = `${this.endpoint}api/pokemon/${pokemon.id}`;
    console.trace('PokemonService modificar' + url);

    return this.http.put<any>(url, pokemon);
  }

  public borrar(id: number): Observable<any> {
    const url = `${this.endpoint}api/pokemon/${id}`;
    console.trace('PokemonService borrar' + url);

    return this.http.delete<any>(url);
  }

}// PokemonService
