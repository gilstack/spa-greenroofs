import React from "react";
import { Typography, Divider } from "antd";
import Map from "../../../src/components/map/Map";

interface IMarkerProps {
  id: string;
  title: string;
  description: string;
  contact: string;
  category: string;
  latitude: number;
  longitude: number;
}

interface MarkerShowProps {
  marker: IMarkerProps;
}

const { Title } = Typography;

const MarkerShow: React.FC<MarkerShowProps> = ({ marker }) => {
  return (
    <div>
      {marker && (
        <>
          <Title level={3} style={{ marginBottom: "24px" }}>
            {marker.title}
          </Title>
          <Divider style={{ opacity: 0.5 }} />
          <div
            style={{
              display: "flex",
              paddingTop: "14px",
              paddingBottom: "14px",
            }}
          >
            <div style={{ flex: 0.75, paddingLeft: 10 }}>
              {renderField("Descrição", marker.description)}
              {renderField("Contato", marker.contact)}
              {renderField("Categoria", marker.category)}
              <div style={{ display: "flex", gap: "20px" }}>
                {renderField("Latitude", marker.latitude)}
                {renderField("Longitude", marker.longitude)}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {marker && (
                <Map
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  zoom={10}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const renderField = (label: string, value: string | number) => (
  <div style={{ marginBottom: "20px" }}>
    <Title level={5}>{label}</Title>
    <p>{value}</p>
  </div>
);

export default MarkerShow;
