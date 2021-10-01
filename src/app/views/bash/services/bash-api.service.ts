import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BashResultInterface } from '../interfaces';

@Injectable()
export class BashApiService {
  constructor(private http: HttpClient) {}

  private bashApiUrl = environment.bashApi.url;
  private bashApiEndpoints = environment.bashApi.endpoints;

  runCommand(cmd: string): Observable<BashResultInterface> {
    const url = `${this.bashApiUrl}${this.bashApiEndpoints.runCommand}`;
    return this.http.post<BashResultInterface>(url, { cmd });
  }
}
