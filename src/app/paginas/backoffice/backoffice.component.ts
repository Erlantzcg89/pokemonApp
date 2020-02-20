import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Alerta } from 'src/app/model/alerta';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  pokemons: Array<any>;
  pSeleccionado: any;
  habilidades: Array<any>;
  alerta: any;

  formulario: FormGroup;
  formHabilidades: FormArray;

  constructor(private pokemonService: PokemonService, private habilidadService: HabilidadService,
    private formBuilder: FormBuilder) {
    console.log('BackofficeComponent constructor');

    this.pokemons = [];
    this.pSeleccionado = '';
    this.alerta = undefined;
    this.crearFormulario();
  }// BackofficeComponent constructor

  private crearFormulario() {

    this.formulario = this.formBuilder.group({
      id: new FormControl(0),
      nombre: new FormControl('',
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)
          ])
      ),
      habilidades: this.formBuilder.array([], // creamos array sin hbailidades
        // [ this.crearFormGroupHabilidad() ] <- meter habilidades segun se contruye
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(1)
          ])
      )
    });

    this.formHabilidades = this.formulario.get('habilidades') as FormArray;

  }// crearFormulario

  private crearFormGroupHabilidad(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(0),
      nombre: new FormControl('')
    });
  }// crearFormGroupHabilidad

  ngOnInit() {
    console.log('BackofficeComponent ngOnInit');

    this.onGet();
    this.onGetHabilidades();

  }// BackofficeComponent ngOnInit

  seleccionarPokemon = function (pokemon) {
    console.log("seleccionarPokemon( id: " + pokemon.id + ", nombre: " + pokemon.nombre + ")");

    this.pSeleccionado = pokemon;

    this.formulario.get('nombre').setValue(this.pSeleccionado.nombre);

    this.onGet();
    this.onGetHabilidades();

  }// seleccionarPokemon

  onGet() {

    this.pokemonService.listar().subscribe(
      datos => {
        console.debug('get pokemons ok %o', datos);

        this.pokemons = datos;

      },
      error => {
        console.warn(error);

        this.alerta = new Alerta();
        this.alerta.tipo = 'danger';
        this.alerta.cuerpo = 'Aplicación fuera de servicio';

      }
    )

  }//BackofficeComponent onGet

  onGetHabilidades() {

    this.habilidadService.listar().subscribe(
      datos => {
        console.debug('get habilidades ok %o', datos);

        this.habilidades = datos.map((el) => {
          return {
            "id": el.id,
            "nombre": el.nombre,
            "checked": false
          }
        });

        if (this.pSeleccionado) {

          this.habilidades = this.habilidades.map(h => {
            console.debug('map');
            const posicion = this.pSeleccionado.habilidades.findIndex(el => el.id === h.id);
            if (posicion !== -1) {
              h.checked = true;
            } else {
              h.checked = false;
            }

            return h;
          });

        }

      },
      error => {
        console.warn(error);

      }
    )

  }//BackofficeComponent onGetHabilidades

  onBorrar(p: any) {
    console.trace('onBorrar id: %o', p);

    confirm('estas seguro?');

    this.pokemonService.borrar(p.id).subscribe(
      data => {
        console.debug('elemento borrado ok %o', data);

        this.onGet();
        this.onGetHabilidades();


        this.alerta = new Alerta();
        this.alerta.tipo = 'success';
        this.alerta.cuerpo = 'Pokemon: "' + p.nombre + '" borrado con éxito';
      },
      error => {
        console.warn(error);
      }
    );

  }// onBorrar

  onCrear(pokemon: any) {
    console.trace('onCrear tarea: %o', pokemon);

    if (pokemon.nombre.trim() !== '') {

      this.pokemonService.crear(pokemon).subscribe(
        data => {
          console.debug('pokemon creado ok %o', data);

          this.onGet();
          this.onGetHabilidades();

          this.alerta = new Alerta();
          this.alerta.tipo = 'success';
          this.alerta.cuerpo = 'Pokemon: "' + pokemon.nombre + '" creado con éxito';
        },
        error => {
          console.warn(error);
        }
      );

    } else {

      this.alerta = new Alerta();
      this.alerta.tipo = 'warning';
      this.alerta.cuerpo = 'Tarea vacía';

    }

  }// onCrear

  onModificar(pokemon: any) {
    console.trace('onModificar elemento: %o', pokemon);

    pokemon.id = this.pSeleccionado.id;
    pokemon.habilidades = this.habilidades.filter(el => el.checked);

    if (pokemon.nombre.trim() !== '') {

      this.pokemonService.modificar(pokemon).subscribe(
        data => {
          console.debug('elemento modificado ok %o', data);

          this.onGet();
          this.onGetHabilidades();

          this.alerta = new Alerta();
          this.alerta.tipo = 'success';
          this.alerta.cuerpo = 'Pokemon: "' + pokemon.nombre + '" modificado con éxito';
        },
        error => {
          console.warn(error);
        }
      );

    } else {

      this.alerta = new Alerta();
      this.alerta.tipo = 'warning';
      this.alerta.cuerpo = 'Nombre vacío';

    }

  }// onModificar

  onCheckHabilidad(h: any) {
    console.debug('onCheckHabilidad %o', h);

    h.checked = !h.checked;

    const habilidad = this.crearFormGroupHabilidad();
    habilidad.get('id').setValue(h.id);
    habilidad.get('nombre').setValue(h.nombre);

    if (h.checked == false) {
      this.formHabilidades.removeAt(this.formHabilidades.value.findIndex(el => el.id === h.id));
    } else {
      this.formHabilidades.push(habilidad);
    }

  }// onCheckHabilidad

  onLimpiar() {
    window.location.reload();
  }// onLimpiar

}// BackofficeComponent
