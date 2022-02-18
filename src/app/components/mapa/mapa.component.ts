import { MapaEditarComponent } from './mapa-editar.component';
import { Marcador } from './../../clases/marcador.class';
import { Component, OnInit } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 2.641942;
  lng = -76.536248;


  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) {

    if ( localStorage.getItem('marcadores')! ) {

      this.marcadores = JSON.parse( localStorage.getItem('marcadores'));

    }

  }

  ngOnInit() {

  }

  agregarMarcador(evento: any){

    const coords: {lat:number, lng:number} = evento.coords;

    const nuevoMarcador = new Marcador (coords.lat, coords.lng );

    this.marcadores.push(nuevoMarcador);

    this.guardarStorage();

  }

  borrarMarcador( i:number ) {
    this.marcadores.splice(i,1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar',{duration:3000});

  }

  editarMarcador(marcador: Marcador){

    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc},
    });
    dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador actualizado !' , 'Cerrar',{duration:3000});

    });
  }

  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }


}
