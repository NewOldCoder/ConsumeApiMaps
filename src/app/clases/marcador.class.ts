// export class Marcador {
//   constructor(public lat: Number, public lng: Number) { }
// }

export class Marcador {

  public lat: number;
  public lng: number;

  public titulo = 'Sin titulo';
  public desc = 'Sin descripción';

  constructor( lat: number,  lng: number) {
    this.lat = lat;
    this.lng = lng;
   }


}
