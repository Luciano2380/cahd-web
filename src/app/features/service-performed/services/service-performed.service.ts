import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Pagination } from '@shared/models/pagination';
import { CahdUtils } from '@core/utils/cahd.utils';
import { ServicePerformance } from '../models/service-performance';

@Injectable({
  providedIn: 'root'
})
export class ServicePerformedService {

  constructor(private http: HttpClient) { }


  save(serviceType: ServicePerformance) {
    const serviceTypeJson = CahdUtils.jsonString(serviceType);
    return this.http.post<ServicePerformance>(`${CahdConstants.API}/servicosexecutados`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }

  update(serviceType: ServicePerformance) {
    const serviceTypeJson = CahdUtils.jsonString(serviceType);
    return this.http.put<ServicePerformance>(`${CahdConstants.API}/servicosexecutados/${serviceType.id}`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }
  delete(id?: number) {
    return this.http.delete(`${CahdConstants.API}/servicosexecutados/${id}`, CahdUtils.header()).map(res => res);
  }

  findById(id: number) {
    return this.http.get<ServicePerformance>(`${CahdConstants.API}/servicosexecutados/${id}`, CahdUtils.header());
  }

  findAll(idService:any, record:any, startDate:any, endDate:any, page?: number) {    
    return this.http.get<Pagination<ServicePerformance>>(`${CahdConstants.API}/servicosexecutados?idServico=${idService}&filtro=${record}&dataInicio=${startDate}&dataFim=${endDate}&page=${page}`, CahdUtils.header());
  }
  print(id:number) {    
    return this.http.get(`${CahdConstants.API}/impressoes/${id}`, CahdUtils.header());
  }
  report(id:any, startDate:any, endDate:any) {    
 
    return this.http.get(`${CahdConstants.API}/impressoes/relatorio/servicosexecutados?idServicoExecutado=${id}&dataInicio=${startDate}&dataFim=${endDate}`,{responseType: 'blob'});
  }
}
