import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'sb-company-create-update',
  templateUrl: './company-create-update.component.html',
  styleUrls: ['./company-create-update.component.scss']
})
export class CompanyCreateUpdateComponent implements OnInit {
  companyForm: FormGroup;
  id?: number;
  name?: string;
  cnpj?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  number?: string;
  complement?: string;
  zipCode?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  isDefault?: string;
  company: Company = {};
  messageName = ''
  errorName = false;
  messageCNPJ = ''
  errorCNPJ = false;
  messageAddress = ''
  errorAddress = false;
  messageNeighborhood = ''
  errorNeighborhood = false;
  messageCity = ''
  errorCity = false;
  messageState = ''
  errorState = false;
  messageNumber = ''
  errorNumber = false;
  messageZipCode = ''
  errorZipCode = false;


  constructor(private companyService: CompanyService,
    private router: Router,
    private activeRouter: ActivatedRoute, private fb: FormBuilder) {
    this.companyForm = this.fb.group({});
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


  forms() {
    this.companyForm = this.fb.group({
      name: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      complement: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      isDefault: new FormControl('', Validators.required)
    });
  }

  save() {
    if (this.validateForm()) {
      this.saveComany();

    }
  }

  saveComany() {

    this.company.id = this.id;
    this.company.name = this.name;
    this.company.cnpj = this.cnpj;
    this.company.address = this.address;
    this.company.neighborhood = this.neighborhood;
    this.company.city = this.city;
    this.company.state = this.state;
    this.company.number = this.number;
    this.company.zipCode = this.zipCode;
    this.company.isDefault = this.isDefault;
    this.company.complement = this.complement;
    this.company.phone = this.phone;
    this.company.mobile = this.mobile;

    if (this.company.id !== undefined && this.company.id !== null) {

      this.companyService.update(this.company)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/company/company-search']]);
            alert("Registro alterado com sucesso");
            console.log("OK");
          },
          (err: Error) => {
            alert("Erro ao alterar o registro");
            console.log(err.message);
          }
        );
    } else {
      this.companyService.save(this.company)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/company/company-search']]);
            alert("Registro salvar com sucesso");
          },
          (err: Error) => {
            alert("Erro ao salvar o registro");
            console.log(err.message);
          }
        );
    }

  }


  validateForm(): boolean {
    let valid: Array<boolean> = [];

    if (this.companyForm.get('name')?.value === '') {
      valid.push(false);
      this.errorName = true;
      this.messageName = "Nome do Veículo é obrigatório!";
    } else {
      this.name = this.companyForm.get('name')!.value;
      this.messageName = '';
    }

    if (this.companyForm.get('cnpj')?.value === '') {
      valid.push(false);
      this.errorCNPJ = true;
      this.messageCNPJ = "CNPJ é obrigatório!";
    } else {
      this.cnpj = this.companyForm.get('cnpj')!.value;
      this.messageCNPJ = '';
    }

    if (this.companyForm.get('address')?.value === '') {
      valid.push(false);
      this.errorAddress = true;
      this.messageAddress = "Endereço é obrigatório!";
    } else {
      this.address = this.companyForm.get('address')!.value;
      this.messageAddress = '';
    }

    if (this.companyForm.get('neighborhood')?.value === '') {
      valid.push(false);
      this.errorNeighborhood = true;
      this.messageNeighborhood = "Bairro é obrigatório!";
    } else {
      this.neighborhood = this.companyForm.get('neighborhood')!.value;
      this.messageNeighborhood = '';
    }
    if (this.companyForm.get('city')?.value === '') {
      valid.push(false);
      this.errorCity = true;
      this.messageCity = "Cidade é obrigatório!";
    } else {
      this.city = this.companyForm.get('city')!.value;
      this.messageCity = '';
    }

    if (this.companyForm.get('state')?.value === '') {
      valid.push(false);
      this.errorState = true;
      this.messageState = "Estado é obrigatório!";
    } else {
      this.state = this.companyForm.get('state')!.value;
      this.messageState = '';
    }

    if (this.companyForm.get('number')?.value === '') {
      valid.push(false);
      this.errorNumber = true;
      this.messageNumber = "Número é obrigatório!";
    } else {
      this.number = this.companyForm.get('number')!.value;
      this.messageNumber = '';
    }

    if (this.companyForm.get('zipCode')?.value === '') {
      valid.push(false);
      this.errorZipCode = true;
      this.messageZipCode = "CEP é obrigatório!";
    } else {
      this.zipCode = this.companyForm.get('zipCode')!.value;
      this.messageZipCode = '';
    }
    this.isDefault = this.companyForm.get('isDefault')!.value;
    this.complement = this.companyForm.get('complement')!.value;
    this.phone = this.companyForm.get('phone')!.value;
    this.email = this.companyForm.get('email')!.value;
    this.mobile = this.companyForm.get('mobile')!.value;
    return valid.length == 0;
  }

  findbyId(id?: number) {
    this.companyService.findById(id!)
      .subscribe((company: Company) => {
        this.id = company.id;
        this.companyForm.get('name')?.setValue(company.name);
        this.companyForm.get('cnpj')?.setValue(company.cnpj);
        this.companyForm.get('address')?.setValue(company.address);
        this.companyForm.get('neighborhood')?.setValue(company.neighborhood);
        this.companyForm.get('city')?.setValue(company.city);
        this.companyForm.get('state')?.setValue(company.state);
        this.companyForm.get('number')?.setValue(company.number);
        this.companyForm.get('complement')?.setValue(company.complement);
        this.companyForm.get('zipCode')?.setValue(company.zipCode);
        this.companyForm.get('phone')?.setValue(company.phone);
        this.companyForm.get('mobile')?.setValue(company.mobile);
        this.companyForm.get('email')?.setValue(company.email);
        this.companyForm.get('isDefault')?.setValue(company.isDefault);
        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }

  clean() {
    this.companyForm.reset();
    this.name = '';
    this.cnpj = '';
    this.address = '';
    this.neighborhood = '';
    this.city = '';
    this.state = '';
    this.number = '';
    this.complement = '';
    this.zipCode = '';
    this.phone = '';
    this.mobile = '';
    this.email = '';
    this.isDefault = '';
    this.company = {};
    this.messageName = ''
    this.errorName = false;
    this.messageCNPJ = ''
    this.errorCNPJ = false;
    this.messageAddress = ''
    this.errorAddress = false;
    this.messageNeighborhood = ''
    this.errorNeighborhood = false;
    this.messageCity = ''
    this.errorCity = false;
    this.messageState = ''
    this.errorState = false;
    this.messageNumber = ''
    this.errorNumber = false;
    this.messageZipCode = ''
    this.errorZipCode = false;
  }

}
