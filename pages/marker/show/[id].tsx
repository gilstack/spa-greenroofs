import React from "react";
import { Typography, Divider } from "antd";
import Map from "src/components/map/Map";
import { IMarkerProps } from "../marker.interface";

interface MarkerShowProps {
  marker: IMarkerProps;
}

const { Title } = Typography;

const MarkerShow: React.FC<MarkerShowProps> = ({ marker }) => {
  return (
    <div>
      <Title level={3} style={{ marginBottom: "24px" }}>
        {marker.title}
      </Title>

      <Divider style={{ opacity: 0.5 }} />

      <div
        style={{ display: "flex", paddingTop: "14px", paddingBottom: "14px" }}
      >
        <div style={{ flex: 0.75, paddingLeft: 10 }}>
          <div style={{ marginBottom: "20px" }}>
            <Title level={5}>Descrição</Title>
            <p>{marker.description}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Title level={5}>Contato</Title>
            <p>{marker.contact}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Title level={5}>Categoria</Title>
            <p>{marker.category}</p>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <Title level={5}>Latitude</Title>
              <p>{marker.latitude}</p>
            </div>
            <div>
              <Title level={5}>Longitude</Title>
              <p>{marker.longitude}</p>{" "}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Map
            latitude={marker.latitude}
            longitude={marker.longitude}
            zoom={10}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkerShow;
