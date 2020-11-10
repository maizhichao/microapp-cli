import React from "react";
import { connect } from "react-redux";
import { initialize } from "@/store/actions/main";
import { Layout, Spin } from "antd";
import "./style.less";
import Router from "@/router";
const { Content } = Layout;

class Main extends React.Component {
  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <Content className="se-main-content">
        <Spin
          size="large"
          spinning={this.props.spinning}
          wrapperClassName="se-main-content-wrapper"
        >
          <Router />
        </Spin>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  spinning: state.main.spinning
});

const mapDispatchToProps = {
  initialize: initialize
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
