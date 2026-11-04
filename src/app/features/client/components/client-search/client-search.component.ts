import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { Client } from '../../models/client';
import { ClientServiceService } from '../../services/client-service.service';

@Component({
  selector: 'sb-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss']
})
export class ClientSearchComponent implements OnInit {

  pageSize = 10;
  page = 1;
  collectionSize?: number;
  clients?: Client[] = [];
  name = '';

  constructor(private clientService: ClientServiceService, private router: Router) {
    this.pagination();
  }

  ngOnInit(): void {
    this.pagination();
  }

  search() {
    this.pagination();
  }

  pagination() {
    this.clientService.findAll(this.name, '', (this.page - 1)).
      subscribe((pageClient: Pagination<Client>) => {
        this.clients = pageClient.contents;
        this.collectionSize = pageClient.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        alert("O Registro não encontrado!")
        console.log(err.message);
      });
  }

  deleteClient(client: Client) {
    const conf = confirm("Deseja excluir o registro? ");
    if(conf){
      this.clientService.delete(client.id).subscribe(data => {
        this.pagination();
        alert("O Registro foi excluido com sucesso!");
        console.log("Ok");
      }, (err: Error) => {
        alert("O Registro não pode ser excluido!");
        console.log(err.message);
      });
    }
    
  }

  edit(id: number) {
    this.router.navigate(['/client/client-create'],{state: { id: id }} );
  }  

  descriptionPerson(t: string) {
    let person = "";
    switch (t) {
      case "PF": {
        person = "Pessoa Física";
        break;
      }
      case "PJ": {
        person = "Pessoa Jurídica";
        break;
      }      
      default: {
        person = "";
        break;
      }
    }
    return person;
  }

}
