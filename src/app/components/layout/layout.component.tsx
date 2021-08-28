import React, { useLayoutEffect, useState } from "react";
import NavigationBar from "./navigation-bar";
import SideBar from "./side-bar";
import "./layout.component.scss";
import { useSelector } from "react-redux";
import { GlobalState } from "@/app/store";
import { Role } from "@/app/shared/types/user.type";
import StorageService from "@/core/services/storage";

const Layout: React.FC = ({ children }) => {
  const [isInitialized, setInitialized] = useState(false);

  const { role } = useSelector(selectAuth);

  useLayoutEffect(() => {
    if (!StorageService.get("token")) {
      setInitialized(true);
    } else {
      if (role === Role.USER) {
        //todo
        setInitialized(true);
      }
    }
  }, [role]);

  return isInitialized ? (
    <div className="layout">
      <NavigationBar />
      <div className="content-wrapper">
        <div className="side-bar-wrapper">
          <SideBar />
        </div>
        <div className="content-box">{children}</div>
      </div>
    </div>
  ) : (
    <div />
  );
};

const selectAuth = (state: GlobalState) => state.auth;

export default Layout;
