import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SizeEnum } from '@shared/enums/size-enum';
import { ModalConfirmComponent } from '@shared/modals/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ServiceType } from '../../models/service-type';
import { ServiceTypePrice } from '../../models/service-type-price';
import { ServiceTypeService } from '../../services/service-type.service';

@Component({
  selector: 'sb-service-type-create-update',
  templateUrl: './service-type-create-update.component.html',
  styleUrls: ['./service-type-create-update.component.scss']
})
export class ServiceTypeCreateUpdateComponent implements OnInit {

  serviceTypeForm: FormGroup;
  serviceType: ServiceType = {};

  name?: string;
  id?: number;
  idPrice0?: number;
  idPrice1?: number;
  idPrice2?: number;
  priceSmall?: number = 0.0;
  priceMedium: number = 0.0;
  priceLarge: number = 0.0;
  messageName = ''
  errorName = false;
  messagePriceSmall = ''
  errorPriceSmall = false;
  messagePriceMedium = ''
  errorPriceMedium = false;
  messagePriceLarge = ''
  errorPriceLarge = false;
  editPrices: Array<ServiceTypePrice> = [];

  constructor(private serviceTypeService: ServiceTypeService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.serviceTypeForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(params =>{
      this.id = +params['id'] || undefined
    });
    if(this.id!==null || this.id!==undefined){
      this.findbyId(this.id);
    }   
    this.forms();
  }

  forms() {
    this.serviceTypeForm = this.fb.group({
      name: new FormControl('', Validators.required),
      priceSmall: new FormControl('', Validators.required),
      priceMedium: new FormControl('', Validators.required),
      priceLarge: new FormControl('', Validators.required)
    });
  }

  validateForm(): boolean {
    let valid: Array<boolean> = [];
    let name = this.serviceTypeForm.get('name');
    let priceSmall = this.serviceTypeForm.get('priceSmall');
    let priceMedium = this.serviceTypeForm.get('priceMedium');
    let priceLarge = this.serviceTypeForm.get('priceLarge');
    if (name?.value === '') {
      valid.push(false);
      this.errorName = true;
      this.messageName = "Nome do Complemento é obrigatório!";
    } else {
      this.name = name!.value;
      this.messageName = '';
    }
    if (priceSmall?.value === '') {
      valid.push(false);
      this.errorPriceSmall = true;
      this.messagePriceSmall = "Preço para Veículo Pequeno é obrigatório!";
    } else {
      this.priceSmall = priceSmall!.value;
      this.messagePriceSmall = '';
    }

    if (priceMedium?.value === '') {
      valid.push(false);
      this.errorPriceMedium = true;
      this.messagePriceMedium = "Preço para Veículo Médio obrigatório!";
    } else {
      this.priceMedium = priceMedium!.value;
      this.messagePriceMedium = '';
    }

    if (priceLarge?.value === '') {
      valid.push(false);
      this.errorPriceLarge = true;
      this.messagePriceLarge = "Preço para Veículo Grande obrigatório!";
    } else {
      this.priceLarge = priceLarge!.value;
      this.messagePriceLarge = '';
    }
    return valid.length == 0;
  }

  save() {
    if (this.validateForm()) {
      this.saveServiceType();
    }

  }

  saveServiceType() {   
    this.serviceType.id = this.id;
    this.serviceType.name = this.name;   

    if (this.serviceType.id !== undefined && this.serviceType.id !== null) {
      this.editServiceTypePrice();
      this.serviceType.prices = this.editPrices;
      this.serviceTypeService.update(this.serviceType)
        .subscribe(
          () => {          
            this.clean();
            this.router.navigate([['/service-type/service-type-search']]); 
            alert("Registro alterado com sucesso");     
            console.log("OK");
          },
          (err: Error) => {
            alert("Erro  ao alterar o registro");          
            console.log(err.message);
          }
        );
    } else {
      this.serviceType.prices = this.createServiceTypePrice();
      this.serviceTypeService.save(this.serviceType)
        .subscribe(
          () => {           
            this.clean();
            this.router.navigate([['/service-type/service-type-search']]);          
            alert("Registro salvado com sucesso");
          },
          (err: Error) => {   
            alert("Erro ao salvar o registro");         
            console.log(err.message);
          }
        );
    }

  }

  findbyId(id?: number) {    
    this.serviceTypeService.findById(id!)
      .subscribe((serviceType: ServiceType) => {      
        this.id = serviceType.id;
        this.editPrices = serviceType.prices!;
        this.serviceTypeForm.get('name')?.setValue(serviceType.name);      
        this.serviceTypeForm.get('priceSmall')?.setValue(serviceType.prices![0].price);        
        this.serviceTypeForm.get('priceMedium')?.setValue(serviceType.prices![1].price);        
        this.serviceTypeForm.get('priceLarge')?.setValue(serviceType.prices![2].price);

        console.log("OK");
      }, (err: Error) => {        

        console.log(err.message);
      });
  }

  createServiceTypePrice(): Array<ServiceTypePrice> {
    let listServiceTypePrice: Array<ServiceTypePrice> = [];
    let price0: ServiceTypePrice = {
      id: this.idPrice0,
      price: this.priceSmall,
      size: SizeEnum.SMALL
    }
    let price1: ServiceTypePrice = {
      id: this.idPrice1,
      price: this.priceMedium,
      size: SizeEnum.MEDIUM
    }
    let price2: ServiceTypePrice = {
      id: this.idPrice2,
      price: this.priceLarge,
      size: SizeEnum.LARGE
    }
    listServiceTypePrice.push(price0, price1, price2);
    return listServiceTypePrice;
  }

  editServiceTypePrice(){
    this.editPrices[0].price = this.priceSmall;
    this.editPrices[1].price = this.priceMedium;
    this.editPrices[2].price = this.priceLarge;
  }

  clean() {
    this.serviceType = {};
    this.serviceTypeForm.reset();
    this.name = '';
    this.priceSmall = 0.0;
    this.priceMedium = 0.0;
    this.priceLarge = 0.0;
    this.messageName = ''
    this.errorName = false;
    this.messagePriceSmall = ''
    this.errorPriceSmall = false;
    this.messagePriceMedium = ''
    this.errorPriceMedium = false;
    this.messagePriceLarge = ''
    this.errorPriceLarge = false;
  }
 
}
