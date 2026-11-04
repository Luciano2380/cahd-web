import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Pagination } from '@shared/models/pagination';
import { CahdUtils } from '@core/utils/cahd.utils';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  save(serviceType: Company) {
    const serviceTypeJson = CahdUtils.jsonString(serviceType);
    return this.http.post<Company>(`${CahdConstants.API}/empresas`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }

  update(serviceType: Company) {
    const serviceTypeJson = CahdUtils.jsonString(serviceType);
    return this.http.put<Company>(`${CahdConstants.API}/empresas/${serviceType.id}`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }
  delete(id?: number) {
    return this.http.delete(`${CahdConstants.API}/empresas/${id}`, CahdUtils.header()).map(res => res);
  }

  findById(id: number) {
    return this.http.get<Company>(`${CahdConstants.API}/empresas/${id}`, CahdUtils.header());
  }

  findAll(filter?: string, size?: string, page?: number) {
    return this.http.get<Pagination<Company>>(`${CahdConstants.API}/empresas?filtro=${filter}&page=${page}`,CahdUtils.header());
  }
}
