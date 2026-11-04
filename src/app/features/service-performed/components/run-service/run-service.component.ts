import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from '@features/color/models/color';
import { ColorService } from '@features/color/services/color.service';
import { Service } from '@features/service/models/service';
import { ServiceService } from '@features/service/services/service.service';
import { Vehicle } from '@features/vehicle/models/vehicle';
import { VehicleService } from '@features/vehicle/services/vehicle.service';
import { VehicleRoutingModule } from '@features/vehicle/vehicle-routing.module';

@Component({
  selector: 'sb-run-service',
  templateUrl: './run-service.component.html',
  styleUrls: ['./run-service.component.scss']
})
export class RunServiceComponent implements OnInit {

  executeForm: FormGroup;
  vehicle?: Vehicle = {};
  color?: Color = {};
  size?: string;
  colors?: Color[] = [];
  vehicles?: Vehicle[] = [];
  sizeVehicle?: any;
  service: Service = {};
  messageVehicle = ''
  errorVehicle = false;
  messageColor = ''
  errorColor = false;
  messageSize = ''
  errorSize = false;

  constructor(private vehicleService: VehicleService, private colorService: ColorService, private serviceService: ServiceService,
    private fb: FormBuilder, private router: Router, private activeRouter: ActivatedRoute) {
    this.executeForm = this.fb.group({});
    this.service = this.router.getCurrentNavigation()?.extras.state?.service;
  }

  ngOnInit(): void {
    this.loadingVehicles();
    this.loadingColors();
    this.loadingSizes();
    this.forms();
  }
  forms() {
    this.executeForm = this.fb.group({
      vehicle: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required)
    });
  }

  execute() {
    if (this.validateForm()) {
      this.sendServicePerformance();
    }

  }

  validateForm(): boolean {
    let valid: Array<boolean> = [];
    let vehicle = this.executeForm.get('vehicle');
    let color = this.executeForm.get('color');
    let size = this.executeForm.get('size');    
    if (vehicle?.value === '') {
      valid.push(false);
      this.errorVehicle = true;
      this.messageVehicle = "Veículo é obrigatório!";
    } else {
      this.vehicle = vehicle!.value;
      this.messageVehicle = '';
    }
    if (color?.value === '') {
      valid.push(false);
      this.errorColor = true;
      this.messageColor = "A cor do veículo é obrigatório!";
    } else {
      this.color = color!.value;
      this.messageColor = '';
    }

    if (size?.value === '') {
      valid.push(false);
      this.errorSize = true;
      this.messageSize = "O tamanho do Veículo é obrigatório!";
    } else {
      this.size = size!.value;
      this.messageSize = '';
    }   
    return valid.length == 0;
  }

  sendServicePerformance() {    
    this.router.navigate(['/service-performed/service-performed-create'],
      { state: { vehicle: this.vehicle, color: this.color, service: this.service }, queryParams: { size: this.size } });
  }

  getSize() {
    let sizeVehicle: Vehicle = this.executeForm.get('vehicle')?.value;
    if (sizeVehicle !== null && sizeVehicle !== undefined) {
      this.executeForm.get('size')?.setValue(sizeVehicle.size);
    }

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

  loadingColors() {
    this.colorService.listAll()
      .subscribe((colors: Color[]) => {
        this.colors = colors
        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }
  loadingSizes() {
    this.sizeVehicle = [
      { id: 'P', name: 'Pequeno' },
      { id: 'M', name: 'Médio' },
      { id: 'G', name: 'Grande' }
    ];
  }

  clean() {
    this.executeForm.reset();
    this.vehicle = {};
    this.color = {};
    this.size='';    
    this.messageVehicle = ''
    this.errorVehicle = false;
    this.messageColor = ''
    this.errorColor = false;
    this.messageSize = ''
    this.errorSize = false;
  }



}
