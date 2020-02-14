import { Color } from './color.model';

export class Fruta {

    id: number;
    nombre: string;
    imagen: string;
    precio: number;
    colores: Array<Color>;

    constructor(nombre?: string) {
        this.id = 0;
        this.nombre = (nombre) ? nombre : '';
        this.imagen = 'https://cdn4.iconfinder.com/data/icons/colorful-fruits-3/14513/Orange-512.png';
        this.precio = 0;
        this.colores = new Array<Color>();
    }

}
