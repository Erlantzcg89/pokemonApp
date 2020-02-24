import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  constructor(private http: HttpClient) {
    console.trace("HabilidadService Constructor");
  }// HabilidadService constructor

  listar(): Observable<any[]> {
    const url = `http://localhost:8080/pokemon-rest/api/habilidad/`;
    console.trace('HabilidadService listar' + url);
    return this.http.get<any[]>(url);
  }//HabilidadService listar

  detalle(id: number): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/habilidad/${id}`;
    console.trace('HabilidadService detalle' + url);
    return this.http.get<any>(url);
  }//HabilidadService detalle

  public crear(habilidad: any): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/habilidad/`;
    console.trace('HabilidadService crear' + url);
    return this.http.post<any>(url, habilidad);
  }//HabilidadService crear

  public modificar(habilidad: any): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/habilidad/${habilidad.id}`;
    console.trace('HabilidadService modificar' + url);
    return this.http.put<any>(url, habilidad);
  }//HabilidadService modificar

  public borrar(id: number): Observable<any> {
    const url = `http://localhost:8080/pokemon-rest/api/habilidad/${id}`;
    console.trace('HabilidadService borrar' + url);
    return this.http.delete<any>(url);
  }// HabilidadService borrar

}// HabilidadService