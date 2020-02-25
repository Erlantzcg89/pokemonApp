import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
    console.trace("PokemonService Constructor");



  }// PokemonService constructor

  login(nombre: string, password: string): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/usuario/?nombre=${nombre}&password=${password}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'withCredentials': true
    };

    return this.http.get<any>(url, httpOptions);
  }// login

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

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'withCredentials': true
    };

    return this.http.post<any>(url, pokemon, httpOptions);
  }

  public modificar(pokemon: any): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${pokemon.id}`;
    console.trace('PokemonService modificar' + url);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'withCredentials': true
    };

    return this.http.put<any>(url, pokemon, httpOptions);
  }

  public borrar(id: number): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id}`;
    console.trace('PokemonService borrar' + url);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'withCredentials': true
    };

    return this.http.delete<any>(url, httpOptions);
  }

}// PokemonService
