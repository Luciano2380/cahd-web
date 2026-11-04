import { Component, OnInit } from '@angular/core';
import { Pagination } from '@shared/models/pagination';
import { ServiceService } from '@features/service/services/service.service';
import { Vehicle } from '@features/vehicle/models/vehicle';
import { VehicleService } from '@features/vehicle/services/vehicle.service';
import { ServiceTypePrice } from '../../models/service-type-price';
import { ServiceTypeService } from '../../services/service-type.service';

@Component({
  selector: 'sb-service-type-search-value',
  templateUrl: './service-type-search-value.component.html',
  styleUrls: ['./service-type-search-value.component.scss']
})
export class ServiceTypeSearchValueComponent implements OnInit {
  vehicles?: Vehicle[] = [];
  idVehicle?: number;
  pageSize = 10;
  page = 1;
  collectionSize?: number;
  prices?: ServiceTypePrice[] = [];
  messageVehicle = ''
  errorVehicle = false;
  constructor(private serviceTypeService: ServiceTypeService, private vehicleService: VehicleService) { }
  ngOnInit(): void {
    this.loadingVehicles();
  }

  search() {
    if (this.validateForm()) {
      this.pagination();
    }

  }

  pagination() {
    this.serviceTypeService.findAllPricesVehicles(this.idVehicle, (this.page - 1)).
      subscribe((pageServiceTypePrice: Pagination<ServiceTypePrice>) => {
        this.prices = pageServiceTypePrice.contents;
        this.collectionSize = pageServiceTypePrice.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        this.prices = [];
        console.log(err.message);
      });
  }

  loadingVehicles() {
    this.vehicleService.listAll()
      .subscribe((vehicles: Vehicle[]) => {
        this.vehicles = vehicles
        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }

  validateForm(): boolean {
    let valid: Array<boolean> = [];
    let vehicle = this.idVehicle;
    if (vehicle===undefined) {
      valid.push(false);
      this.errorVehicle = true;
      this.messageVehicle = "Veículo é obrigatório!";
    } else {
      this.errorVehicle = false;
      this.messageVehicle = '';
    }
    return valid.length == 0;
  }

}
