/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Third Party */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@shared/icons/icons.module';

const thirdParty = [IconsModule, NgbModule];

/* Containers */
import * as sharedContainers from './containers';

/* Components */
import * as sharedComponents from './components';

/* Guards */
import * as sharedGuards from './guards';

/* Services */
import * as sharedServices from './services';
import * as authServices from '@features/auth/services';

@NgModule({
    imports: [CommonModule, RouterModule, ...thirdParty],
    providers: [...sharedServices.services, ...authServices.services, ...sharedGuards.guards],
    declarations: [...sharedContainers.containers, ...sharedComponents.components],
    exports: [...sharedContainers.containers, ...sharedComponents.components, ...thirdParty],
})
export class SharedModule {}
