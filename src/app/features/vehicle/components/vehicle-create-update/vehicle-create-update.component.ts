import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'sb-vehicle-create-update',
  templateUrl: './vehicle-create-update.component.html',
  styleUrls: ['./vehicle-create-update.component.scss']
})
export class VehicleCreateUpdateComponent implements OnInit {

  vehicleForm: FormGroup;
  vehicle: Vehicle = {};

  name?: string;
  id?: number;
  messageName = ''
  errorName = false;
  messageSize = ''
  errorSize = false;
  size?: string;
  sizeVehicle?: any;

  constructor(private vehicleService: VehicleService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,) {
    this.vehicleForm = this.fb.group({});

  }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(params => {
      this.id = +params['id'] || undefined
    });
    if (this.id !== null || this.id !== undefined) {
      this.findbyId(this.id);
    }
    this.forms();
    this.loadingSizes();
  }

  forms() {
    this.vehicleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required)
    });
  }

  save(){
    if(this.validateForm()){
      this.saveVehicle();
    }
  }


  validateForm(): boolean {
    let valid: Array<boolean> = [];
    let name = this.vehicleForm.get('name');
    let size = this.vehicleForm.get('size');
    if (name?.value === '') {
      valid.push(false);
      this.errorName = true;
      this.messageName = "Nome do Veículo é obrigatório!";
    } else {
      this.name = name!.value;
      this.messageName = '';
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

  saveVehicle() {

    this.vehicle.id = this.id;
    this.vehicle.name = this.name;
    this.vehicle.size = this.size;

    if (this.vehicle.id !== undefined && this.vehicle.id !== null) {

      this.vehicleService.update(this.vehicle)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/vehicle/vehicle-type-search']]);
            alert("Registro alterado com sucesso");
            console.log("OK");
          },
          (err: Error) => {
            alert("Erro ao alterar o registro");
            console.log(err.message);
          }
        );
    } else {
      this.vehicleService.save(this.vehicle)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/vehicle/vehicle-type-search']]);
            alert("Registro salvar com sucesso");
          },
          (err: Error) => {
            alert("Erro ao salvar o registro");
            console.log(err.message);
          }
        );
    }

  }

  findbyId(id?: number) {
    this.vehicleService.findById(id!)
      .subscribe((vehicle: Vehicle) => {
        this.id = vehicle.id;
        this.vehicleForm.get('name')?.setValue(vehicle.name);
        this.vehicleForm.get('size')?.setValue(vehicle.size);
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
    this.vehicleForm.reset();
    this.vehicle = {};
    this.size = '';
    this.messageSize = ''
    this.errorSize = false;
    this.messageName = ''
    this.errorName = false;
    this.name = '';
  }

}
