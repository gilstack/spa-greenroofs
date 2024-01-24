import React, { useState } from "react";
import { usePins } from "src/hooks/usePins";
import { Table, Space, Modal } from "antd";
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { IPin } from "../pin.interface";
import PinShow from "../show/[id]"; // Importe o componente que exibe os detalhes

const PinList: React.FC = () => {
  const { pins, loading } = usePins();
  const [selectedPin, setSelectedPin] = useState<IPin | null>(null);

  const handleShow = (record: IPin) => {
    setSelectedPin(record);
  };

  const handleClose = () => {
    setSelectedPin(null);
  };

  const tableColumns = [
    { dataIndex: "id", title: "ID" },
    { dataIndex: "title", title: "Título" },
    { dataIndex: "description", title: "Descrição" },
    { dataIndex: "contact", title: "Contato" },
    { dataIndex: "category", title: "Categoria" },
    { dataIndex: "latitude", title: "Latitude" },
    { dataIndex: "longitude", title: "Longitude" },
    {
      title: "Ações",
      dataIndex: "actions",
      render: (_: any, record: IPin) => (
        <Space>
          <EditButton hideText size="small" recordItemId={record.id} />
          <ShowButton
            hideText
            size="small"
            onClick={() => handleShow(record)}
          />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <List>
      <Table
        dataSource={pins}
        columns={tableColumns}
        rowKey="id"
        loading={loading}
      />
      <Modal
        visible={!!selectedPin}
        width={650}
        footer={null}
        onCancel={handleClose}
        destroyOnClose
      >
        {selectedPin && <PinShow pin={selectedPin} />}
      </Modal>
    </List>
  );
};

export default PinList;
