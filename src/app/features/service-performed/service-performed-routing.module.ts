/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@layout/models';

/* Module */
import { ServicePerformedModule } from './service-performed.module';

/* Components */
import * as servicePerformedComponets from './components';



/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'service-performed-search',
    },
    {
        path: 'service-performed-search',
        canActivate: [],
        component: servicePerformedComponets.ServicePerformedSearchComponent,
        data: {
            title: 'Pesquisa de Serviços Executados',
        } as SBRouteData,
    },
    {
        path: 'service-performed-create',
        canActivate: [],
        component: servicePerformedComponets.ServicePerformedCreateUpdateComponent,
        data: {
            title: 'Cadastro de Serviços Executados',
        } as SBRouteData,
    },
    {
        path: 'service-performed-report',
        canActivate: [],
        component: servicePerformedComponets.ServicePerformedReportComponent,
        data: {
            title: 'Relatório de Serviços Executados',
        } as SBRouteData,
    },
    {
        path: 'show-service-performed',
        canActivate: [],
        component: servicePerformedComponets.ShowServicePerformedComponent,
        data: {
            title: 'Exibir de Serviços Executados',
        } as SBRouteData,
    },
    {
        path: 'run-service-performed',
        canActivate: [],
        component: servicePerformedComponets.RunServiceComponent,
        data: {
            title: 'Executar Serviço',
        } as SBRouteData,
    }
   
];

@NgModule({
    imports: [ServicePerformedModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ServicePerformedRoutingModule {}
