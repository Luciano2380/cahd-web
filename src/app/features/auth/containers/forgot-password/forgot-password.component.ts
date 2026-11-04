import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@features/auth/models';
import { UserService } from '@features/auth/services';
import { Pagination } from '@shared/models/pagination';

@Component({
    selector: 'sb-forgot-password',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    pageSize = 10;
    page = 1;
    collectionSize?: number;
    users?: User[] = [];
    name = '';
  
    constructor(private userService: UserService, private router: Router) {
      this.pagination();
    }
  
    ngOnInit(): void {
      this.pagination();
    }
  
    search() {
      this.pagination();
    }
  
    pagination() {
      this.userService.findAll(this.name, '', (this.page - 1)).
        subscribe((pageServiceType: Pagination<User>) => {
          this.users = pageServiceType.contents;
          this.collectionSize = pageServiceType.totalRecords;
  
          console.log("OK");
        }, (err: Error) => {
          this.users=[];
          alert("O Registro não encontrado!");
          console.log(err.message);
        });
    }
  
    delete(user: User) {  
      const conf = confirm("Deseja excluir o registro? ");
      if(conf){
        this.userService.delete(user.id).subscribe(data => {
          alert("O Registro foi excluido com sucesso!");
          console.log("Ok");
        }, (err: Error) => {
          alert("O Registro não pode ser excluido!");
          console.log(err.message);
        });
      }
    }
  
    edit(id: number) {
      this.router.navigate(['/auth/register'], { queryParams: { id: id } });
    }
  
}
