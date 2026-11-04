import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'sb-color-search',
  templateUrl: './color-search.component.html',
  styleUrls: ['./color-search.component.scss']
})
export class ColorSearchComponent implements OnInit {
  pageSize = 10;
  page = 1;
  collectionSize?: number;
  colors?: Color[] = [];
  name = '';

  constructor(private colorService: ColorService, private router: Router) {
    this.pagination();
  }

  ngOnInit(): void {
    this.pagination();
  }

  search() {
    this.pagination();
  }

  pagination() {
    this.colorService.findAll(this.name, '', (this.page - 1)).
      subscribe((pageServiceType: Pagination<Color>) => {
        this.colors = pageServiceType.contents;
        this.collectionSize = pageServiceType.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        this.colors=[];
        alert("O Registro não encontrado!");
        console.log(err.message);
      });
  }

  delete(color: Color) {  
    const conf = confirm("Deseja excluir o registro? ");
    if(conf){
      this.colorService.delete(color.id).subscribe(data => {
        alert("O Registro foi excluido com sucesso!");
        console.log("Ok");
      }, (err: Error) => {
        alert("O Registro não pode ser excluido!");
        console.log(err.message);
      });
    }
  }

  edit(id: number) {
    this.router.navigate(['/color/color-create'], { queryParams: { id: id } });
  }


}
