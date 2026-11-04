import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@features/auth/models';
import { UserService } from '@features/auth/services';
import { CahdConstants } from '@core/constants/cahd.constants';
import jwt_decode from "jwt-decode";

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {

    user: User = {};
    
    constructor(public userService: UserService, private router: Router) { }
    ngOnInit() {
        this.userLogged();
    }

     userLogged() {
         const id = parseInt(this.decodePayloadJWT().sub)
         this.userService.findById(id!)
             .subscribe((user: User) => {
                 this.user = user;              
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
    finish(){
        localStorage.clear();
        this.router.navigate(['']);
    }
}
