import React, { useCallback } from "react";
import "./navigation-bar.component.scss";
import { Avatar, Dropdown, Input, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink, useHistory } from "react-router-dom";
import StorageService from "@/core/services/storage";
import { useDispatch } from "react-redux";
import { logout } from "@/app/store/auth/auth.action";

const NavigationBar: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    history.push("/login");
    StorageService.set("token", "");
    dispatch(logout());
  }, [history, dispatch]);

  return (
    <div className="navigation-bar">
      <NavLink to="/dashboard/home" className="navigation-bar-logo-wrapper">
        <div className="navigation-bar-logo">Logo</div>
      </NavLink>
      <div className="navigation-bar-search">
        <Input placeholder="Tìm kiếm" />
      </div>
      <Dropdown
        placement="bottomLeft"
        overlay={
          <Menu>
            <Menu.Item
              key="logout"
              className="navigation-bar-avatar-dropdown-item"
            >
              <div className="font-body-17r" onClick={handleLogout}>
                Đăng xuất
              </div>
            </Menu.Item>
          </Menu>
        }
        overlayClassName="navigation-bar-avatar-dropdown"
      >
        <div className="navigation-bar-avatar">
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </div>
  );
};
export default NavigationBar;
