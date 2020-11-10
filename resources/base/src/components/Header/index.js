import React from "react";
import { Layout } from "antd";
import "./style.less";
import NavMenu from "./NavMenu";
import MenuOptions from "./MenuOptions";

const { Header } = Layout;

class AppHeader extends React.Component {
  render() {
    return (
      <Header className="se-app-header">
        <div className="menu-logo" />
        <NavMenu />
        <MenuOptions />
      </Header>
    );
  }
}

export default AppHeader;
