/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { ServiceCreateUpdateComponent } from './components/service-create-update/service-create-update.component';
import { ServiceSearchComponent } from './components/service-search/service-search.component';
import { NgSelectModule } from '@ng-select/ng-select'; 



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        LayoutModule,
        NgSelectModule
        
    ],
    providers: [],
    declarations: [ServiceCreateUpdateComponent, ServiceSearchComponent],
    exports: [],
})
export class ServiceModule {}
