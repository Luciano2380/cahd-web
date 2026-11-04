/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@layout/layout.module';
import { ColorCreateUpdateComponent } from './components/color-create-update/color-create-update.component';
import { ColorSearchComponent } from './components/color-search/color-search.component';

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
    ],
    providers: [],
    declarations: [ColorCreateUpdateComponent, ColorSearchComponent],
    exports: [],
})
export class ColorModule {}
