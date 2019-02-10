import React, { Component, Ref } from 'react';
import styled from 'styled-components';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tYW4tZyIsImEiOiJjanJ5dGI3dDIxMXB0NDRxeXlyaTFvbndoIn0.iM0e2kuvqM0ysHm6sXIjpg';

const MapContainer = styled.div`
  height: 350px;
`;

interface MapProps {
  address: string;
}

export default class Map extends Component<MapProps> {
  private map?: mapboxgl.Map;
  private mapContainer?: HTMLDivElement | null;

  private getGeoCode() {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/types=address&${
      this.props.address
    }.json?access_token=${mapboxgl.accessToken}`;
    return fetch(url)
      .then(response => response.json())
      .then(res => res.features)
      .then(features => features[0].geometry);
  }

  private configureMap(map: mapboxgl.Map, geometry: GeoJSON.Feature<GeoJSON.Geometry>) {
    map.on('load', () => {
      map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf',
        },
      });

      (map.getSource('single-point') as GeoJSONSource).setData(geometry);
    });
  }

  constructor(props: MapProps) {
    super(props);
  }

  componentDidMount() {
    this.getGeoCode().then(geometry => {
      this.map = new mapboxgl.Map({
        container: this.mapContainer as Element,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 14,
        center: geometry.coordinates,
      });

      this.configureMap(this.map, geometry);
    });
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  render() {
    return <MapContainer ref={el => (this.mapContainer = el)} />;
  }
}
