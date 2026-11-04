/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@layout/models';

/* Module */
import { ClientModule } from './client.module';

import * as clientComponets from './components';


/* Routes */
export const ROUTES: Routes = [   
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'client-search',
    },
    {
        path: 'client-search',
        canActivate: [],
        component: clientComponets.ClientSearchComponent,
        data: {
            title: 'Pesquisa de Clientes',
        } as SBRouteData,
    },
    {
        path: 'client-create',
        canActivate: [],
        component: clientComponets.ClientCreateUpdateComponent,
        data: {
            title: 'Cadastro de Clientes',
        } as SBRouteData,
    }
    
];

@NgModule({
    imports: [ClientModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
