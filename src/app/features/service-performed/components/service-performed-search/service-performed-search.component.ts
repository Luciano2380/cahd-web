import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { Service } from '@features/service/models/service';
import { ServiceService } from '@features/service/services/service.service';
import { ServicePerformance } from '../../models/service-performance';
import { ServicePerformedService } from '../../services/service-performed.service';

@Component({
  selector: 'sb-service-performed-search',
  templateUrl: './service-performed-search.component.html',
  styleUrls: ['./service-performed-search.component.scss']
})
export class ServicePerformedSearchComponent implements OnInit {

  pageSize = 10;
  page = 1;
  collectionSize?: number;
  servicesPerformances?: ServicePerformance[] = [];
  name = '';
  services: Service[] = [];
  idService?: number;
  record?: string = '';
  startDate?: any;
  endDate?: any;

  constructor(private servicePerformanceService: ServicePerformedService, private serviceService: ServiceService, private router: Router) {
    setInterval(() => {
      this.pagination();
    }, 100000);

    this.startDate = this.getCurrentDate();
    this.endDate = this.getCurrentDate();
  }

  ngOnInit(): void {    
    this.pagination();
    this.loadingServices();
  }

  search() {
    this.pagination();
  }
  loadingServices() {
    this.serviceService.listAllMenu()
      .subscribe((services: Service[]) => {
        this.services = services
        console.log("OK");
      }, (err: Error) => {
        console.log(err.message);
      });
  }

  pagination() {
    
    let idService: any = "";
    let endDate: any = "";
    let startDate: any = "";
    if (this.idService!==null && this.idService !== undefined) {
      idService = this.idService;
    }
    if (this.startDate !== undefined) {
      startDate = this.startDate;
    }
    if (this.endDate !== undefined) {
      endDate = this.endDate;
    }
    this.servicePerformanceService.findAll(idService, this.record, startDate, endDate, (this.page - 1)).
      subscribe((pageServiceType: Pagination<ServicePerformance>) => {
        this.servicesPerformances = pageServiceType.contents;
        this.collectionSize = pageServiceType.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        this.servicesPerformances=[];
        console.log(err.message);
      });
  }

  delete(service: ServicePerformance) {
    const conf = confirm("Deseja excluir o registro? ");
    if(conf){
      this.servicePerformanceService.delete(service.id).subscribe(data => {
        this.pagination();
        console.log("Ok");
      }, (err: Error) => {
        console.log(err.message);
      });
    }
  } 

  edit(id: number) {
    this.router.navigate(['/service-performed/service-performed-create'], { queryParams: { id: id } });
  }

  getCurrentDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    let monthValue = '';
    let dayValue = '';

    monthValue = ((month < 10) ? '0' : '').concat(month.toString())
    dayValue = ((day < 10) ? '0' : '').concat(day.toString())

    return year.toString().concat('-').concat(monthValue).concat('-').concat(dayValue);
}
print(id: number) {  
  this.servicePerformanceService.print(id).subscribe(
    () => {
      console.log('OK');
    }, (err: Error) => {     
      console.log(err.message);
    }
  );
}
}
