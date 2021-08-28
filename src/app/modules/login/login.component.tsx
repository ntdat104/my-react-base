import React, { useCallback, useState } from "react";
import "./login.component.scss";
import { Button, Form, Input, Spin } from "antd";
import { useHistory } from "react-router-dom";
import useCommon from "@/core/hooks/use-common.hook";
import UserAPI from "@/app/shared/apis/user.api";
import { finalize, takeUntil } from "rxjs/operators";
import StorageService from "@/core/services/storage";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "@/app/store/auth/auth.action";
import { User } from "@/app/shared/types/user.type";

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const history = useHistory();

  const dispatch = useDispatch();

  const [isFormValid, setFormValid] = useState(false);

  const { destroy$ } = useCommon();

  const [isLoading, setLoading] = useState(false);

  const checkValidForm = useCallback(() => {
    const isValid =
      form.getFieldValue("username") &&
      form.getFieldValue("username").length > 0 &&
      form.getFieldValue("password") &&
      form.getFieldValue("password").length > 0;

    if (isValid !== isFormValid) {
      setFormValid(isValid);
    }
  }, [form, isFormValid, setFormValid]);

  const login = useCallback(() => {
    // setLoading(true);
    // const username = form.getFieldValue("username");
    // const password = form.getFieldValue("password");

    // UserAPI.login(username, password)
    //   .pipe(
    //     finalize(() => {
    //       setLoading(false);
    //     }),
    //     takeUntil(destroy$),
    //   )
    //   .subscribe((loginData) => {
    //     if (loginData) {
    //       StorageService.set("token", loginData.token);
    //       dispatch(saveUserInfo(loginData as User));
    //       history.push("/dashboard");
    //     }
    //   });
    StorageService.set("token", "token_test_123");
    dispatch(
      saveUserInfo({
        userName: "test",
        name: "test",
        email: "",
      }),
    );
    history.push("/dashboard");
  }, [form, destroy$, setLoading, history, dispatch]);

  return (
    <Spin tip="Loading..." spinning={isLoading} size="large">
      <div className="login-page">
        <div className="login-page-inner">
          <div className="login-title font-large-title-49md">Login</div>
          <div className="login-input-group">
            <Form
              className="login-input-group-form"
              form={form}
              onValuesChange={() => {
                checkValidForm();
              }}
            >
              <span className="login-input-label font-body-17sm">
                Tài khoản
              </span>
              <Form.Item name="username">
                <Input placeholder="Nhập tài khoản" />
              </Form.Item>
              <span className="login-input-label font-body-17sm">Mật khẩu</span>
              <Form.Item name="password">
                <Input type="password" placeholder="Nhập mật khẩu" />
              </Form.Item>
              <Form.Item>
                <Button
                  disabled={!isFormValid}
                  type="primary"
                  className="button-login"
                  onClick={login}
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default LoginPage;
