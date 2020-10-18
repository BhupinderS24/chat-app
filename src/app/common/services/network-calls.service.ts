import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NetworkCallsService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getData() {
    let headers = new HttpHeaders();
    headers = headers.append(
      'session_id',
      'eyJhbGciOiJSUzUxMiJ9.eyJjbGllbnRfdXNlcl9pZCI6MzQsImV4cCI6MTYwMTEwOTk1OCwiaWF0IjoxNjAxMDIzNTU4fQ.EVfiXm8d1xVd21ZBSYoK0Ry9AnWo79yWywjM_cnAsYZsNgRfSrmPoHhZon4PXlJskZ2PFLU7vp6QlkJ8Lcmi8ac3V9CRsKp7UXhpq18z_-wqJjXH6ZeWXVbbS7b0X72GAnbIzK-XurbbTuhkdRKgW3vAQMhQhnLCgIiR2TzSPOkw-zWSzQOlSQEYXNr43XXm9XfWaeotIAULO_kAuKDWblHRB0EefOf4rJsE_XhHIobAiGv_H8QNz0SICP7EQq2YSJqxchDls0P0avVPtHHmBOCZvBMCk1XCqcGUt5DnKg_3PYHujZ0rMwQf9TtZj7w1c4CpaWJ6bUsLbSj6EZ8MFw'
    );
    headers = headers.append('user_id', '5723');

    let params = new HttpParams();
    params = params.append('identifier', 'cusip');
    params = params.append('searchval', '459200101');

    return this.http.get(
      'http://www6.quodd.com/lookup/auth/asset/fundamental',
      { headers, params }
    );
  }

  postData(task: any) {
    return this.http.post(`${this.url}/rerun`, task);
  }
}
