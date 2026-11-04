import { Injectable } from '@angular/core';
import { ServiceType } from '../models/service-type';
import { HttpClient } from '@angular/common/http';
import { CahdUtils } from '@core/utils/cahd.utils';
import { CahdConstants } from '@core/constants/cahd.constants';
import 'rxjs/add/operator/map';
import { Pagination } from '@shared/models/pagination';
import { ServiceTypePrice } from '../models/service-type-price';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  constructor(private http: HttpClient) { }

  save(serviceType: ServiceType) {
    const serviceTypeJson = CahdUtils.jsonString(serviceType);
    return this.http.post<ServiceType>(`${CahdConstants.API}/tiposservicos`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }

  update(serviceType: ServiceType) {
    const serviceTypeJson = CahdUtils.jsonString(serviceType);
    return this.http.put<ServiceType>(`${CahdConstants.API}/tiposservicos/${serviceType.id}`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }
  delete(id?: number) {
    return this.http.delete(`${CahdConstants.API}/tiposservicos/${id}`, CahdUtils.header()).map(res => res);
  }

  findById(id: number) {
    return this.http.get<ServiceType>(`${CahdConstants.API}/tiposservicos/${id}`, CahdUtils.header());
  }

  findAll(filter?: string, size?: string, page?: number) {
    return this.http.get<Pagination<ServiceType>>(`${CahdConstants.API}/tiposservicos?filtro=${filter}&page=${page}`,CahdUtils.header());
  }

  findAllActive() {
    return this.http.get<ServiceType[]>(`${CahdConstants.API}/tiposservicos/listar_ativos`,CahdUtils.header());
  }

  findAllPrices(idService: number, size: string) {
    return this.http.get<ServiceTypePrice[]>(`${CahdConstants.API}/tiposservicos/precos/servico/${idService}/tamanho/${size}`,CahdUtils.header());
  }
  findAllPricesVehicles(idVehicle?: number, page?: number) {
    return this.http.get<Pagination<ServiceTypePrice>>(`${CahdConstants.API}/tiposservicos/precos/veiculo?idVeiculo=${idVehicle}&page=${page}`,CahdUtils.header());
  }



}
