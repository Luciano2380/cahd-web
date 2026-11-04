import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Pagination } from '@shared/models/pagination';
import { CahdUtils } from '@core/utils/cahd.utils';
import { Vehicle } from '../models/vehicle';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  save(vehicle: Vehicle) {
    const json = CahdUtils.jsonString(vehicle);
    return this.http.post<Vehicle>(`${CahdConstants.API}/veiculos`, json, CahdUtils.header()).map(res => res);
  }

  update(vehicle: Vehicle) {
    const json = CahdUtils.jsonString(vehicle);
    return this.http.put<Vehicle>(`${CahdConstants.API}/veiculos/${vehicle.id}`, json, CahdUtils.header()).map(res => res);
  }
  delete(id?: number) {
    return this.http.delete(`${CahdConstants.API}/veiculos/${id}`, CahdUtils.header()).map(res => res);
  }

  findById(id: number) {
    return this.http.get<Vehicle>(`${CahdConstants.API}/veiculos/${id}`, CahdUtils.header());
  }

  findAll(filter?: string, size?: string, page?: number) {
    return this.http.get<Pagination<Vehicle>>(`${CahdConstants.API}/veiculos?filtro=${filter}&page=${page}`, CahdUtils.header());
  }
  
  listAll() {
    return this.http.get<Vehicle[]>(`${CahdConstants.API}/veiculos/todos`, CahdUtils.header());
  }
}
