import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class SharedService {
    constructor() {}

    getShared$(): Observable<{}> {
        return of({});
    }

}
