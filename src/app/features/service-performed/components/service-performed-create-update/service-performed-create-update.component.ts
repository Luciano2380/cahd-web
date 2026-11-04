import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CahdConstants } from '@core/constants/cahd.constants';
import { Client } from '@features/client/models/client';
import { ClientVehicle } from '@features/client/models/client-vehicle';
import { ClientServiceService } from '@features/client/services/client-service.service';
import { Color } from '@features/color/models/color';
import { SizeEnum } from '@shared/enums/size-enum';
import { PricesSelected } from '@features/service-type/models/prices-selected';
import { ServiceTypePrice } from '@features/service-type/models/service-type-price';
import { ServiceTypeService } from '@features/service-type/services/service-type.service';
import { Service } from '@features/service/models/service';
import { ServiceService } from '@features/service/services/service.service';
import { Vehicle } from '@features/vehicle/models/vehicle';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { runInThisContext } from 'vm';
import { DinamicType } from '../../models/dinamic-type';
import { ServicePerformance } from '../../models/service-performance';
import { ServicePerformedService } from '../../services/service-performed.service';

@Component({
  selector: 'sb-service-performed-create-update',
  templateUrl: './service-performed-create-update.component.html',
  styleUrls: ['./service-performed-create-update.component.scss']
})
export class ServicePerformedCreateUpdateComponent implements OnInit {

  vehicle?: Vehicle = {};
  color?: Color = {};
  size?: string;
  sizeName?: string;
  service: Service = {};
  chosenPrices: ServiceTypePrice[] = [];
  prices: ServiceTypePrice[] = [];
  id?: number;
  servicePerformance: ServicePerformance = {};
  totalPrice?: number = 0.0;
  chosen: boolean = false;
  dinamicTypes: DinamicType[] = [];
  descriptionDinamic?: string = '';
  priceDinamic?: number = 0.0;
  closeResult = '';
  messageDescription = ''
  errorDescription = false;
  messagePrice = ''
  errorPrice = false;
  totalPriceDinamic?: number = 0.0;
  clients: Client[] = [];
  client: Client = {};
  clientName?:string;
  enableFormCliente: boolean = false;
  modalRef?: NgbModalRef;
  licensePlate?: string;
  phone?: string;
  clientVehicle: ClientVehicle = {};
  pricesSelected: PricesSelected[] = [];
  expectedDeliveryDateTime?:Date;
  note?:string;


  constructor(private serviceService: ServiceService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private servicePerformanceService: ServicePerformedService,
    private serviceTypeService: ServiceTypeService,
    private modalService: NgbModal,
    private clientService: ClientServiceService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state!==null && state!==undefined){
      this.vehicle = state.vehicle;
      this.color = state.color;
      this.size = state.size;
      this.service = state.service;
    }
   
  }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(params => {
      this.id = +params['id'] || undefined;
      this.size = params['size'] || undefined;
    });
    if (this.id !== undefined) {
      this.findbyId(this.id);
    } else {
      this.findServices();
    }
  }

  findServices() {
    this.sizeName = this.descriptionSize(this.size!);
    if (!this.service.dynamicServiceType) {
      this.loadingPrices();
    }
    if (this.service.showClient) {
      this.loadingClients();
    }
  }
  priceSelected() {
    for (var p of this.prices) {
      const priceSelected: PricesSelected = {};
      if (this.servicePerformance.serviceTypePrices !== undefined && this.servicePerformance.serviceTypePrices.length > 0) {
        let obj = this.servicePerformance.serviceTypePrices.find(t => t.id === p.id);
        if (obj !== undefined) {
          priceSelected.serviceTypePrice = obj;
          priceSelected.selected = true;
        } else {
          priceSelected.serviceTypePrice = p;
          priceSelected.selected = false;
        }
      } else {
        priceSelected.serviceTypePrice = p;
        priceSelected.selected = false;
      }
      this.pricesSelected.push(priceSelected);
    }
  }

  loadingPrices() {
    this.serviceTypeService.findAllPrices(this.service.id!, this.size!)
      .subscribe((prices: ServiceTypePrice[]) => {
        this.prices = prices;
        this.priceSelected();
        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }

  loadingClients() {
    this.clientService.listAll(this.vehicle?.id, this.color?.id)
      .subscribe((clients: Client[]) => {
        this.clients = clients;
        if (this.clients.length == 0) {
          this.enableFormCliente = true;
        } else if (this.clients.length == 1) {
          this.enableFormCliente = true;
          if (this.client == null) {
            this.client = this.clients[0];
          }

        } else {
          this.enableFormCliente = false;
        }
        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }
  updateTotalPrice(event: any, price: ServiceTypePrice) {
    if (event.currentTarget.checked) {
      this.chosenPrices.push(price);
      this.totalPrice! += price.price!
    } else {
      var index = this.chosenPrices.indexOf(price);
      if (index > -1) {
        this.chosenPrices.splice(index, 1);
      }
      this.totalPrice! -= price.price!;
    }
  }

  saveService(param: boolean) {
    this.servicePerformance.id = this.id;
    this.servicePerformance.vehicle = this.vehicle;
    this.servicePerformance.color = this.color;
    if (this.service.dynamicServiceType !== undefined && this.service.dynamicServiceType) {
      this.servicePerformance.dynamicServiceTypes = this.dinamicTypes;
      this.servicePerformance.serviceTypePrices = [];
      this.servicePerformance.totalPrice = this.totalPriceDinamic;
      if(this.servicePerformance.dynamicServiceTypes.length==0){
        alert("Deve inserir ao menos um Complemento");
        return;
      }
    } else {
      this.servicePerformance.serviceTypePrices = this.chosenPrices;
      this.servicePerformance.dynamicServiceTypes = [];
      this.servicePerformance.totalPrice = this.totalPrice;
      if(this.servicePerformance.serviceTypePrices.length==0){
        alert("Deve inserir ao menos um Complemento");
        return;
      }
    }
    if (this.service.showClient !== undefined && this.service.showClient) {
      if(this.licensePlate===undefined && this.clientName===undefined && this.phone===undefined){
        alert("Preencha os campos do cliente!");
        return;
      }
      this.servicePerformance.clientLicensePlate = this.licensePlate;
      this.servicePerformance.clientName = this.clientName;         
      this.servicePerformance.clientPhone = this.phone; 
      this.servicePerformance.note = this.note;     
      this.servicePerformance.expectedDateTime = this.formatDateTime(this.expectedDeliveryDateTime!)+":00";
    }
    this.servicePerformance.service = this.service;

    if (this.servicePerformance.id !== undefined && this.servicePerformance.id !== null) {

      this.servicePerformanceService.update(this.servicePerformance)
        .subscribe(
          (service: ServicePerformance) => {            
            this.print(param, service.id!);
          },
          (err: Error) => {
            alert("Erro ao salvar");
            console.log(err.message);
          }
        );
    } else {
      this.servicePerformanceService.save(this.servicePerformance)
        .subscribe(
          (service: ServicePerformance) => {
            this.print(param, service.id!);
          },
          (err: Error) => {

            alert("Erro ao salvar");
            console.log(err.message);
          }
        );
    }

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

  open(content: any) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.descriptionDinamic = '';
    this.priceDinamic = 0.0;
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
  addDinamicType() {
    let valid: Array<boolean> = [];
    if (this.descriptionDinamic === '') {
      valid.push(false);
      this.errorDescription = true;
      this.messageDescription = "Descrição do Complemento é obrigatório!";
    } else {
      this.messageDescription = '';
      this.errorDescription = false;
    }
    if (this.priceDinamic === undefined || this.priceDinamic < 0.0) {
      valid.push(false);
      this.errorPrice = true;
      this.messagePrice = "O preço é obrigatório!";
    } else {
      this.errorPrice = false;
      this.messagePrice = "";
    }
    if (valid.length == 0) {
      const type: DinamicType = {};
      type.description = this.descriptionDinamic;
      type.price = this.priceDinamic;
      type.servicePerformance = this.servicePerformance;
      this.dinamicTypes.push(type);
      this.totalPriceDinamic! += +type.price!;
      this.modalRef?.close();
    }
  }

  findbyId(id?: number) {
    this.servicePerformanceService.findById(id!)
      .subscribe((servicePerformance: ServicePerformance) => {
        this.id = servicePerformance.id;
        this.servicePerformance = servicePerformance;
        this.service = servicePerformance.service!;
        this.vehicle = servicePerformance.vehicle;
        this.color = servicePerformance.color;
        this.size = servicePerformance.vehicle?.size;
        this.licensePlate = servicePerformance.clientLicensePlate;
        this.clientName = servicePerformance.clientName;
        this.note = this.servicePerformance.note;
        this.phone = this.servicePerformance.clientPhone;
        if(this.servicePerformance.expectedDateTime!==null && this.servicePerformance.expectedDateTime!==undefined){
          const str = this.servicePerformance.expectedDateTime.split('-');
          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const date = Number(str[0]); 
         
          this.expectedDeliveryDateTime = new Date(2021, 10, 14);
        }
       
        if (servicePerformance.dynamicServiceTypes !== undefined && servicePerformance.dynamicServiceTypes.length > 0) {
          this.dinamicTypes = servicePerformance.dynamicServiceTypes;
          this.totalPriceDinamic = servicePerformance.totalPrice;
        }
       
        if (servicePerformance.serviceTypePrices !== undefined && servicePerformance.serviceTypePrices.length > 0) {
          this.chosenPrices = servicePerformance.serviceTypePrices;
          this.totalPrice = servicePerformance.totalPrice;
        }
        this.findServices();
        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }
  print(param: boolean, id: number) {
    if (param) {
      this.servicePerformanceService.print(id).subscribe(
        () => {
          alert("Registro salvo com sucesso");
          this.pageInitial();
          console.log('OK');
        }, (err: Error) => {
          alert("Registro salvo com sucesso. Não foi possivel imprimir!");
          this.pageInitial();
          console.log(err.message);
        }
      );
    } else {
      alert("Registro salvo com sucesso");
      this.pageInitial();
    }
  }

  pageInitial() {
    this.router.navigate([['/service-performed/show-service-performed']]);
  }

  delete(type: DinamicType) {
    var index = this.dinamicTypes.indexOf(type);
    if (index > -1) {
      this.dinamicTypes.splice(index, 1);
    }
    this.totalPriceDinamic! -= type.price!;
  }
  formatDateTime(data: Date){
    if(data===undefined){
      alert("Preencha os campos do cliente!");
      return;
    }   
    var day = data.toString();
   
    return day.replace("T", ' ');
  }
}
