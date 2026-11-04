/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@layout/models';

/* Module */
import { ServiceTypeModule } from './service-type.module';

/* Components */
import * as serviceTypeComponets from './components';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'service-type-search',
    },
    {
        path: 'service-type-search',
        canActivate: [],
        component: serviceTypeComponets.ServiceTypeSearchComponent,
        data: {
            title: 'Pesquisa de Complementos',
        } as SBRouteData,
    },
    {
        path: 'service-type-create',
        canActivate: [],
        component: serviceTypeComponets.ServiceTypeCreateUpdateComponent,
        data: {
            title: 'Cadastro de Complementos',
        } as SBRouteData,
    },
    {
        path: 'show-service-type',
        canActivate: [],
        component: serviceTypeComponets.ServiceTypeSearchValueComponent,
        data: {
            title: 'Exibir Valores dos Complementos',
        } as SBRouteData,
    }
  
];

@NgModule({
    imports: [ServiceTypeModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ServiceTypeRoutingModule {}
