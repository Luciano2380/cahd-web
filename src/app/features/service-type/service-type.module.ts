/* tslint:disable: ordered-imports*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { ServiceTypeCreateUpdateComponent } from './components/service-type-create-update/service-type-create-update.component';
import { ServiceTypeSearchComponent } from './components/service-type-search/service-type-search.component';
import { ServiceTypeSearchValueComponent } from './components/service-type-search-value/service-type-search-value.component';
import { ModalModule } from '../../shared/modals/modals.module';
import { ModalConfirmComponent } from '../../shared/modals/components';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        LayoutModule,
        ModalModule,
        NgxCurrencyModule,
        NgxSpinnerModule,
        NgbModule,
        NgSelectModule
        
       
    ],  
    schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    providers: [],
    declarations: [ServiceTypeCreateUpdateComponent, ServiceTypeSearchComponent, ServiceTypeSearchValueComponent],
    exports: [],
    entryComponents: [ModalConfirmComponent]
})
export class ServiceTypeModule { }
