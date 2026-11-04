import { SBRouteData } from '@layout/models';
import { NavigationService } from '@layout/services';
import { of } from 'rxjs';

export const NavigationServiceStub: Partial<NavigationService> = {
    sideNavVisible$: () => of(true),
    toggleSideNav: (visibility?: boolean) => {},
    routeData$: () => of({} as SBRouteData),
    currentURL$: () => of('TEST_URL'),
};
