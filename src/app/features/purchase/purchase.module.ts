/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { PurchaseReportComponent } from './components/purchase-report/purchase-report.component';
import { PurchaseCreateUpdateComponent } from './components/purchase-create-update/purchase-create-update.component';
import { PurchaseSearchComponent } from './components/purchase-search/purchase-search.component';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        LayoutModule,
        NgxCurrencyModule
    ],
    providers: [],
    declarations: [PurchaseReportComponent, PurchaseCreateUpdateComponent, PurchaseSearchComponent],
    exports: [],
})
export class PurchaseModule {}
