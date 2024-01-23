import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import React, { useContext, useEffect, useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { ColorModeContext } from "../../contexts";
import {
  Layout as AntdLayout,
  Avatar,
  Space,
  Switch,
  Typography,
  theme,
} from "antd";
import { jwtDecode } from "jwt-decode";

interface IUser {
  id: string;
  name: string;
  avatar: string;
}

const { Text } = Typography;
const { useToken } = theme;

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  const [decoded, setDecoded] = useState<IUser | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // Decodifica o token e atualiza o estado
      const decodedToken = jwtDecode(storedToken) as IUser;
      setDecoded(decodedToken);
    }
  }, []);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    justifyItems: "center",
    padding: "0px 24px",
    height: "70px",
    lineHeight: 0,
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {decoded?.name && <Text strong>{decoded.name}</Text>}
          {decoded?.avatar && (
            <Avatar src={decoded.avatar} alt={decoded.name} />
          )}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
