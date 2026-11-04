import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Pagination } from '@shared/models/pagination';
import { CahdUtils } from '@core/utils/cahd.utils';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) { }
  save(client: Client) {
    const json = CahdUtils.jsonString(client);
    return this.http.post<Client>(`${CahdConstants.API}/clientes`, json, CahdUtils.header()).map(res => res);
  }

  update(client: Client) {
    const json = CahdUtils.jsonString(client);
    return this.http.put<Client>(`${CahdConstants.API}/clientes/${client.id}`, json, CahdUtils.header()).map(res => res);
  }
  delete(id?: number) {
    return this.http.delete(`${CahdConstants.API}/clientes/${id}`, CahdUtils.header()).map(res => res);
  }

  findById(id: number) {
    return this.http.get<Client>(`${CahdConstants.API}/clientes/${id}`, CahdUtils.header());
  }

  findAll(filter?: string, size?: string, page?: number) {
    return this.http.get<Pagination<Client>>(`${CahdConstants.API}/clientes?filtro=${filter}&page=${page}`, CahdUtils.header());
  }
  listAll(idVehicle?: number, idColor?: number){
    return this.http.get<Client[]>(`${CahdConstants.API}/clientes/veiculo-cor?idVeiculo=${idVehicle}&idCor=${idColor}`, CahdUtils.header());
  }
}
