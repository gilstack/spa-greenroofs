import React from "react";
import { IPin } from "../pin.interface";
import { Typography, Divider } from "antd";
import Map from "src/components/map/Map";

interface PinShowProps {
  pin: IPin;
}

const { Title } = Typography;

const PinShow: React.FC<PinShowProps> = ({ pin }) => {
  return (
    <div>
      <Title level={3} style={{ marginBottom: "24px" }}>
        {pin.title}
      </Title>

      <Divider style={{ opacity: 0.5 }} />

      <div
        style={{ display: "flex", paddingTop: "14px", paddingBottom: "14px" }}
      >
        <div style={{ flex: 0.75, paddingLeft: 10 }}>
          <div style={{ marginBottom: "20px" }}>
            <Title level={5}>Descrição</Title>
            <p>{pin.description}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Title level={5}>Contato</Title>
            <p>{pin.contact}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Title level={5}>Categoria</Title>
            <p>{pin.category}</p>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <Title level={5}>Latitude</Title>
              <p>{pin.latitude}</p>
            </div>
            <div>
              <Title level={5}>Longitude</Title>
              <p>{pin.longitude}</p>{" "}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Map latitude={pin.latitude} longitude={pin.longitude} zoom={10} />
        </div>
      </div>
    </div>
  );
};

export default PinShow;
