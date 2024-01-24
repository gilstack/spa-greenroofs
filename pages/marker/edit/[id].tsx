import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Typography, Divider, Input, Button, message } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import Map from "src/components/map/Map";

interface IMarkerProps {
  id: string;
  title: string;
  description: string;
  contact: string;
  category: string;
  latitude: number;
  longitude: number;
}

interface MarkerEditProps {
  marker: IMarkerProps;
  onClose: () => void;
}

type IEditable = {
  [key in keyof IMarkerProps]: boolean;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const { Title } = Typography;

const MarkerEdit: React.FC<MarkerEditProps> = ({ marker, onClose }) => {
  const router = useRouter();

  const initialEditableState: IEditable = {
    id: false,
    title: false,
    description: false,
    contact: false,
    category: false,
    latitude: false,
    longitude: false,
  };

  const [editable, setEditable] = useState<IEditable>(initialEditableState);
  const [editedValues, setEditedValues] = useState<IMarkerProps>({
    ...marker,
  });

  const renderField = (field: keyof IMarkerProps) => {
    const isEditable = editable[field];

    return (
      <div style={{ marginBottom: "20px" }}>
        <Title level={5}>
          {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
          {isEditable ? (
            <SaveOutlined
              style={{ cursor: "pointer" }}
              onClick={() => handleSave()}
            />
          ) : (
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => handleEditToggle(field)}
            />
          )}
        </Title>
        {isEditable ? (
          <Input
            value={String(editedValues[field])}
            type={
              field === "latitude" || field === "longitude" ? "number" : "text"
            }
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        ) : (
          <p>{String(editedValues[field])}</p>
        )}
      </div>
    );
  };

  const handleEditToggle = (field: keyof IEditable) => {
    setEditable((prevEditable) => ({
      ...prevEditable,
      [field]: !prevEditable[field],
    }));
  };

  const handleInputChange = (field: keyof IMarkerProps, value: string) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const { id, ...data } = editedValues;

      const token = localStorage.getItem("token");

      if (!token) {
        message.error(
          "Sua sessão expirou. Redirecionando para a página de login."
        );
        router.push("/login");
        return;
      }

      const response = await axios.patch(
        `${apiUrl}/marker/edit/${marker.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Marker updated successfully!");

      setEditable(initialEditableState);

      setEditedValues((prevValues) => ({
        ...prevValues,
        ...data,
      }));
    } catch (error) {
      message.error("Error during update marker!");
    }
  };

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
          {renderField("description")}
          {renderField("contact")}
          {renderField("category")}

          <div style={{ display: "flex", gap: "20px" }}>
            <div>{renderField("latitude")}</div>
            <div>{renderField("longitude")}</div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Map
            latitude={editedValues.latitude}
            longitude={editedValues.longitude}
            zoom={10}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkerEdit;
