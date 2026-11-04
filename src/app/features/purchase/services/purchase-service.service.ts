import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Pagination } from '@shared/models/pagination';
import { CahdUtils } from '@core/utils/cahd.utils';
import { Purchase } from '../models/purchase';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PurchaseServiceService {

  constructor(private http: HttpClient) { }

  save(purchase: Purchase) {
    const serviceTypeJson = CahdUtils.jsonString(purchase);
    return this.http.post<Purchase>(`${CahdConstants.API}/compras`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }

  update(purchase: Purchase) {
    const serviceTypeJson = CahdUtils.jsonString(purchase);
    return this.http.put<Purchase>(`${CahdConstants.API}/compras/${purchase.id}`, serviceTypeJson, CahdUtils.header()).map(res => res);
  }
  delete(id?: number) {
    return this.http.delete(`${CahdConstants.API}/compras/${id}`, CahdUtils.header()).map(res => res);
  }

  findById(id: number) {
    return this.http.get<Purchase>(`${CahdConstants.API}/compras/${id}`, CahdUtils.header());
  }

  findAll(filter?: string, purchaseDate?: any, startDate?: any, endDate?: any, page?: number) {
    return this.http.get<Pagination<Purchase>>(`${CahdConstants.API}/compras?filtro=${filter}&dataCompra=${purchaseDate}&dataInicio=${startDate}&dataFim=${endDate}&page=${page}`, CahdUtils.header());
  }
  upload(img: FormData) {
    return this.http.post<any>(`${CahdConstants.API}/imagens/upload`, img, CahdUtils.headerUpload()).map(res => res);
  }
  report(startDate: any, endDate: any) {
    return this.http.get<Blob>(`${CahdConstants.API}/impressoes/relatorio/compras?dataInicio=${startDate}&dataFim=${endDate}`, CahdUtils.header());
  }
}
