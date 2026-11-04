/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@layout/models';

/* Module */
import { ColorModule } from './color.module';

/* Components */
import * as colorComponets from './components';

/* Guards */


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'color-search',
    },
    {
        path: 'color-search',
        canActivate: [],
        component: colorComponets.ColorSearchComponent,
        data: {
            title: 'Pesquisa de Cores',
        } as SBRouteData,
    },
    {
        path: 'color-create',
        canActivate: [],
        component: colorComponets.ColorCreateUpdateComponent,
        data: {
            title: 'Cadastro de Cores',
        } as SBRouteData,
    }
    
];

@NgModule({
    imports: [ColorModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ColorRoutingModule {}
