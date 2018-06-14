import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string , tipo: string = "POST"): any {

    if (!img) {
      switch (tipo) {
        case ("POST"):
          return "../../../assets/img/Foto-no-disponible.png";
        case ("USER"):
          return "../../../assets/img/usuario-sin-foto.png";
        default:
          alert("Tipo incorrecto");
          break;
      }
    } else {
      return img;
    }
  }
}
