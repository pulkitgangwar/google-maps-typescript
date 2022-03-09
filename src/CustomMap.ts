export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  label: string;
  markerContent: () => string;
}

export class CustomMap {
  private googleMap: google.maps.Map;
  constructor(id: string) {
    this.googleMap = new google.maps.Map(document.getElementById(id), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      label: mappable.label,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });
    const infoWindow = new google.maps.InfoWindow({
      content: mappable.markerContent(),
    });
    marker.addListener("click", () => {
      infoWindow.open(this.googleMap, marker);
    });
  }
}
