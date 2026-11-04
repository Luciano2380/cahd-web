import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Pagination } from '@shared/models/pagination';
import { CahdUtils } from '@core/utils/cahd.utils';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  save(serviceType: Service) {
    const serviceTypeJson = CahdUtils.jsonString(serviceType);
    return this.http.post<Service>(`${CahdConstants.API}/servicos`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }

  update(serviceType: Service) {
    const serviceTypeJson = CahdUtils.jsonString(serviceType);
    return this.http.put<Service>(`${CahdConstants.API}/servicos/${serviceType.id}`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }
  delete(id?: number) {
    return this.http.delete(`${CahdConstants.API}/servicos/${id}`, CahdUtils.header()).map(res => res);
  }

  findById(id: number) {
    return this.http.get<Service>(`${CahdConstants.API}/servicos/${id}`, CahdUtils.header());
  }

  findAll(filter?: string, size?: string, page?: number) {
    return this.http.get<Pagination<Service>>(`${CahdConstants.API}/servicos?filtro=${filter}&page=${page}`,CahdUtils.header());
  }
  
  listAllMenu() {
    return this.http.get<Service[]>(`${CahdConstants.API}/servicos/menu`,CahdUtils.header());
  }

}
