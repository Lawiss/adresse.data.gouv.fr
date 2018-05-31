/* eslint react/no-danger: off */
import React from 'react'
import PropTypes from 'prop-types'
import {Marker, Popup} from 'react-mapbox-gl'

import CenteredMap from './centered-map'
import Feature from './feature'

const markerStyle = {
  zIndex: 0,
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: '#E54E52',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #a92d2d'
}

const AddressMap = ({address}) => {
  const center = address ? address.geometry.coordinates : [2.060204, 49.031407]

  return (
    <CenteredMap zoom={16} center={center} fullscreen>
      <Marker
        style={markerStyle}
        coordinates={center} />

      {address &&
        <Popup
          anchor='top'
          coordinates={center}>
          <Feature properties={address.properties} />
        </Popup>
      }

      <style jsx>{`
          .info {
            position: absolute;
            pointer-events: none;
            top: 10px;
            left: 10px;
            max-width: 40%;
            overflow: hidden;
          }
        `}</style>
    </CenteredMap >
  )
}

AddressMap.propTypes = {
  address: PropTypes.object
}

AddressMap.defaultProps = {
  address: null
}

export default AddressMap
