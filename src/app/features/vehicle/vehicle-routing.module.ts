/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@layout/models';

/* Module */
import { VehicleModule } from './vehicle.module';

/* Components */
import * as vehiclesComponets from './components';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vehicle-search',
    },
    {
        path: 'vehicle-search',
        canActivate: [],
        component: vehiclesComponets.VehicleSearchComponent,
        data: {
            title: 'Pesquisa de Veiculos',
        } as SBRouteData,
    },
    {
        path: 'vehicle-create',
        canActivate: [],
        component: vehiclesComponets.VehicleCreateUpdateComponent,
        data: {
            title: 'Cadastro de Veiculos',
        } as SBRouteData,
    }
   
];

@NgModule({
    imports: [VehicleModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class VehicleRoutingModule {}
