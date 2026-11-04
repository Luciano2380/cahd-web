import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceType } from '@features/service-type/models/service-type';
import { ServiceTypePrice } from '@features/service-type/models/service-type-price';
import { ServiceTypeService } from '@features/service-type/services/service-type.service';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'sb-service-create-update',
  templateUrl: './service-create-update.component.html',
  styleUrls: ['./service-create-update.component.scss']
})
export class ServiceCreateUpdateComponent implements OnInit {

  complements: Array<ServiceType> = [];
  chosenComplements: Array<number> = [];
  name?: string;
  id?: number;
  messageName = ''
  errorName = false;
  messageComplements = ''
  errorComplement = false;
  serviceForm: FormGroup;
  menu: boolean = false;
  showClient: boolean = false;
  dynamicServiceType: boolean = false;
  service: Service = {};
  enableTypes?: boolean = true;

  constructor(private serviceService: ServiceService,
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private serviceTypeService: ServiceTypeService
  ) {
    this.serviceForm = this.fb.group({});
    this.loadingServiceType();
  }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(params =>{
      this.id = +params['id'] || undefined
    });
    if(this.id!==null || this.id!==undefined){
      this.findbyId(this.id);
    }   
    this.loadingServiceType()
    this.forms();
  }

  forms() {
    this.serviceForm = this.fb.group({
      name: new FormControl('', Validators.required),
      menu: new FormControl('', Validators.required),
      showClient: new FormControl('', Validators.required),
      dynamicServiceType: new FormControl('', Validators.required),
      chosenComplements: new FormControl('', Validators.required)
    });
  }

  save() {
    if (this.validateForm()) {
      this.saveService();
    }

  }
  saveService() {
    this.service.id = this.id;
    this.service.name = this.name;
    this.service.menu = this.menu;
    this.service.dynamicServiceType = this.dynamicServiceType;
    this.service.showClient = this.showClient;
    this.service.serviceTypes = this.chosenServiceType();

    if (this.service.id !== undefined && this.service.id !== null) {

      this.serviceService.update(this.service)
        .subscribe(
          () => {

            this.router.navigate([['/service/service-search']]);
            console.log("OK");
          },
          (err: Error) => {
            console.log(err.message);
          }
        );
    } else {     
      this.serviceService.save(this.service)
        .subscribe(
          () => {

            this.router.navigate([['/service/service-search']]);

          },
          (err: Error) => {
            console.log(err.message);
          }
        );
    }

  }

  findbyId(id?: number) {
    this.serviceService.findById(id!)
      .subscribe((service: Service) => {
        this.id = service.id;
        this.serviceForm.get('name')?.setValue(service.name);
        this.serviceForm.get('menu')?.setValue(service.menu);
        this.serviceForm.get('dynamicServiceType')?.setValue(service.dynamicServiceType);
        this.serviceForm.get('showClient')?.setValue(service.showClient);
        if (service.dynamicServiceType !== null && service.dynamicServiceType !== undefined && !service.dynamicServiceType) {
          this.serviceForm.get('chosenComplements')?.setValue(this.createServiceTypeSelected(service.serviceTypes!));
        }

        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }

  validateForm() {
    let valid: Array<boolean> = [];
    let name = this.serviceForm.get('name');
    let menu = this.serviceForm.get('menu');
    let showClient = this.serviceForm.get('showClient');
    let dynamicServiceType = this.serviceForm.get('dynamicServiceType');
    let chosenComplements = this.serviceForm.get('chosenComplements');

    if (name?.value === '') {
      valid.push(false);
      this.errorName = true;
      this.messageName = "Nome do Serviço é obrigatório!";
    } else {
      this.name = name!.value;
      this.messageName = '';
    }

    if (menu?.value === '') {
      this.menu = false;
    } else {
      this.menu = menu!.value;
    }

    if (showClient?.value === '') {
      this.showClient = false;
    } else {
      this.showClient = showClient!.value;
    }

    if (dynamicServiceType?.value === '') {
      this.dynamicServiceType = false;
    } else {
      this.dynamicServiceType = dynamicServiceType!.value;
      this.chosenComplements = [];
    }
    if (!this.dynamicServiceType) {
      if (chosenComplements?.value === '') {
        valid.push(false);
        this.errorComplement = true;
        this.messageComplements = "Complemento do Serviço é obrigatório!";
      } else {
        this.chosenComplements = chosenComplements!.value;
        this.messageComplements = '';
      }
    }
    return valid.length == 0;

  }
  chosenServiceType(): Array<ServiceType> {
    let serviceTypes: Array<ServiceType> = []; 
    this.chosenComplements.forEach(function (value) {
      let serviceType: ServiceType = { id: value }
      serviceTypes.push(serviceType);
    });
    return serviceTypes
  }

  createServiceTypeSelected(serviceTypes: Array<ServiceType>): Array<number> {
    let serviceTypeSelected: Array<number> = [];
    serviceTypes.forEach(function (value: ServiceType) {
      serviceTypeSelected.push(value.id!);
    });
    return serviceTypeSelected
  }

  loadingServiceType() {
    this.serviceTypeService.findAllActive()
      .subscribe((serviceTypes: ServiceType[]) => {
        this.complements = serviceTypes
        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }


  clean() {
    this.complements = [];
    this.chosenComplements = [];
    this.name = '';
    this.messageName = ''
    this.errorName = false;
    this.messageComplements = ''
    this.errorComplement = false;
    this.serviceForm.reset();
    this.menu = false;
    this.showClient = false;
    this.dynamicServiceType = false;
    this.service = {};
    this.enableTypes=true;
  }

  enableDinamicType(event:any){
    if (event.currentTarget.checked) {
      this.enableTypes=false;
     
    } else {
      this.enableTypes=true;
    }
    this.chosenComplements = [];
    this.serviceForm.get('chosenComplements')?.setValue([]);
  }

}
