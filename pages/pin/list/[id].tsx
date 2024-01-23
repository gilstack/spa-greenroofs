import React from "react";
import { usePins } from "src/hooks/usePins";
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";

const PinList: React.FC = () => {
  const { pins, loading } = usePins();

  const tableColumns = [
    // Defina suas colunas aqui
    // Exemplo:
    { dataIndex: "id", title: "Id" },
    { dataIndex: "title", title: "Title" },
    { dataIndex: "description", title: "Description" },
    { dataIndex: "contact", title: "Contact" },
    { dataIndex: "category", title: "Category" },
    { dataIndex: "latitude", title: "Latitude" },
    { dataIndex: "longitude", title: "Longitude" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: any) => (
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
