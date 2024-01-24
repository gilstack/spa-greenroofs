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
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: zoom,
      });

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
