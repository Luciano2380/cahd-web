import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@features/auth/models';
import { UserService } from '@features/auth/services';


@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    userForm: FormGroup;
    user: User = {};

    name?: string;
    id?: number;
    email?: string;
    password?: string;
    errorEmail=false;
    errorPassword? = false;
    messagePassword?: string;
    messageName = ''
    errorName = false;
    phone?: string;
    gender?: string;
    profile?: string;
    messagePhone = ''
    errorPhone = false;
    messageGender = ''
    errorGender = false;
    messageProfile = ''
    errorProfile = false;
    genders?: any;
    profiles?: any;
    messageEmail='';
    


    constructor(
        private router: Router,
        private fb: FormBuilder,
        private activeRouter: ActivatedRoute,
        private userService: UserService) {
        this.userForm = this.fb.group({});
        const state = this.router.getCurrentNavigation()?.extras.state;
        this.id = state?.id;
    }

    ngOnInit(): void {
      this.activeRouter.queryParams.subscribe(params => {
        this.id = +params['id'] || undefined
      });
      if (this.id !== null || this.id !== undefined) {
        this.findbyId(this.id);
      }
        this.forms();
        this.loadGenders();
        this.loadProfiles();
    }

    forms() {
        this.userForm = this.fb.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            profile: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required)

        });
    }

    validateForm(): boolean {
        let valid: Array<boolean> = [];
        let name = this.userForm.get('name');
        let phone = this.userForm.get('phone');
        let gender = this.userForm.get('gender');
        let profile = this.userForm.get('profile');
        let password = this.userForm.get('password');
        let email = this.userForm.get('email');


        if (name?.value === '') {
            valid.push(false);
            this.errorName = true;
            this.messageName = "Nome é obrigatório!";
        } else {
            this.name = name!.value;
            this.messageName = '';
        }

        if (phone?.value === '') {
            valid.push(false);
            this.errorPhone = true;
            this.messagePhone = "Telefone  é obrigatório!";
        } else {
            this.phone = phone!.value;
            this.messagePhone = '';
        }

        if (email?.value === '') {
            valid.push(false);
            this.errorEmail = true;
            this.messageEmail = "Email  é obrigatório!";
        } else {
            this.email = email!.value;
            this.messageEmail = '';
        }

        if (gender?.value === '') {
            valid.push(false);
            this.errorGender = true;
            this.messageGender = "Sexo é obrigatório!";
        } else {
            this.gender = gender!.value;
            this.messageGender = '';
        }

        if (profile?.value === '') {
            valid.push(false);
            this.errorProfile = true;
            this.messageProfile = "Perfil  é obrigatório!";
        } else {
            this.profile = profile!.value;
            this.messageProfile = '';
        }

        if (password?.value === '') {
            valid.push(false);
            this.errorPassword = true;
            this.messagePassword = "Senha é obrigatório!";
        } else if (password?.value.length<5) {
            valid.push(false);
            this.errorPassword = true;
            this.messagePassword = "Senha tem que no minímo 6 dígitos!";
        }
        else {
            this.password = password!.value;
            this.messageName = '';
        }
        return valid.length == 0;
    }
    save(){
        if(this.validateForm()){
            this.saveUser();

        }
    }

    saveUser() {
        this.user.id = this.id;
        this.user.name = this.name;
        this.user.phone = this.phone;
        this.user.photoLink = this.profile;
        this.user.email = this.email;
        this.user.gender = this.gender;
        this.user.password = this.password;     
       
    
        if (this.user.id !== undefined && this.user.id !== null) {          
          this.userService.update(this.user)
            .subscribe(
              () => {               
                this.router.navigate([['/auth/login']]);
                alert("Usuario alterado com Sucesso");
              },
              (err: Error) => {
                alert("Erro ao registrar o Usuário");
                this.router.navigate([['/auth/login']]);
                console.log(err.message);
              }
            );
        } else {
          
          this.userService.save(this.user)
            .subscribe(
              () => {                
                this.router.navigate([['/auth/login']]);
                alert("Usuario registrado com Sucesso");
              },
              (err: Error) => {
                alert("Erro ao registrar o Usuário");
                this.router.navigate([['/auth/login']]);
                console.log(err.message);
              }
            );
        }
    
      }

      findbyId(id?: number) {
        this.userService.findById(id!)
          .subscribe((client: User) => {
            this.id = client.id;
            this.userForm.get('name')?.setValue(client.name);
            this.userForm.get('phone')?.setValue(client.phone);
            this.userForm.get('email')?.setValue(client.email);
            this.userForm.get('profile')?.setValue(client.photoLink);  
            this.userForm.get('gender')?.setValue(client.gender);        
    
            console.log("OK");
          }, (err: Error) => {
    
            console.log(err.message);
          });
      }

      loadGenders() {
        this.genders = [
          { id: 'M', name: 'Masculino' },
          { id: 'F', name: 'Feminino' }
        ];
      }
      loadProfiles() {
        this.profiles = [
          { id: 'administrador', name: 'Administrador' },
          { id: 'colaborador', name: 'Colaborador' }
        ];
      }
    

}
