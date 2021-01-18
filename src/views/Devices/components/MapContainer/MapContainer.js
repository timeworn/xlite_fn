import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import Box from '@material-ui/core/Box';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { setCurrentPos } from 'store/actions/device';

const icon = {
  url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png'
};

export function transform (position) {
  return Math.round(position * 100000) / 100000;
}

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  const dispatch = useDispatch();
  const [lastPos, setLastPos] = useState({
    lat: -33.921,
    lng: 151.209
  });
  const [curPos, setCurPos] = useState({
    lat: null,
    lng: null
  });

  useEffect(() => {
    dispatch(setCurrentPos(curPos));
  }, [curPos]);

  return (
    <GoogleMap defaultZoom={8} center={lastPos} onClick={e => setCurPos({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })}>
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
