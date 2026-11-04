import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '@features/auth/models';
import { UserService } from '@features/auth/services';
import { CahdConstants } from '@core/constants/cahd.constants';
import { SBRouteData, SideNavItem } from '@layout/models';
import jwt_decode from "jwt-decode";

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    menu?: string='';
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;

    expanded = false;
    routeData!: SBRouteData;

    user: User = {};
    
    constructor(private userService: UserService) {         
    }
    ngOnInit() {
        this.userLogged();       
    }

     userLogged() {
         const id = parseInt(this.decodePayloadJWT().sub)
         this.userService.findById(id!)
             .subscribe((user: User) => {
                 this.user = user; 
                 if(user!==null && user!==undefined && user.profile==='colaborador'){
                    this.menu='Administrativo';
                }
                 const userJson = JSON.stringify(user);
                 localStorage.setItem(CahdConstants.USER_LOGGED,userJson);
                 console.log("OK");
             }, (err: Error) => {
                 console.log(err.message);
             });

     }
     public decodePayloadJWT(): any {
         const decode = localStorage.getItem(CahdConstants.TOKEN);
         try {
             if (decode != null) {
                 return jwt_decode(decode);
            }
         } catch (Error) {
             return null;
         }
     }
  
}
