// import L from 'leaflet';
import { MapControl, PropTypes as LeafletPropTypes } from 'react-leaflet';
// import esri from 'esri-leaflet';
// import { Geocoding } from 'esri-leaflet-geocoder';
// import * as Geocoding from 'esri-leaflet-geocoder';
import { geosearch, geocodeServiceProvider } from 'esri-leaflet-geocoder';

export default class Geocoder extends MapControl {
  static propTypes = {
    position: LeafletPropTypes.controlPosition,
  }

  createLeafletElement(): Object {
    const cogAllPointsGeocodeService = geocodeServiceProvider({
      url: 'https://gis.greensboro-nc.gov/arcgis/rest/services/Geocoding/AllPoints_GCS/GeocodeServer',
      label: 'All Points'
    });

    // create the geocoding control and add it to the map
    // var searchControl = L.esri.Geocoding.geosearch().addTo(map);
    const searchControl = geosearch({
      providers: [cogAllPointsGeocodeService],
      zoomToResult: true,
      expanded: true,
      collapseAfterResult: false,
      placeholder: 'Address Search',
      useMapBounds: false,
    });

    // listen for the results event and pass latln to the map
    searchControl.on('results', (data) => {
      this.props.results(data.results[0]);
    });
    return searchControl;
  }
}
