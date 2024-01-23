import React from "react";
import { usePins } from "src/hooks/usePins";
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";

interface IPin {
  id: string;
  title: string;
  description: string;
  contact: string;
  category: string;
  latitude: number;
  longitude: number;
}

const PinList: React.FC = () => {
  const { pins, loading } = usePins();

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
          <ShowButton hideText size="small" recordItemId={record.id} />
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
    </List>
  );
};

export default PinList;
