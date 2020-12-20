import React, { Suspense, Component, Fragment } from "react";
import { Route, Switch, Redirect, withRouter as realWithRouter } from "react-router-dom";
// 这里的是路由配置文件
import routes from "./router/index";
import { connect as realConnect } from "react-redux";

type StateType = {
  [propName: string]: any;
};
type PropType = {
  [propName: string]: any;
};
interface App {
  state: StateType;
  props: PropType;
}

// 获取路由信息
const withRouter: any = realWithRouter;

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

const connect: any = realConnect;
@connect(mapStateToProps, {})
@withRouter

class App extends Component {
  componentDidMount() {
    // 将history挂载在window，使得各处都可以使用
    window.reactHistory = this.props.history;
    // 如果没有token，则跳去登录页
    if (!this.props.state.CommonReducer.token) {
      // this.props.history.push('/Login');
    }
  }

  render() {
    return (
      <Fragment>
        <Suspense fallback={<div></div>}>
          <Switch>
            {routes.length > 0 &&
              routes.map((route: any) => {
                //遍历路由数组
                const { path, component: C, exact } = route;
                return (
                  <Route
                    exact={exact}
                    key={path}
                    path={path}
                    render={(props: any) => {
                      return <C {...props} />;
                    }}
                  />
                );
              })}
            {/* 默认进入/时自动匹配到/ */}
            <Redirect exact from="/" to={"/"} />
            {/* 默认无效路径时自动匹配到首页 */}
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Fragment>
    );
  }
}

export default App;
