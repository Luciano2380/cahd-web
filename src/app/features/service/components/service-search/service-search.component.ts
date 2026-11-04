import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'sb-service-search',
  templateUrl: './service-search.component.html',
  styleUrls: ['./service-search.component.scss']
})
export class ServiceSearchComponent implements OnInit {
  pageSize = 10;
  page = 1;
  collectionSize?: number;
  services?: Service[] = [];
  name = '';

  constructor(private serviceService: ServiceService, private router: Router) {
    this.pagination();
  }

  ngOnInit(): void {
    this.pagination();
  }

  search() {
    this.pagination();
  }

  pagination() {
    this.serviceService.findAll(this.name, '', (this.page - 1)).
      subscribe((pageService: Pagination<Service>) => {
        this.services = pageService.contents;
        this.collectionSize = pageService.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        alert("O Registro não encontrado!");
        console.log(err.message);
      });
  }

  deleteService(service: Service) {
   
    const conf = confirm("Deseja excluir o registro? ");
    if(conf){
      this.serviceService.delete(service.id).subscribe(data => {
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
    this.router.navigate(['/service/service-create'], { queryParams: { id: id } });
  }  

}
