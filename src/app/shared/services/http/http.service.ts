import { HttpService } from "@/core/services/http/http.service";
import StorageService from "@/core/services/storage";
import { AjaxResponse } from "rxjs/ajax";
import { HttpResponse } from "../../types/response.type";

class AppHttpService extends HttpService {
  handleResponse<T>(ajaxResponse: AjaxResponse): T | undefined {
    // const newToken = ajaxResponse.xhr.getResponseHeader("newtoken");
    // if (newToken) {
    //   StorageService.set("token", newToken);
    // }
    if (ajaxResponse.response) {
      const response = JSON.parse(ajaxResponse.response) as HttpResponse<T>;
      if (response) {
        if (response.resultcode === 1) {
          return response.data;
        } else {
          if (response.message) {
            throw response.message;
          }
        }
      }
    }
    throw null;
  }
}

export default new AppHttpService();
