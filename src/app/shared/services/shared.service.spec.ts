import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';

describe('SharedService', () => {
    let sharedService: SharedService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SharedService],
        });
        sharedService = TestBed.inject(SharedService);
    });

    describe('getShared$', () => {
        it('should return Observable<Shared>', () => {
            sharedService.getShared$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
