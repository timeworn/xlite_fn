import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import Box from '@material-ui/core/Box';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { setCurrentPos } from 'store/actions/device';
import { v1 as uuIdv1 } from "uuid";

const icon = {
  url: '/images/blue_dot.png'
};

const icon1 = {
  url: 'https://maps.google.com/mapfiles/ms/micons/ylw-pushpin.png'
}

export function transform (position) {
  return Math.round(position * 100000) / 100000;
}

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  const dispatch = useDispatch();
  const [lastPos, setLastPos] = useState({
    lat: 10.766048,
    lng: 106.627815
  });
  const [curPos, setCurPos] = useState({
    lat: null,
    lng: null
  });
  useEffect(() => {
    if (props.markers.length) {
      setLastPos({
        lat: transform(props.markers[props.markers.length - 1].latitude),
        lng: transform(props.markers[props.markers.length - 1].longitude)
      });
    }
  }, [props]);

  const mapOptions = {
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#868686"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#c3c2c2"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#c0c0c0"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b5b4b4"}]}]
  };
  useEffect(() => {
    dispatch(setCurrentPos(curPos));
  }, [curPos]);

  return (
    <GoogleMap defaultZoom={12} options={mapOptions}  onClick={e => setCurPos({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })} center={lastPos}>
      {curPos && curPos.lat ? <Marker
        key={uuIdv1()}
        position={{ lat: curPos.lat, lng: transform(curPos.lng) }}
        icon={icon1.url}
      /> : ""}
      {props.markers.map((marker, key) => {
        const onMouseOver = props.onMouseOver.bind(this, marker);
        return (
          <Marker
            key={key}
            onMouseOver={onMouseOver}
            position={{ lat: transform(marker.latitude), lng: transform(marker.longitude) }}
            icon={icon.url}
          >
            {props.selectedMarker === marker &&
            <InfoWindow>
              <ul>
                <li><Box fontWeight={'bold'} component={'span'}>Device ID: </Box>{marker.serial}</li>
                <li><Box fontWeight={'bold'} component={'span'}>Name: </Box>{marker.name}</li>
                {marker.group ? <li><Box fontWeight={'bold'} component={'span'}>Group: </Box>{marker.group.name}</li> : ''}
                <li><Box fontWeight={'bold'} component={'span'}>Status: </Box>{marker.event}</li>
                <li><Box fontWeight={'bold'} component={'span'}>Dim: </Box>{marker.current_dim}</li>
                <li><Box fontWeight={'bold'} component={'span'}>On/Off: </Box>{marker.status}</li>
                <li><Box fontWeight={'bold'} component={'span'}>Mode: </Box>{marker.control_mode}</li>
                <li><Box fontWeight={'bold'} component={'span'} mb={'5px'}>Updated: </Box>{marker.last_connected}</li>
              </ul>
            </InfoWindow>}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default function ShelterMap (props) {
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
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

ShelterMap.propTypes = {
  data: PropTypes.array
};
