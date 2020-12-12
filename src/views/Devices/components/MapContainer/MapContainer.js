import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const icon = {
  url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png'
};

const icon1 = {
  url: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png'
};

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  const [lastPos, setLastPos] = useState({
    lat: 10.766048,
    lng: 106.627815
  });

  useEffect(() => {
    if (props.markers.length) {
      setLastPos({
        lat: props.markers[props.markers.length - 1].location.lat,
        lng: props.markers[props.markers.length - 1].location.lon
      });
    }
  }, [props.markers]);

  return (
    <GoogleMap defaultZoom={8} defaultCenter={{
      lat: 10.766048,
      lng: 106.627815
    }} center={lastPos}>
      {props.markers.map((marker, key) => {
        const onMouseOver = props.onMouseOver.bind(this, marker);
        return (
          <Marker
            key={key}
            onMouseOver={onMouseOver}
            position={{ lat: marker.location.lat, lng: marker.location.lon }}
            icon={props.markers.length - 1 === key ? icon.url : icon1.url}
          >
            {props.selectedMarker === marker &&
            <InfoWindow>
              <div>
                {props.markers.length - 1 === key ? 'last position:' : ''}
                {marker.timestamp},Temperature:
                {marker.sensor.temperature}
              </div>
            </InfoWindow>}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default function ShelterMap(props) {
  const { data } = props;
  const [selectedMarker, setSelectedMarker] = useState('');
  const handleOver = (marker, event) => {
    setSelectedMarker(marker);
  };
  return (
    <MapWithAMarker
      selectedMarker={selectedMarker}
      markers={data}
      onMouseOver={handleOver}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCdcyKvWUXhZCh8IiO6oZtIWPhtNtXJ6iA&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }}/>}
      containerElement={<div style={{ height: `400px` }}/>}
      mapElement={<div style={{ height: `100%` }}/>}
    />
  );
}

ShelterMap.propTypes = {
  data: PropTypes.array
};
