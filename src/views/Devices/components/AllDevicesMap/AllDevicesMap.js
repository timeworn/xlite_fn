import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const icon = {
  url: 'https://maps.google.com/mapfiles/ms/micons/ylw-pushpin.png'
};

const icon1 = {
  url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png'
}

export function transform (position) {
  return Math.round(position * 100000) / 100000;
}

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  const history = useHistory();
  const [lastPos, setLastPos] = useState({
    lat: 10.821308,
    lng: 106.744804
  });
  const mapOptions = {
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#868686"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#c3c2c2"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#c0c0c0"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b5b4b4"}]}]
  };
  return (
    <GoogleMap defaultZoom={8} options={mapOptions} defaultCenter={{
      lat: 10.821308,
      lng: 106.744804
    }} center={lastPos}>
      {props.markers.map((marker, key) => {
        const onMouseOver = props.onMouseOver.bind(this, marker);
        return (
          <Marker
            key={key}
            onMouseOver={onMouseOver}
            position={{
              lat: transform(marker.latitude),
              lng: transform(marker.longitude)
            }}
            icon={marker.serial === props.selected ? icon1.url : icon.url}
          >
            {props.selectedMarker === marker &&
            <InfoWindow>
              <div>
                <ul>
                  <li><Box fontWeight={'bold'} component={'span'}>Device ID: </Box>{marker.serial}</li>
                  <li><Box fontWeight={'bold'} component={'span'}>Name: </Box>{marker.name}</li>
                  <li><Box fontWeight={'bold'} component={'span'}>Group: </Box>{marker.group.name}</li>
                  <li><Box fontWeight={'bold'} component={'span'}>Status: </Box>{marker.event}</li>
                  <li><Box fontWeight={'bold'} component={'span'}>Dim: </Box>{marker.current_dim}</li>
                  <li><Box fontWeight={'bold'} component={'span'}>On/Off: </Box>{marker.status}</li>
                  <li><Box fontWeight={'bold'} component={'span'}>Mode: </Box>{marker.control_mode}</li>
                  <li><Box fontWeight={'bold'} component={'span'} mb={'5px'}>Updated: </Box>{marker.last_connected}</li>
                  <li>
                    <Box display={'flex'} justifyContent={'center'} pt={'5px'}>
                      <Link onClick={() => history.push('/devices/detail/?id=' + marker.serial)}>
                        More details
                      </Link>
                    </Box>
                  </li>
                </ul>
              </div>
            </InfoWindow>}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default function AllDevicesMap (props) {
  const { data, selectedDevice } = props;
  const [selectedMarker, setSelectedMarker] = useState('');
  const handleOver = (marker, event) => {
    setSelectedMarker(marker);
  };
  return (
    <MapWithAMarker
      selectedMarker={selectedMarker}
      markers={data}
      selected={selectedDevice}
      onMouseOver={handleOver}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCdcyKvWUXhZCh8IiO6oZtIWPhtNtXJ6iA&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

AllDevicesMap.propTypes = {
  data: PropTypes.array,
  selectedDevice: PropTypes.string
};
