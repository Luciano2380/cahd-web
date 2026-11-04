/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { ServicePerformedSearchComponent } from './components/service-performed-search/service-performed-search.component';
import { ServicePerformedCreateUpdateComponent } from './components/service-performed-create-update/service-performed-create-update.component';
import { RunServiceComponent } from './components/run-service/run-service.component';
import { ServicePerformedReportComponent } from './components/service-performed-report/service-performed-report.component';
import { ShowServicePerformedComponent } from './components/show-service-performed/show-service-performed.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxCurrencyModule } from "ngx-currency";
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        LayoutModule,
        NgSelectModule,
        NgxCurrencyModule,
        NgbModule,
        NgxMaskModule.forRoot(maskConfig),
    ],
    providers: [NgbActiveModal],
    declarations: [ServicePerformedSearchComponent, ServicePerformedCreateUpdateComponent, RunServiceComponent, ServicePerformedReportComponent, ShowServicePerformedComponent],
    exports: [],
})
export class ServicePerformedModule { }
