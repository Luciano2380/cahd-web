import { HttpHeaders } from '@angular/common/http';
import { CahdConstants } from '@core/constants/cahd.constants';
import { ApiMapper } from './api-mapper';

export class CahdUtils {
    constructor() { }

    /** Serializes a model to the JSON sent to the backend (keys translated to the API contract). */
    static jsonString(model: any) {
        var cache: string[] = [];
        let json = JSON.stringify(model, function (key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    try {
                        return ApiMapper.toApi(JSON.parse(JSON.stringify(value)));
                    } catch (error) {

                        return;
                    }
                }
                cache.push(value);
            }
            return ApiMapper.toApiShallow(value);
        });
        cache = [];
        return json;
    }

    static header() {
        const token = localStorage.getItem(CahdConstants.TOKEN);
        if (token != null) {
            var http = new HttpHeaders(
                {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
                    "Accept": "application/json",
                    "Authorization": token

                }
            );
            return { headers: http }
        }
    }

    static headerUser() {
        var http = new HttpHeaders(
            {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
                "Accept": "application/json"

            }
        );
        return { headers: http }
    }

    static headerUpload() {
        const token = localStorage.getItem(CahdConstants.TOKEN);
        if (token != null) {

            var http = new HttpHeaders(
                {
                    "Authorization": token                  

                }
            );
            return { headers: http};
        }
    }

    static headerDownload() {
        const token = localStorage.getItem(CahdConstants.TOKEN);
        if (token != null) {

            var http = new HttpHeaders(
                {
                    "Authorization": token                    

                }
            );
            return { headers: http};
        }
    }

}
