import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
  `
  .mapa-container {
   width: 100%;
   height: 100%;
  }

  .row {
    background-color: white;
    bottom: 50px;
    left: 50px;
    padding: 10px;
    border-radius: 5px;
    position: fixed;
    z-index: 999;
    width: 400px;
  }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center:[number, number] = [ -4.517796520486922, 42.009316727964666 ];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (event) => {
      // console.log(event);
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (event) => {
      if ( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      }
    });

    // Movimiento del mapa
    this.mapa.on('move', (evento) => {
      // console.log(evento);
      const target = evento.target;
      const { lng, lat } = target.getCenter()
      this.center = [ lng, lat ];
    });
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string ) {
    // console.log(valor);
    this.mapa.zoomTo( Number( valor ) );
  }

}
