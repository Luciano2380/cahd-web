import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'sb-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit {
  pageSize = 10;
  page = 1;
  collectionSize?: number;
  vehicles?: Vehicle[] = [];
  name = '';

  constructor(private vehicleService: VehicleService, private router: Router) {
    this.pagination();
  }

  ngOnInit(): void {
    this.pagination();
  }

  search() {
    this.pagination();
  }

  pagination() {
    this.vehicleService.findAll(this.name, '', (this.page - 1)).
      subscribe((pageServiceType: Pagination<Vehicle>) => {
        this.vehicles = pageServiceType.contents;
        this.collectionSize = pageServiceType.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        this.vehicles=[];
        alert("O Registro não encontrado!");
        console.log(err.message);
      });
  }

  delete(vehicle: Vehicle) {  
    const conf = confirm("Deseja excluir o registro? ");
    if(conf){
      this.vehicleService.delete(vehicle.id).subscribe(data => {
        alert("O Registro foi excluido com sucesso!");
        console.log("Ok");
      }, (err: Error) => {
        
        alert("O Registro não pode ser excluido!");
        console.log(err.message);
      });
    }
  }

  edit(id: number) {
    this.router.navigate(['/vehicle/vehicle-create'], { queryParams: { id: id } });
  }


}
