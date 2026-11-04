import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { Purchase } from '../../models/purchase';
import { PurchaseServiceService } from '../../services/purchase-service.service';

@Component({
  selector: 'sb-purchase-search',
  templateUrl: './purchase-search.component.html',
  styleUrls: ['./purchase-search.component.scss']
})
export class PurchaseSearchComponent implements OnInit {

  pageSize = 10;
  page = 1;
  collectionSize?: number;
  purchases?: Purchase[] = [];
  filter = '';
  purchaseDate?:Date;

  constructor(private purchaseService: PurchaseServiceService, private router: Router) {
    this.pagination();
  }

  ngOnInit(): void {
    this.pagination();
  }

  search() {
    this.pagination();
  }

  pagination() {
    let purchaseDate: any = "";
    if (this.purchaseDate !== undefined) {
      purchaseDate = this.purchaseDate;
    }
    this.purchaseService.findAll(this.filter,purchaseDate,'','', (this.page - 1)).
      subscribe((pagePurchase: Pagination<Purchase>) => {
        this.purchases = pagePurchase.contents;
        this.collectionSize = pagePurchase.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        alert("O Registro não encontrado!");
        console.log(err.message);
      });
  }

  delete(purchase: Purchase) {
    const conf = confirm("Deseja excluir o registro? ");
    if(conf){
      this.purchaseService.delete(purchase.id).subscribe(data => {
        this.pagination();
        alert("O Registro foi excluido com sucesso!");
        console.log("Ok");
      }, (err: Error) => {
        alert("O Registro não pode ser excluido!");
        console.log(err.message);
      });
    }
  }

  edit(id: number) {
    this.router.navigate(['/purchase/purchase-create'], { queryParams: { id: id } });
  }

}
