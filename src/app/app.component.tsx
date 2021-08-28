import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { appRoutes } from "./app.route";
import "./styles/app.scss";
import Layout from "./components/layout";
import { GlobalState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { guardRoutes } from "./shared/helpers/component.helper";
import NotFoundPage from "./modules/not-found";
import LoginPage from "@/app/modules/login";
import { Role } from "./shared/types/user.type";
import { logout, saveUserInfo } from "./store/auth/auth.action";
import StorageService from "@/core/services/storage";
import { message, Modal } from "antd";
import AppHttpService from "./shared/services/http";
import { AjaxError } from "rxjs/ajax";
import ModalService from "./shared/services/modal";

const App: React.FC = () => {
  const { role } = useSelector(authSelector);

  const dispatch = useDispatch();

  const history = useHistory();
  const [modal, contextHolder] = Modal.useModal();

  const [isCheckValidToken, setCheckValidToken] = useState(false);

  useLayoutEffect(() => {
    if (!StorageService.get("token")) {
      setCheckValidToken(true);
      return;
    }
    // UserAPI.getUserInfo()
    //   .pipe(
    //     catchError((error) => {
    //       StorageService.set("token", "");
    //       return throwError(() => error);
    //     }),
    //     finalize(() => {
    //       setCheckValidToken(true);
    //     }),
    //   )
    //   .subscribe((user) => {
    //     dispatch(saveUserInfo(user));
    //   });
    dispatch(
      saveUserInfo({
        name: "test",
        userName: "test",
        email: "",
      }),
    );
  }, []);

  useEffect(() => {
    AppHttpService.onError$.subscribe((error: any) => {
      let messError = "Có lỗi xảy ra";
      if (error) {
        if (typeof error === "string") {
          messError = error;
        } else if (error instanceof AjaxError) {
          if (error.status === 401) {
            messError = "Phiên làm việc đã hết hạn";
            StorageService.set("token", "");
            ModalService.destroyAll();
            dispatch(logout());
            history?.push("/login");
          }
        }
      }
      message.error(messError);
    });
    return () => {
      AppHttpService.onError$.unsubscribe();
    };
  }, [history]);

  useEffect(() => {
    ModalService.modal = modal;
  }, [modal]);

  return isCheckValidToken ? (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path={["/", "/dashboard"]}>
            <Redirect to="/dashboard/home" />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <Layout>
              {guardRoutes(appRoutes, role, {
                roles: [Role.USER],
                redirect: "/login",
              })}
            </Layout>
          </Route>
          <Route path={["/not-found", "*"]}>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
      {contextHolder}
    </div>
  ) : (
    <div />
  );
};

const authSelector = (state: GlobalState) => state.auth;
export default App;
