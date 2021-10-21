import { GoogleMap, Marker } from '@react-google-maps/api'
import React, {  } from 'react'
import { MapTypeProp } from './type'

export const Map = ({
    width,
    height,
    zoom,
    center,
    marker,
    onMarkerAdjust
}:MapTypeProp) => {

    const handleMarkerChange = (event:any) => {
        if(onMarkerAdjust){
            const item = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }
            return onMarkerAdjust(item)
        }
    }

    const parsePoints = (center:{lat:any, lng: any}) => {
        let newLat = center.lat||0
        let newLng = center.lng||0
        if(typeof newLat !== 'number'){
            newLat = parseFloat(newLat)
        }
        if(typeof newLng !== 'number'){
            newLng = parseFloat(newLng)
        }
        return {lat: newLat, lng: newLng}
    }

    return (
        <GoogleMap
        mapContainerStyle={{
            width: width || 'auto',
            height: height || 'auto'
        }}
        center={parsePoints(center)}
        zoom={zoom}
        >
        {marker !== undefined && <Marker
            onDragEnd={handleMarkerChange}
            position={parsePoints(marker)}
            draggable={true}
        />}
        </GoogleMap>
    )
}