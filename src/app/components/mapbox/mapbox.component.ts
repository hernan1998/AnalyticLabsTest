import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JsonService } from '../../json.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

  // Variables 
  mapa: mapboxgl.Map;
  geoJson: any;

  constructor(public json: JsonService) { }

  ngOnInit(): void {
    // Llamado a la api GET /commerces/layer
    this.json.getJson('https://alw-lab.herokuapp.com/commerces/layer').subscribe((res: any) => {
      this.geoJson = res;
      console.log(this.geoJson);
    });

    // Mapbox Key definida en los Enviroments.ts
    mapboxgl.accessToken = environment.mapboxKey;
    this.buildmap();
  }

  // Funcion Con los datos para construir el Mapa
  buildmap() {

    // Inicializacion del Mapa
    this.mapa = new mapboxgl.Map({
      container: 'mapbox-container', // Container id
      style: 'mapbox://styles/hernan1122/ckciapuxj1l2b1iqmmxu1j353',
      center: [-74.1252309, 4.6544973], // Longitud, Latitud
      zoom: 10.3 // Zoom Inicial
    });

    this.mapa.addControl(new mapboxgl.NavigationControl());

    this.mapa.on('load', (event) => {
      this.mapa.addSource('customMarker', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      this.mapa.getSource('customMarker').setData(this.geoJson);
      this.mapa.addLayer({
        id: 'customMarketid',
        source: 'customMarker',
        type: 'symbol',
        layout: {
          'text-field': '{name}',
          'text-size': 14,
          'text-transform': 'uppercase',
          'icon-image': 'marker-15',
          'icon-size': 1.5,
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#1f197e',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });
    });


  }

}
