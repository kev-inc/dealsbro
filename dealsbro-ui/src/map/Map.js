import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css';
import { getOutlets, getDeals } from '../api/Api';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const MapView = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(103.8198);
    const [lat, setLat] = useState(1.3521);
    const [zoom, setZoom] = useState(10);
    const [deals, setDeals] = useState([])
    const [outlets, setOutlets] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null)

    useEffect(() => {
        if (outlets.length === 0) {
            return
        }
        getDeals().then(allDeals => {
            setDeals(Object.values(allDeals))
        })
    }, [outlets])

    useEffect(() => {
        if (deals.length === 0) {
            return
        }
        deals.forEach(deal => {
            outlets.filter(x => x['companyId'] === deal['companyId']).forEach(outlet => {
                const marker = new mapboxgl.Marker().setLngLat([outlet['longitude'], outlet['latitude']]).addTo(map.current)
                marker.getElement().addEventListener('click', () => {
                    const loc = outlets
                        .filter(out => out.postalCode === outlet.postalCode)
                        .map(out => ({ ...out, deal: deals.find(deal => deal.companyId === out.companyId) }))
                        .filter(out => out.deal !== undefined)
                    setSelectedLocation(loc)
                })
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deals])

    useEffect(() => {

        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        getOutlets().then(allOutlets => {
            setOutlets(Object.values(allOutlets))
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
            <div className="sidebar">
                <div className='box'>
                    <strong>Active Deals</strong>
                    <span className="tag ml-2">{deals.length}</span>
                </div>
                <div className='box'>
                    {selectedLocation ? (
                        <div>
                            <div className=''>
                            <button className="button is-ghost is-small" onClick={() => setSelectedLocation(null)}>Back</button>
                            </div>
                            {selectedLocation.map(loc => (
                                <div className='block'>
                                    <small className="has-text-weight-medium">{loc.name}</small>
                                    <h3 className="has-text-weight-semibold">{loc.deal.title}</h3>
                                    <img src={loc.deal.imgSrc} alt='thumbnail'/>
                                    <p>{loc.deal.description}</p>
                                    <small className="is-italic">{loc.deal.startDT} - {loc.deal.endDT}</small><br />
                                    <small><a href={loc.deal.link}>More Info</a></small>
                                </div>
                            ))}
                        </div>
                    ) : deals.map(deal => (
                        <div className='box is-clickable'>
                            <strong>{deal.title}</strong>
                            <p>{deal.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}

export default MapView