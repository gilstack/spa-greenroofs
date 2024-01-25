import React, { useState, useEffect } from "react";
import { Table, Space, Modal } from "antd";
import { List, EditButton, DeleteButton } from "@refinedev/antd";
import { useMarkers } from "../../../src/hooks/useMarkers";

import MarkerShow from "../show/index";
import MarkerEdit from "../edit/index";

interface IMarkerProps {
  id: string;
  title: string;
  description: string;
  contact: string;
  category: string;
  latitude: number;
  longitude: number;
}

const MarkerList: React.FC = () => {
  const { markers, loading, refreshMarkers } = useMarkers();
  const [selectedMarker, setSelectedMarker] = useState<IMarkerProps | null>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleShow = (record: IMarkerProps, editMode: boolean) => {
    setSelectedMarker(record);
    setEditMode(editMode);
    setShowModal(true);
  };

  const handleClose = () => {
    refreshMarkers();
    setSelectedMarker(null);
    setEditMode(false);
    setShowModal(false);
  };

  const tableColumns = [
    { dataIndex: "title", title: "Title" },
    { dataIndex: "latitude", title: "Lat" },
    { dataIndex: "longitude", title: "Long" },
    {
      title: "Edit",
      dataIndex: "actions",
      render: (_: any, record: IMarkerProps) => (
        <Space>
          <EditButton
            hideText
            size="small"
            recordItemId={record.id}
            onClick={() => handleShow(record, true)}
          />

          {/*
          <ShowButton
            hideText
            size="small"
            onClick={() => handleShow(record, false)}
          />
          */}

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
        visible={showModal}
        width={650}
        footer={null}
        onCancel={handleClose}
        destroyOnClose
      >
        {selectedMarker &&
          (editMode ? (
            <MarkerEdit marker={selectedMarker} onClose={handleClose} />
          ) : (
            <MarkerShow marker={selectedMarker} />
          ))}
      </Modal>
    </List>
  );
};

export default MarkerList;
