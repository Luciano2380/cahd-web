import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { Service } from '@features/service/models/service';
import { ServiceService } from '@features/service/services/service.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ServicePerformance } from '../../models/service-performance';
import { ServicePerformedService } from '../../services/service-performed.service';

@Component({
  selector: 'sb-service-performed-report',
  templateUrl: './service-performed-report.component.html',
  styleUrls: ['./service-performed-report.component.scss']
})
export class ServicePerformedReportComponent implements OnInit {
  pageSize = 10;
  page = 1;
  collectionSize?: number;
  servicesPerformances?: ServicePerformance[] = [];
  services: Service[] = [];
  idService?: number;
  record?: string = '';
  startDate?: Date;
  endDate?: Date;

  constructor(private servicePerformanceService: ServicePerformedService, private serviceService: ServiceService) {
    this.pagination();
  }

  ngOnInit(): void {
    this.loadingServices();
    this.pagination();
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
    if (this.idService !== undefined) {
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
        this.servicesPerformances = [];
        console.log(err.message);
      });
  }


  generatePdf() {
    let idService: any = "";
    let endDate: any = "";
    let startDate: any = "";
    if (this.idService !== undefined) {
      idService = this.idService;
    }
    if (this.startDate !== undefined) {
      startDate = this.startDate;
    }
    if (this.endDate !== undefined) {
      endDate = this.endDate;
    }
    this.servicePerformanceService.report(idService, startDate, endDate)
      .subscribe((response) => {
        let blob = new Blob([response], { type: 'application/pdf' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        // link.href = downloadURL;
        link.setAttribute("target", "_blank");
        link.setAttribute("href", downloadURL);
        link.setAttribute("download", "relatorioServicoExecutado_"+new Date().toLocaleTimeString()+".pdf");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();

      }, (err: Error) => {       
        console.log(err.message);
      });
  }

}
