/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import 'rxjs/add/operator/map';

import * as clientComponets from './components';

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
        NgbModule,
        NgxMaskModule.forRoot(maskConfig),
        NgSelectModule

    ],
    providers: [],
    declarations: [clientComponets.components],
    exports: [clientComponets.components],
})
export class ClientModule { }
