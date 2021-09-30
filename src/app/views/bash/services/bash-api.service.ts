import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { BashResultInterface } from '../interfaces';
import { ParamsInterface } from '../../../common/interfaces';

@Injectable()
export class BashApiService {
  constructor(private http: HttpClient) {}

  private bashApiUrl = environment.bashApi.url;
  private bashApiEndpoints = environment.bashApi.endpoints;

  runCommand(cmd: string): Observable<BashResultInterface | ErrorEvent> {
    const url = `${this.bashApiUrl}${this.bashApiEndpoints.runCommand}`;
    return this.http
      .post<BashResultInterface>(url, { cmd })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getResults(
    params: ParamsInterface,
  ): Observable<BashResultInterface[] | ErrorEvent> {
    const url = `${this.bashApiUrl}${this.bashApiEndpoints.getResults}`;
    return this.http
      .get<BashResultInterface[]>(url, { params })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse): Observable<ErrorEvent> {
    return throwError(error);
  }
}
