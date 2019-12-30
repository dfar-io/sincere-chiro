import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EmailMessage } from "./email-message";

@Injectable()
export class ContactService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  postContactForm(email: EmailMessage): Observable<any> {
    const body = JSON.stringify(email);

    return this.http.post(this.apiUrl + "/email", body);
  }
}
