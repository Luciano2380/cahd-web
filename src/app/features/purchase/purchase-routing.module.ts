/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@layout/models';

/* Module */
import { PurchaseModule } from './purchase.module';

/* Components */
import * as purchaseComponets from './components';


/* Routes */
export const ROUTES: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'purchase-search',
    },
    {
        path: 'purchase-search',
        canActivate: [],
        component: purchaseComponets.PurchaseSearchComponent,
        data: {
            title: 'Pesquisa de Compras',
        } as SBRouteData,
    },
    {
        path: 'purchase-create',
        canActivate: [],
        component: purchaseComponets.PurchaseCreateUpdateComponent,
        data: {
            title: 'Cadastro de Compras',
        } as SBRouteData,
    },
    {
        path: 'purchase-report',
        canActivate: [],
        component: purchaseComponets.PurchaseReportComponent,
        data: {
            title: 'Relatório de Compras',
        } as SBRouteData,
    }
  
];

@NgModule({
    imports: [PurchaseModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PurchaseRoutingModule {}
