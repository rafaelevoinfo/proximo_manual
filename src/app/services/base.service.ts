import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class BaseService {
  protected baseApiUrl = environment.baseApiUrl;

  constructor(protected http: HttpClient) {

  }

}
