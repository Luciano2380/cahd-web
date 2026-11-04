/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@layout/models';

/* Module */
import { CompanyModule } from './company.module';
/* Components */
import * as companyComponets from './components';


/* Guards */


/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'company-search',
    },
    {
        path: 'company-search',
        canActivate: [],
        component: companyComponets.CompanySearchComponent,
        data: {
            title: 'Pesquisa de Empresas',
        } as SBRouteData,
    },
    {
        path: 'company-create',
        canActivate: [],
        component: companyComponets.CompanyCreateUpdateComponent,
        data: {
            title: 'Cadastro de Empresas',
        } as SBRouteData,
    }
   
];

@NgModule({
    imports: [CompanyModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class CompanyRoutingModule {}
