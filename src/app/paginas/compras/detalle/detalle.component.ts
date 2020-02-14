import { Component, OnInit } from '@angular/core';
import { Fruta } from 'src/app/model/fruta.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  fruta: Fruta;
  frutas: Array<Fruta>;

  constructor() {
    console.log('');

    this.fruta = new Fruta();
    this.fruta.nombre = 'naranja';
    this.fruta.precio = 0.3;
    this.fruta.imagen = 'https://cdn4.iconfinder.com/data/icons/colorful-fruits-3/14513/Orange-512.png';

    console.log('fruta imagen: %o', this.fruta);

  }// DetalleComponent constructor

  ngOnInit() {
  }// DetalleComponent ngOnInit

}// DetalleComponent
