import React from "react";
import { IPin } from "../pin.interface";
import { Typography } from "antd";

interface PinShowProps {
  pin: IPin;
}

const { Title } = Typography;

const PinShow: React.FC<PinShowProps> = ({ pin }) => {
  return (
    <div>
      <Title level={5}>Id</Title>
      <p>{pin.id}</p>
      <Title level={5}>Título</Title>
      <p>{pin.title}</p>
      <Title level={5}>Descrição</Title>
      <p>{pin.description}</p>
      <Title level={5}>Contato</Title>
      <p>{pin.contact}</p>
      <Title level={5}>Categoria</Title>
      <p>{pin.category}</p>
      <Title level={5}>Latitude</Title>
      <p>{pin.latitude}</p>
      <Title level={5}>Longitude</Title>
      <p>{pin.longitude}</p>
    </div>
  );
};

export default PinShow;
