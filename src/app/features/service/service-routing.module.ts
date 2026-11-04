/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@layout/models';

/* Module */
import { ServiceModule } from './service.module';

/* Components */
import * as serviceComponets from './components';


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'service-search',
    },
    {
        path: 'service-search',
        canActivate: [],
        component: serviceComponets.ServiceSearchComponent,
        data: {
            title: 'Pesquisa de Serviços',
        } as SBRouteData,
    },
    {
        path: 'service-create',
        canActivate: [],
        component: serviceComponets.ServiceCreateUpdateComponent,
        data: {
            title: 'Cadastro de Serviços',
        } as SBRouteData,
    }
  
];

@NgModule({
    imports: [ServiceModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ServiceRoutingModule {}
