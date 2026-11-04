import { TestBed } from '@angular/core/testing';

import { SharedGuard } from './shared.guard';

describe('App Common Guards', () => {
    let sharedGuard: SharedGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [SharedGuard],
        });
        sharedGuard = TestBed.inject(SharedGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            sharedGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
