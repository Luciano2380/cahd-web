import { Component, OnInit } from '@angular/core';
import { Pagination } from '@shared/models/pagination';
import { Purchase } from '../../models/purchase';
import { PurchaseServiceService } from '../../services/purchase-service.service';

@Component({
  selector: 'sb-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss']
})
export class PurchaseReportComponent implements OnInit {

  pageSize = 10;
  page = 1;
  collectionSize?: number;
  purchases?: Purchase[] = [];
  name = '';
  startDate?: Date;
  endDate?: Date;

  constructor(private purchaseService: PurchaseServiceService) {
    this.pagination();
  }

  ngOnInit(): void {
    this.pagination();
  }

  search() {
    this.pagination();
  }

  pagination() {
    let endDate: any = "";
    let startDate: any = "";
    if (this.startDate !== undefined) {
      startDate = this.startDate;
    }
    if (this.endDate !== undefined) {
      endDate = this.endDate;
    }
    this.purchaseService.findAll('', '', startDate, endDate, (this.page - 1)).
      subscribe((pagePurchase: Pagination<Purchase>) => {
        this.purchases = pagePurchase.contents;
        this.collectionSize = pagePurchase.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        alert("Registros não encontrado");
        this.purchases =[];
        console.log(err.message);
      });
  }

  generatePdf() {
    let idService: any = "";
    let endDate: any = "";
    let startDate: any = "";
    if (this.startDate !== undefined) {
      startDate = this.startDate;
    }
    if (this.endDate !== undefined) {
      endDate = this.endDate;
    }
    this.purchaseService.report(startDate, endDate)
      .subscribe((response) => {
        let blob = new Blob([response], { type: 'application/pdf' });

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        // link.href = downloadURL;
        link.setAttribute("target", "_blank");
        link.setAttribute("href", downloadURL);
        link.setAttribute("download", "relatorioCompra.pdf");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();

      });
  }


}
