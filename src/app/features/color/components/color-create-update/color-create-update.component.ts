import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'sb-color-create-update',
  templateUrl: './color-create-update.component.html',
  styleUrls: ['./color-create-update.component.scss']
})
export class ColorCreateUpdateComponent implements OnInit {
  colorForm: FormGroup;
  color: Color = {};

  name?: string;
  id?: number;
  messageName = ''
  errorName = false;

  constructor(private colorService: ColorService,
    private router: Router,
    private activeRouter: ActivatedRoute, private fb: FormBuilder) {
    this.colorForm = this.fb.group({});

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
    this.colorForm = this.fb.group({
      name: new FormControl('', Validators.required)

    });
  }


  validateForm(): boolean {
    let valid: Array<boolean> = [];
    let name = this.colorForm.get('name');
    let size = this.colorForm.get('size');
    if (name?.value === '') {
      valid.push(false);
      this.errorName = true;
      this.messageName = "Nome do Veículo é obrigatório!";
    } else {
      this.name = name!.value;
      this.messageName = '';
    }
    return valid.length == 0;
  }

  save(){
    if(this.validateForm()){
      this.saveVehicle();

    }
  }

  saveVehicle() {

    this.color.id = this.id;
    this.color.name = this.name;

    if (this.color.id !== undefined && this.color.id !== null) {

      this.colorService.update(this.color)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/color/color-search']]);
            alert("Registro alterado com sucesso");
            console.log("OK");
          },
          (err: Error) => {
            alert("Erro ao alterar o registro");
            console.log(err.message);
          }
        );
    } else {
      this.colorService.save(this.color)
        .subscribe(
          () => {
            this.clean();
            this.router.navigate([['/color/color-search']]);
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
    this.colorService.findById(id!)
      .subscribe((color: Color) => {
        this.id = color.id;
        this.colorForm.get('name')?.setValue(color.name);
        console.log("OK");
      }, (err: Error) => {

        console.log(err.message);
      });
  }

  clean() {
    this.colorForm.reset();
    this.messageName = ''
    this.errorName = false;
    this.name = '';
  }


}
