import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
    @Input() name: any;
    @Input() type: any;
    
    constructor(public activeModal: NgbActiveModal) {}
    ngOnInit() { }
}
