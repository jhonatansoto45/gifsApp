import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent {
  //* Con ViewChild
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar(): void {
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim().length !== 0) this.gifsService.buscarGifs(value);

    this.txtBuscar.nativeElement.value = '';
  }
}
