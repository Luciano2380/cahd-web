import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/services';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    inputEmail: string = '';
    inputPassword: string = '';
    messageEmail = ''
    errorEmail = false;
    messagePassword = ''
    errorPassword = false;
    errorLogin = false;
    messageLogin = '';
    constructor(private router: Router, private authService: AuthService) { }
    ngOnInit() {
     
     }

    login() {
        if (this.validLogin()) {
            this.authentication();

        }
    }

    authentication() {
        this.authService.login(this.inputEmail, this.inputPassword)
            .subscribe(data => {
                this.errorLogin = false;
                this.messageEmail = '';
                this.router.navigate(['/service-performed/show-service-performed']);
                console.log("OK");
            }, (err: Error) => {
                this.errorLogin = true;
                alert('E-mail ou senha invalídos!');
                console.log(err.message);
            });
    }


    validLogin() {
        let valid: Array<boolean> = [];
        if (this.inputEmail === '') {
            valid.push(false);
            this.errorEmail = true;
            this.messageEmail = "E-mail é obrigatório!";
        } else {
            this.messageEmail = '';
            this.errorEmail = false;
        }
        if (this.inputPassword === '') {
            valid.push(false);
            this.errorPassword = true;
            this.messagePassword = "A senha é obrigatório!";
        } else {
            this.errorPassword = false;
            this.messagePassword = "";
        }
        return valid.length == 0;
    }
}
