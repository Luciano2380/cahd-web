import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('@features/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('@features/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    //Pages   
    {
        path: 'client',
        loadChildren: () =>
            import('@features/client/client-routing.module').then(m => m.ClientRoutingModule),
    },
    {
        path: 'color',
        loadChildren: () =>
            import('@features/color/color-routing.module').then(m => m.ColorRoutingModule),
    },
    {
        path: 'company',
        loadChildren: () =>
            import('@features/company/company-routing.module').then(m => m.CompanyRoutingModule),
    },
    {
        path: 'purchase',
        loadChildren: () =>
            import('@features/purchase/purchase-routing.module').then(m => m.PurchaseRoutingModule),
    },
    {
        path: 'service',
        loadChildren: () =>
            import('@features/service/service-routing.module').then(m => m.ServiceRoutingModule),
    },
    {
        path: 'service-performed',
        loadChildren: () =>
            import('@features/service-performed/service-performed-routing.module').then(m => m.ServicePerformedRoutingModule),
    },
    {
        path: 'service-type',
        loadChildren: () =>
            import('@features/service-type/service-type-routing.module').then(m => m.ServiceTypeRoutingModule),
    },
    {
        path: 'vehicle',
        loadChildren: () =>
            import('@features/vehicle/vehicle-routing.module').then(m => m.VehicleRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('@features/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
