import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENTORNO } from '../model/constantes';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  endpoint: string;

  constructor(private http: HttpClient) {
    console.trace("HabilidadService Constructor");

    //local, produccion
    this.endpoint = ENTORNO.find(el => el.nombre === 'produccion').url;
  }// HabilidadService constructor

  listar(): Observable<any[]> {
    const url = `${this.endpoint}api/habilidad/`;
    console.trace('HabilidadService listar' + url);
    return this.http.get<any[]>(url);
  }//HabilidadService listar

  detalle(id: number): Observable<any> {
    const url = `${this.endpoint}api/habilidad/${id}`;
    console.trace('HabilidadService detalle' + url);
    return this.http.get<any>(url);
  }//HabilidadService detalle

  public crear(habilidad: any): Observable<any> {
    const url = `${this.endpoint}api/habilidad/`;
    console.trace('HabilidadService crear' + url);
    return this.http.post<any>(url, habilidad);
  }//HabilidadService crear

  public modificar(habilidad: any): Observable<any> {
    const url = `${this.endpoint}api/habilidad/${habilidad.id}`;
    console.trace('HabilidadService modificar' + url);
    return this.http.put<any>(url, habilidad);
  }//HabilidadService modificar

  public borrar(id: number): Observable<any> {
    const url = `${this.endpoint}api/habilidad/${id}`;
    console.trace('HabilidadService borrar' + url);
    return this.http.delete<any>(url);
  }// HabilidadService borrar

}// HabilidadService