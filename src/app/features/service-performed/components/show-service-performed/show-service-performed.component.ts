import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '@features/service/models/service';
import { ServiceService } from '@features/service/services/service.service';

@Component({
  selector: 'sb-show-service-performed',
  templateUrl: './show-service-performed.component.html',
  styleUrls: ['./show-service-performed.component.scss']
})
export class ShowServicePerformedComponent implements OnInit {
  services: Service[] = [];
  service: Service = {};
  constructor(private serviceService: ServiceService,private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadingServices();
  }

  redirect(service: Service) {
    this.router.navigate(['/service-performed/run-service-performed'], {state:{service: service}});
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

}
