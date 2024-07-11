import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import markerIcon from "./assets/marker.png";

const MapComponent = () => {
  const mapRef = useRef();
  const [searchLat, setSearchLat] = useState(13.811202);
  const [searchLng, setSearchLng] = useState(100.504995);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current;
      mapInstance.invalidateSize();
    }
  }, []);

  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const handleSearch = () => {
    const lat = parseFloat(searchLat);
    const lng = parseFloat(searchLng);

    if (!isNaN(lat) && !isNaN(lng)) {
      setMarkers([]);

      const newMarker = {
        id: 1,
        position: [lat, lng],
      };

      setMarkers([newMarker]);

      mapRef.current.setView([lat, lng], 13);
    }
  };

  const clearMarkers = () => {
    setMarkers([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl lg:text-6xl font-bold text-center mb-10">
          Search Map
        </h1>
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <input
              type="text"
              placeholder="Enter latitude"
              className="border border-gray-300 rounded-md py-2 px-4 w-full lg:w-auto"
              value={searchLat}
              onChange={(e) => setSearchLat(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter longitude"
              className="border border-gray-300 rounded-md py-2 px-4 w-full lg:w-auto"
              value={searchLng}
              onChange={(e) => setSearchLng(e.target.value)}
            />
          </div>
          <div className="flex flex-row lg:flex-row ">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full lg:w-auto"
              onClick={handleSearch}
            >
              Search
            </button>
            &nbsp;
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full lg:w-auto"
              onClick={clearMarkers}
            >
              Clear Markers
            </button>
          </div>
        </div>
        <div className="w-full h-screen mt-4 lg:mt-8">
          <MapContainer
            center={[13.811202, 100.504995]} // Default center
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={marker.position}
                icon={customMarkerIcon}
              >
                <Popup>
                  Marker Position: <br /> [{marker.position[0]},{" "}
                  {marker.position[1]}]
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
