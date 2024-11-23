import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

declare const google: any; 
@Component({
  selector: 'app-cambio-maps',
  templateUrl: './cambio-maps.page.html',
  styleUrls: ['./cambio-maps.page.scss'],
})
export class CambioMapsPage implements OnInit {
  map: any;

  constructor(
    public nav: NavController,
  ) {}

  ngOnInit() {
    this.getCurrentPosition();
  }

  // Obtém a localização atual do usuário
  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.loadMap(location);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          const defaultLocation = { lat: -23.55052, lng: -46.633308 };
          this.loadMap(defaultLocation);
        }
      );
    } else {
      console.error('Geolocalização não é suportada neste navegador.');
      const defaultLocation = { lat: -23.55052, lng: -46.633308 };
      this.loadMap(defaultLocation);
    }
  }


  loadMap(location: { lat: number; lng: number }) {
    const mapElement = document.getElementById('map');
    this.map = new google.maps.Map(mapElement, {
      center: location,
      zoom: 14,
    });

    // Adiciona um marcador 
    new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Você está aqui!',
    });

    // Busca 
    this.findNearbyPlaces(location);
  }

  // Busca próximos
  findNearbyPlaces(location: { lat: number; lng: number }) {
    const service = new google.maps.places.PlacesService(this.map);

    const request = {
      location: location,
      radius: 10000, 
      keyword: 'casa de câmbio',
    };

    service.nearbySearch(request, (results: any[], status: string) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((place) => {
          // Adiciona marcadores encontrados
          new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            title: place.name,
          });
        });
      } else {
        console.error('Erro ao buscar lugares próximos:', status);
      }
    });
  }

  abrirPagina(x: any) {
    this.nav.navigateForward(x);
  }
}
