/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { VehicleSearchComponent } from './components/vehicle-search/vehicle-search.component';
import { VehicleCreateUpdateComponent } from './components/vehicle-create-update/vehicle-create-update.component';
import { NgSelectModule } from '@ng-select/ng-select';

/* Components */


/* Containers */


/* Guards */


/* Services */


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
    declarations: [VehicleSearchComponent, VehicleCreateUpdateComponent],
    exports: [],
})
export class VehicleModule {}
