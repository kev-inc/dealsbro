import { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Map.css";
import { getDeals } from "../api/Api";
import Sidebar from "./sidebar/Sidebar";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapView = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(103.8198);
  const [lat, setLat] = useState(1.3521);
  const [zoom, setZoom] = useState(10);
  const [deals, setDeals] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (deals.length === 0) {
      return;
    }

    deals.forEach((deal) => {
      deal.markers.forEach((marker) => {
        if (deal.checked) {
          marker.addTo(map.current);
        } else {
          marker.remove();
        }
      });
    });
  }, [deals]);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
      })
    );

    getDeals().then((allDeals) => {
      const data = Object.values(allDeals).map((deal) => ({
        ...deal,
        checked: true,
        markers: deal.outlets.map((outlet) => {
          const marker = new mapboxgl.Marker().setLngLat([
            outlet["longitude"],
            outlet["latitude"],
          ]);
          marker.getElement().addEventListener("click", () => {
            const selected = Object.values(allDeals).filter((d) => {
              return (
                d.outlets.findIndex(
                  (o) => outlet.postalCode === o.postalCode
                ) !== -1
              );
            });
            setSelectedLocation({ outlet, deals: selected });
          });
          return marker;
        }),
      }));
      setDeals(data);
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const toggleDealVisibility = (i) => {
    const temp = [...deals];
    temp[i].checked = !temp[i].checked;
    setDeals(temp);
  };

  const selectAll = () => {
    const temp = [...deals].map((deal) => ({ ...deal, checked: true }));
    setDeals(temp);
  };

  const deselectAll = () => {
    const temp = [...deals].map((deal) => ({ ...deal, checked: false }));
    setDeals(temp);
  };

  return (
    <div className="columns">
      <div className="column is-4">
        <Sidebar
          deals={deals}
          selectedLocation={selectedLocation}
          toggleDealVisibility={toggleDealVisibility}
          setSelectedLocation={setSelectedLocation}
          selectAll={selectAll}
          deselectAll={deselectAll}
        />
      </div>
      <div className="column">
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
};

export default MapView;
