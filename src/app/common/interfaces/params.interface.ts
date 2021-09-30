import { HttpParams } from '@angular/common/http';

export interface ParamsInterface extends HttpParams {
  limit?: number;
}
