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
    /*
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = { headers: headers, withCredentials: true };
    const url = `http://localhost:8080/pokemon-rest/api/usuario/?nombre=${nombre}&password=${password}`;
    console.trace('PokemonService login' + url);
    */
    //return this.http.get<any>(url, options);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': true
      })
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
