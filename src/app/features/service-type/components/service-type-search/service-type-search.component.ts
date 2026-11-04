import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SizeEnum } from '@shared/enums/size-enum';
import { Pagination } from '@shared/models/pagination';
import { ServiceType } from '../../models/service-type';
import { ServiceTypeService } from '../../services/service-type.service';

@Component({
  selector: 'sb-service-type-search',
  templateUrl: './service-type-search.component.html',
  styleUrls: ['./service-type-search.component.scss']
})
export class ServiceTypeSearchComponent implements OnInit {
  pageSize = 10;
  page = 1;
  collectionSize?: number;
  servicesTypes?: ServiceType[] = [];
  name = '';

  constructor(private serviceTypeService: ServiceTypeService, private router: Router) {
    this.pagination();
  }

  ngOnInit(): void {
    this.pagination();
  }

  search() {
    this.pagination();
  }

  pagination() {
    this.serviceTypeService.findAll(this.name, '', (this.page - 1)).
      subscribe((pageServiceType: Pagination<ServiceType>) => {
        this.servicesTypes = pageServiceType.contents;
        this.collectionSize = pageServiceType.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        alert("O Registro não encontrado!");
        console.log(err.message);
      });
  }

  deleteServiceType(serviceType: ServiceType) {  
    const conf = confirm("Deseja excluir o registro? ");
    if(conf){
      this.serviceTypeService.delete(serviceType.id).subscribe(data => {
        alert("O Registro foi excluido com sucesso!");
        console.log("Ok");
      }, (err: Error) => {
        alert("O Registro não pode ser excluido!");
        console.log(err.message);
      });
    }
  }

  edit(id: number) {
    this.router.navigate(['/service-type/service-type-create'], { queryParams: { id: id } });
  }

  descriptionSize(t: string) {
    let size = "";
    switch (t) {
      case SizeEnum.LARGE: {
        size = "Grande";
        break;
      }
      case SizeEnum.MEDIUM: {
        size = "Médio";
        break;
      }
      case SizeEnum.SMALL: {
        size = "Pequeno";
        break;
      }
      default: {
        size = "";
        break;
      }
    }
    return size;
  }

}
