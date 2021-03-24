import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { IconLocation } from './IconLocation'


export const MapaScreen = ({ coordenadas=false }) => {
    
    
    const location = JSON.parse(localStorage.getItem('location')) || false;

    const lat = (location) ? location[1] : 25.897093;
    const lgn = (location) ? location[0] : -100.169715

    const longi =  (coordenadas.lenght === 0) ? coordenadas[0] : lgn        
    const lati = (coordenadas.lenght === 0) ? coordenadas[1] : lat

    function LocationMarker() {

        const map = useMapEvent('click', ()=>{
         
            map.flyTo([lati, longi], 18)
        
        })

      
        return  (
          <Marker position={[lati, longi] } icon={IconLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )
    }
    


    return (
        <MapContainer center={[lati, longi]} zoom={19} scrollWheelZoom={true}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker/>
            {/* {
                (lati && longi) &&
                <Marker position={[lati, longi]} icon={IconLocation} >
                    <Popup>
                        Palma butia #1825
                </Popup>
                </Marker>
            } */}
        </MapContainer>
    )
}
