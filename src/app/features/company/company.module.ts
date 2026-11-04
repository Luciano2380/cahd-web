/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { CompanySearchComponent } from './components/company-search/company-search.component';
import { CompanyCreateUpdateComponent } from './components/company-create-update/company-create-update.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

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
        NgxMaskModule.forRoot(maskConfig)
    ],
    providers: [],
    declarations: [CompanySearchComponent, CompanyCreateUpdateComponent],
    exports: [],
})
export class CompanyModule {}
