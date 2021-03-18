import L from 'leaflet'
import img from '../../assets/icono.svg'

export const IconLocation =  L.icon({
    iconUrl: img,
    iconRetinaUrl:img,
    iconAnchor: null,
    shadowSize:null,
    shadowAnchor:null,
    iconSize: [95,95],
    className: "leaflet-venue-icon"
})
