import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../../models/purchase';
import { PurchaseServiceService } from '../../services/purchase-service.service';

@Component({
  selector: 'sb-purchase-create-update',
  templateUrl: './purchase-create-update.component.html',
  styleUrls: ['./purchase-create-update.component.scss']
})
export class PurchaseCreateUpdateComponent implements OnInit {

  purchaseForm: FormGroup;
  purchase: Purchase = {};

  place?: string;
  id?: number;
  description?: string;
  value: number = 0.0;
  purchaseDate: Date = new Date();
  purchaseFile?: string;
  messagePlace = ''
  errorPlace = false;
  messageDescription = ''
  errorDescription = false;
  messageValue = ''
  errorValue = false;
  messagePurchaseDate = ''
  errorPurchaseDate = false;
  imgFile?: string;

  constructor(private purchaseService: PurchaseServiceService,
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.purchaseForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(params => {
      this.id = +params['id'] || undefined
    });
    if (this.id !== null || this.id !== undefined) {
      this.findbyId(this.id);
    }
    this.forms();
  }

  upload(event: any) {
    const reader = new FileReader();
    if (event.target.files) {
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = () => {
        this.imgFile = reader.result as string;
      };

      const formData = new FormData();
      formData.append('imagem', event.target.files[0]);
      formData.append('tipo', 'C');
      this.purchaseService.upload(formData)
        .subscribe(data => {
          this.purchaseFile = data.url;

          console.log("OK");
        }, (err: Error) => {

          console.log(err.message);
        });
    }
  }

  save() {
    if (this.validateForm()) {
      this.savePurchase();
    }

  }

  savePurchase() {
    this.purchase.id = this.id;
    this.purchase.place = this.place;
    this.purchase.description = this.description;
    this.purchase.purchaseDate = this.purchaseDate;
    this.purchase.imageLink = this.purchaseFile;
    this.purchase.value = this.value;


    if (this.purchase.id !== undefined && this.purchase.id !== null) {
      this.purchaseService.update(this.purchase)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/purchase/purchase-search']]);
            console.log("OK");
          },
          (err: Error) => {
            console.log(err.message);
          }
        );
    } else {
      ;
      this.purchaseService.save(this.purchase)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/purchase/purchase-search']]);
          },
          (err: Error) => {
            console.log(err.message);
          }
        );
    }

  }

  validateForm(): boolean {
    let valid: Array<boolean> = [];
    let place = this.purchaseForm.get('place');
    let description = this.purchaseForm.get('description');
    let value = this.purchaseForm.get('value');
    let purchaseDate = this.purchaseForm.get('purchaseDate');
    if (place?.value === '') {
      valid.push(false);
      this.errorPlace = true;
      this.messagePlace = "Nome do Local da Compra é obrigatório!";
    } else {
      this.place = place!.value;
      this.messagePlace = '';
    }
    if (description?.value === '') {
      valid.push(false);
      this.errorDescription = true;
      this.messageDescription = "Descrição da Compra é obrigatório!";
    } else {
      this.description = description!.value;
      this.messageDescription = '';
    }

    if (value?.value === '') {
      valid.push(false);
      this.errorValue = true;
      this.messageValue = "Valor da Compra é obrigatório!";
    } else {
      this.value = value!.value;
      this.messageValue = '';
    }

    if (purchaseDate?.value === '') {
      valid.push(false);
      this.errorPurchaseDate = true;
      this.messagePurchaseDate = "Preço para Veículo Grande obrigatório!";
    } else {
      this.purchaseDate = purchaseDate!.value;
      this.messagePurchaseDate = '';
    }
    return valid.length == 0;
  }

  forms() {
    this.purchaseForm = this.fb.group({
      place: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      purchaseDate: new FormControl('', Validators.required)
    });
  }

  findbyId(id?: number) {
    this.purchaseService.findById(id!)
      .subscribe((purchase: Purchase) => {
        this.id = purchase.id;
        this.purchaseForm.get('place')?.setValue(purchase.place);
        this.purchaseForm.get('description')?.setValue(purchase.description);
        this.purchaseForm.get('value')?.setValue(purchase.value);
        this.purchaseForm.get('purchaseDate')?.setValue(purchase.purchaseDate);
        this.purchaseFile = purchase.imageLink;
        this.imgFile = purchase.imageLink;

        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }

  clean() {
    this.purchaseForm.reset();
    this.purchase = {};
    this.place = '';
    this.description = '';
    this.value = 0.0;
    this.purchaseDate = new Date();
    this.purchaseFile = '';
    this.messagePlace = ''
    this.errorPlace = false;
    this.messageDescription = ''
    this.errorDescription = false;
    this.messageValue = ''
    this.errorValue = false;
    this.messagePurchaseDate = ''
    this.errorPurchaseDate = false;
    this.imgFile='';
  }

}
