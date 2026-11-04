import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiMapper } from '../utils/api-mapper';

/** Translates the keys of JSON responses from the backend (Portuguese) to the model names (English). */
@Injectable()
export class ApiMapperInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map(event => {
                if (event instanceof HttpResponse && event.body && typeof event.body === 'object') {
                    return event.clone({ body: ApiMapper.fromApi(event.body) });
                }
                return event;
            })
        );
    }
}
