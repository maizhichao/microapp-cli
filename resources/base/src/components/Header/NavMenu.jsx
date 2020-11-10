import React from "react";
import { Menu } from "antd";
import {
  TeamOutlined,
  IdcardOutlined,
  FileSearchOutlined,
  SolutionOutlined,
  TableOutlined,
  AntCloudOutlined
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const NAV_LINKS = [
  {
    link: "microapp1",
    title: "Micro1",
    icon: <TeamOutlined />
  },
  {
    link: "microapp2",
    title: "Micro2",
    icon: <IdcardOutlined />
  },
  {
    link: "microapp3",
    title: "Micro3",
    icon: <FileSearchOutlined />
  },
  {
    link: "nested-menu",
    title: "Nested Menu",
    icon: <SolutionOutlined />,
    subLinks: [
      {
        link: "nested1",
        title: "Nested1",
        icon: <TableOutlined />
      },
      {
        link: "nested2",
        title: "Nested2",
        icon: <AntCloudOutlined />
      }
    ]
  }
];

const SUB_NAV_LINK_GROUP = NAV_LINKS.reduce((collection, nav) => {
  if (nav.subLinks) {
    nav.subLinks.forEach(sub => {
      const key = [sub.link, nav.link].join(",");
      collection[key] = { ...sub };
    });
  }
  return collection;
}, {});

const makeTitle = (nav, activeSubPath) => {
  if (!activeSubPath) {
    return (
      <span className="main-title">
        {nav.icon}
        {nav.title}
      </span>
    );
  }
  return (
    <div className="navigation-title">
      <span className="main-title">
        {nav.icon}
        {nav.title}
      </span>
      <div className="sub-title">{activeSubPath}</div>
    </div>
  );
};

class NavMenu extends React.Component {
  state = {
    currentPath: null,
    currentPathName: null,
    activeSubPath: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { pathname } = nextProps.location;
    if (pathname !== prevState.currentPathName) {
      const menuPath = pathname && pathname.split("/").slice(1, 3).reverse();
      const menuPathName = String(menuPath);
      if (String(prevState.currentPath) !== menuPathName) {
        const activeSubNav = SUB_NAV_LINK_GROUP[menuPathName];
        const activeSubPath = activeSubNav && activeSubNav.title;
        return {
          currentPath: menuPath,
          currentPathName: pathname,
          activeSubPath: activeSubPath
        };
      }
    }
    return null;
  }

  handleMenuItemClick = e => {
    if (String(this.state.currentPath) !== String(e.keyPath)) {
      this.props.history.push({
        pathname: "/" + e.keyPath.reverse().join("/")
      });
    }
  };

  getMenuItems = () => {
    return NAV_LINKS.map(nav => {
      if (nav.subLinks) {
        return (
          <Menu.SubMenu
            key={nav.link}
            title={makeTitle(nav, this.state.activeSubPath)}
          >
            {nav.subLinks.map(subNav => {
              return (
                <Menu.Item key={subNav.link}>
                  {subNav.icon}
                  {subNav.title}
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={nav.link}>
          {nav.icon}
          {nav.title}
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <Menu
        className="menu-content"
        mode="horizontal"
        onClick={this.handleMenuItemClick}
        selectedKeys={this.state.currentPath}
      >
        {this.getMenuItems()}
      </Menu>
    );
  }
}

export default withRouter(NavMenu);
