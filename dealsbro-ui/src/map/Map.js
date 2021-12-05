import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { DEALS, OUTLETS } from '../mockdata';
import './Map.css';
import { getOutlets } from '../api/Api';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const MapView = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(103.8198);
    const [lat, setLat] = useState(1.3521);
    const [zoom, setZoom] = useState(10);
    useEffect(() => {

        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        getOutlets().then(outlets => {
            Object.values(outlets).forEach(outlet => {
                const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
                    <h3 class="has-text-weight-semibold">${outlet.name}</h3>
                    <p>${outlet.address}</p>
                `)
                new mapboxgl.Marker().setLngLat([outlet['longitude'], outlet['latitude']]).setPopup(popup).addTo(map.current)
            })
        })


        DEALS.forEach(deal => {
            deal.outlets.forEach(outlet => {
                const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
                    <small class="has-text-weight-medium">${OUTLETS[outlet].name}</small>
                    <h3 class="has-text-weight-semibold">${deal.title}</h3>
                    <p>${deal.description}</p>
                    <small class="is-italic">${deal.startDate} - ${deal.endDate}</small>
                `)
                new mapboxgl.Marker().setLngLat([OUTLETS[outlet].longitude, OUTLETS[outlet].latitude]).setPopup(popup).addTo(map.current)
            })
        })

        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true
            })
        );
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div className="greeting">Welcome to DealsBro! (Alpha v0.0.1)</div>
            {/* <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}

export default MapView