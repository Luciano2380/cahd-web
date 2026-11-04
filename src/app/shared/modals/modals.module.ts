/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Modules */
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { ModalConfirmComponent } from './components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,     
        SharedModule,
        LayoutModule,
        NgbModule        
    ],
    providers: [],
    declarations: [ModalConfirmComponent],
    exports: [ModalConfirmComponent],
})
export class ModalModule {}
