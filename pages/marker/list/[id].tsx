import React, { useState } from "react";
import { Table, Space, Modal } from "antd";
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import MarkerShow from "../show/[id]";
import { useMarkers } from "src/hooks/useMarkers";
import { IMarkerProps } from "../marker.interface";

const MarkerList: React.FC = () => {
  const { markers, loading } = useMarkers();
  const [selectedMarker, setSelectedMarker] = useState<IMarkerProps | null>(
    null
  );

  const handleShow = (record: IMarkerProps) => {
    setSelectedMarker(record);
  };

  const handleClose = () => {
    setSelectedMarker(null);
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
      render: (_: any, record: IMarkerProps) => (
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
        dataSource={markers}
        columns={tableColumns}
        rowKey="id"
        loading={loading}
      />
      <Modal
        visible={!!selectedMarker}
        width={650}
        footer={null}
        onCancel={handleClose}
        destroyOnClose
      >
        {selectedMarker && <MarkerShow marker={selectedMarker} />}
      </Modal>
    </List>
  );
};

export default MarkerList;
