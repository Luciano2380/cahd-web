import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Pagination } from '@shared/models/pagination';
import { CahdUtils } from '@core/utils/cahd.utils';
import 'rxjs/add/operator/map';

import { User } from '../models';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    save(user: User) {
        const userJson = CahdUtils.jsonString(user);
        return this.http.post<User>(`${CahdConstants.API}/usuarios`, userJson, CahdUtils.headerUser()).map(res => res);
    }

    update(user: User) {
        const userJson = CahdUtils.jsonString(user);
        return this.http.put<User>(`${CahdConstants.API}/usuarios/${user.id}`, userJson, CahdUtils.header()).map(res => res);
    }
    delete(id?: number) {
        return this.http.delete(`${CahdConstants.API}/usuarios/${id}`, CahdUtils.header()).map(res => res);
    }

    findById(id: number) {
        return this.http.get<User>(`${CahdConstants.API}/usuarios/${id}`, CahdUtils.header());
    }

    findAll(filter?: string, size?: string, page?: number) {
        return this.http.get<Pagination<User>>(`${CahdConstants.API}/usuarios?filtro=${filter}&page=${page}`, CahdUtils.header());
    }
}
