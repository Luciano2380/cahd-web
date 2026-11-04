import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CahdConstants } from '@core/constants/cahd.constants';
import { CahdUtils } from '@core/utils/cahd.utils';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    login(login: string, password: string) {
        const user = CahdUtils.jsonString({ email: login, password: password });
        return this.http.post<any>(`${CahdConstants.API}/usuarios/login`, user, CahdUtils.headerUser())
            .pipe(map(response => {
                localStorage.setItem(CahdConstants.TOKEN, response.token);               
                return response;
            }));
    }
}
