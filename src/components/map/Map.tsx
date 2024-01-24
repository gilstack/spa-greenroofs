import React, { useEffect } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

declare global {
  interface Window {
    google: any;
  }
}

const Map: React.FC<MapProps> = ({ latitude, longitude, zoom = 10 }) => {
  useEffect(() => {
    // Carregando a API do Google Maps
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB82S63MbSGJSCuu54aLcF1PJNlGWSoX_A&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: zoom,
      });

      // Adicionando marcador
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [latitude, longitude, zoom]);

  return (
    <div
      id="map"
      style={{ height: "270px", width: "100%", borderRadius: 8 }}
    ></div>
  );
};

export default Map;
