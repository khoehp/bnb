import Headers from "../common/components/header";
import Home from "../common/components/home";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./Guard";
import { Layout, Spin } from "antd";
import { useDispatch } from "react-redux";
import { fetchProfileAction } from "../features/authentication/action";
const { Sider, Content, Header, Footer } = Layout;
const Room = lazy(() => import("../features/admin/room"));
const Address = lazy(() => import("../features/admin/address"));
const RoomInfo = lazy(() => import("../features/admin/roomInfo"));
const User = lazy(() => import("../features/admin/user"));
const Signin = lazy(() => import("../features/authentication/signin"));
const Signup = lazy(() => import("../features/authentication/signup"));

function App() {
  const dispatch = useDispatch();
  // const fetch=async ()=>{
  //  await dispatch(fetchProfileAction(+localStorage.getItem("id")))
  // }
  useEffect(() => {
   dispatch(fetchProfileAction)
  },[]);
  return (
    <BrowserRouter>
      <Layout>
        <Header
          style={{
            height: "auto",
            background: "#339999",
          }}
        >
          <Headers />
        </Header>
        <Layout>
          <Sider style={{ width: "auto" }}>
            <Home />
          </Sider>
          <Content>
            <Suspense
              fallback={
                <div style={{ textAlign: "center" }}>
                  <Spin size="large" />
                </div>
              }
            >
              <Switch>
                <PrivateRoute path="/" component={Room} exact />
                <PrivateRoute path="/user" component={User} />
                <PrivateRoute path="/address" component={Address} />
                <PrivateRoute path="/roomInfo" component={RoomInfo} />
                <AuthRoute path="/signin" component={Signin} redirectPath="/" />
                <AuthRoute path="/signup" component={Signup} redirectPath="/" />
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </Content>
        </Layout>
        <Footer>
          <h3>asds</h3>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
