import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Pagination } from '@shared/models/pagination';
import { CahdUtils } from '@core/utils/cahd.utils';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  save(color: Color) {
    const json = CahdUtils.jsonString(color);
    return this.http.post<Color>(`${CahdConstants.API}/cores`, json, CahdUtils.header()).map(res => res);
  }

  update(color: Color) {
    const json = CahdUtils.jsonString(color);
    return this.http.put<Color>(`${CahdConstants.API}/cores/${color.id}`, json, CahdUtils.header()).map(res => res);
  }
  delete(id?: number) {
    return this.http.delete(`${CahdConstants.API}/cores/${id}`, CahdUtils.header()).map(res => res);
  }

  findById(id: number) {
    return this.http.get<Color>(`${CahdConstants.API}/cores/${id}`, CahdUtils.header());
  }

  findAll(filter?: string, size?: string, page?: number) {
    return this.http.get<Pagination<Color>>(`${CahdConstants.API}/cores?filtro=${filter}&page=${page}`, CahdUtils.header());
  }

  listAll() {
    return this.http.get<Color[]>(`${CahdConstants.API}/cores/todos`, CahdUtils.header());
  }
}
