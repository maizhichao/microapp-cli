import React from "react";
import { Avatar, Popover, Button } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { showSpin } from "@/store/actions/main";
import { connect } from "react-redux";

class MenuOptions extends React.Component {
  onLogin = () => {
    this.props.showSpin(true);
    window.location.href = window.WEBSERVER + `/login?sysId=1`;
  };

  onLogout = () => {
    this.props.showSpin(true);
    const backToLoginPage = window.location.href;
    window.location.href =
      window.WEBSERVER + `/logout?returnURL=${backToLoginPage}`;
  };

  content = (
    <div>
      <Button type="primary" onClick={this.onLogin}>
        Login
      </Button>
      &nbsp;
      <Button type="danger" onClick={this.onLogout}>
        Logout
      </Button>
    </div>
  );

  render() {
    return (
      <Popover
        content={this.content}
        title="User Information"
        trigger="click"
        placement="bottomRight"
      >
        <Avatar className="menu-option" icon={<TeamOutlined />} />
      </Popover>
    );
  }
}
const mapDispatchToProps = {
  showSpin: showSpin
};

export default connect(undefined, mapDispatchToProps)(MenuOptions);
