import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Color } from '@features/color/models/color';
import { ColorService } from '@features/color/services/color.service';
import { Vehicle } from '@features/vehicle/models/vehicle';
import { VehicleService } from '@features/vehicle/services/vehicle.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../models/client';
import { ClientVehicle } from '../../models/client-vehicle';
import { ClientServiceService } from '../../services/client-service.service';

@Component({
  selector: 'sb-client-create-update',
  templateUrl: './client-create-update.component.html',
  styleUrls: ['./client-create-update.component.scss']
})
export class ClientCreateUpdateComponent implements OnInit {
  closeResult = '';
  clientForm: FormGroup;
  client: Client = {};

  name?: string;
  id?: number;
  phone?: string;
  email?: string;
  personType?: string;
  cpfCnpj?: string;
  gender?: string;
  messageName = ''
  errorName = false;
  messagePhone = ''
  errorPhone = false;
  clientVehicles: Array<ClientVehicle> = [];
  colors?: Color[] = [];
  vehicles?: Vehicle[] = [];
  isCpf?: boolean = false;
  isCnpj?: boolean = false;
  male?: string;
  female?: string;
  messageVehicle = ''
  errorVehicle = false;
  messageColor = ''
  errorColor = false;
  licensePlate?: string;
  vehicle?: Vehicle = {};
  color?: Color = {};
  messageLicensePlate = '';
  errorLicensePlate = false;
  genders?: any;
  personTypes?: any;
  modalRef?: NgbModalRef;

  constructor(private modalService: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private colorService: ColorService,
    private clientService: ClientServiceService) {
    this.clientForm = this.fb.group({});
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.id = state?.id;
  }

  ngOnInit(): void {
    if (this.id !== null || this.id !== undefined) {
      this.findbyId(this.id);
    }
    this.forms();
    this.loadingVehicles();
    this.loadingColors();
    this.loadGenders();
    this.loadPersonTypes();
  }

  forms() {
    this.clientForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      personType: new FormControl('', Validators.required),
      pj: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)

    });
  }

  validateForm(): boolean {
    let valid: Array<boolean> = [];
    let name = this.clientForm.get('name');
    let phone = this.clientForm.get('phone');


    if (name?.value === '') {
      valid.push(false);
      this.errorName = true;
      this.messageName = "Nome do Cliente é obrigatório!";
    } else {
      this.name = name!.value;
      this.messageName = '';
    }
    if (phone?.value === '') {
      valid.push(false);
      this.errorPhone = true;
      this.messagePhone = "Telefone do Cliente é obrigatório!";
    } else {
      this.phone = phone!.value;
      this.messagePhone = '';
    }


    return valid.length == 0;
  }

  save() {
    if (this.validateForm()) {
      this.saveClient();
    }

  }

  saveClient() {
    this.client.id = this.id;
    this.client.name = this.name;
    this.client.phone = this.phone;
    this.client.personType = this.clientForm.get('personType')?.value;
    this.client.email = this.clientForm.get('email')?.value;
    this.client.gender = this.clientForm.get('gender')?.value;
    if (this.client.personType === 'PF') {
      this.client.cpfCnpj = this.clientForm.get('cpf')?.value;;
    } else if (this.client.personType === 'PJ') {
      this.client.cpfCnpj = this.clientForm.get('cnpj')?.value;;
    }  
    this.client.clientVehicles = this.clientVehicles;

    if (this.client.id !== undefined && this.client.id !== null) {
      this.clientService.update(this.client)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/service-type/service-type-search']]);
            alert("Registro alterado com sucesso");
          },
          (err: Error) => {
            alert("Erro ao alterar o Registro");
            console.log(err.message);
          }
        );
    } else {
      this.clientService.save(this.client)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/service-type/service-type-search']]);
            alert("Registro salvo com sucesso");
          },
          (err: Error) => {
            alert("Erro ao salvar o Registro");
            console.log(err.message);
          }
        );
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

  open(content: any) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getPersonTypes() {
    let personKind = this.clientForm.get('personType')?.value;
    if (personKind !== undefined) {
      if (personKind === "PF") {
        this.isCpf = true;
        this.isCnpj = false;
        this.clientForm.get('cnpj')?.setValue('');
      } else if (personKind === "PJ") {
        this.isCpf = false;
        this.isCnpj = true;
        this.clientForm.get('cpf')?.setValue('');
        this.clientForm.get('gender')?.setValue('');
      } else {
        this.isCpf = false;
        this.isCnpj = false;
        this.clientForm.get('cpf')?.setValue('');
        this.clientForm.get('cnpj')?.setValue('');
        this.clientForm.get('gender')?.setValue('');
      }

    }
  }



  findbyId(id?: number) {
    this.clientService.findById(id!)
      .subscribe((client: Client) => {
        this.id = client.id;
        this.clientForm.get('name')?.setValue(client.name);
        this.clientForm.get('phone')?.setValue(client.phone);
        this.clientForm.get('email')?.setValue(client.email);
        this.clientForm.get('personType')?.setValue(client.personType);
        this.clientForm.get('gender')?.setValue(client.gender);
        if (client.personType !== null) {
          if (client.personType === 'PF') {
            this.isCpf = true;
            this.isCnpj = false;
            this.clientForm.get('cpf')?.setValue(client.cpfCnpj);
          } else {
            this.isCpf = false;
            this.isCnpj = true;
            this.clientForm.get('cnpj')?.setValue(client.cpfCnpj);
          }

        } else {
          this.isCpf = false;
          this.isCnpj = false;
        }
        this.clientVehicles = client.clientVehicles!;

        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }


  addVehicles() {
    let valid: Array<boolean> = [];
    if (this.licensePlate === '') {
      valid.push(false);
      this.errorLicensePlate = true;
      this.messageLicensePlate = "Placa é obrigatório!";
    } else {
      this.messageLicensePlate = '';
      this.errorLicensePlate = false;
    }
    if (this.vehicle === null || this.vehicle === undefined) {
      valid.push(false);
      this.errorVehicle = true;
      this.messageVehicle = "Veiculo é obrigatório!";
    } else {
      this.errorVehicle = false;
      this.messageVehicle = "";
    }
    if (this.color === null || this.color === undefined) {
      valid.push(false);
      this.errorColor = true;
      this.messageColor = "Cor é obrigatório!";
    } else {
      this.errorColor = false;
      this.messageColor = "";
    }
    if (valid.length == 0) {
      const type: ClientVehicle = {};
      type.licensePlate = this.licensePlate;
      type.vehicle = this.vehicle as Vehicle;
      type.color = this.color as Color;
      this.clientVehicles.push(type);
      this.modalRef?.close();
    }
  }
  deleteClientVehicle(vehicle: ClientVehicle) {
    var index = this.clientVehicles.indexOf(vehicle);
    if (index > -1) {
      this.clientVehicles.splice(index, 1);
    }
  }
  clean() {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.personType = '';
    this.cpfCnpj = '';
    this.gender = '';
    this.messageName = ''
    this.errorName = false;
    this.messagePhone = ''
    this.errorPhone = false;
    this.clientVehicles = [];
    this.isCpf = false;
    this.isCnpj = false;
    this.messageVehicle = ''
    this.errorVehicle = false;
    this.messageColor = ''
    this.errorColor = false;
    this.licensePlate = '';
    this.vehicle = {};
    this.color = {};
    this.messageLicensePlate = '';
    this.errorLicensePlate = false;
  }

  loadGenders() {
    this.genders = [
      { id: 'M', name: 'Masculino' },
      { id: 'F', name: 'Feminino' }
    ];
  }
  loadPersonTypes() {
    this.personTypes = [
      { id: 'PF', name: 'Pessoa Física' },
      { id: 'PJ', name: 'Pessoa Jurídica' }
    ];
  }



}
