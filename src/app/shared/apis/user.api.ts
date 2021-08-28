import { Observable } from "rxjs";
import AppHttpService from "../services/http";
import { LoginData } from "../types/response.type";
import { User } from "../types/user.type";

class AppUserAPI {
  public login(
    username: string,
    password: string,
  ): Observable<LoginData | undefined> {
    return AppHttpService.post<LoginData>("/User/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: { userName: username, password },
    });
  }

  public getUserInfo(): Observable<User | undefined> {
    return AppHttpService.get<User>("/User/userInfo");
  }
}

const UserAPI = new AppUserAPI();
export default UserAPI;
