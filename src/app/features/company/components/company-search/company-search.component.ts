import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@shared/models/pagination';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'sb-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss']
})
export class CompanySearchComponent implements OnInit {

  pageSize = 10;
  page = 1;
  collectionSize?: number;
  companys?: Company[] = [];
  name = '';

  constructor(private companyService: CompanyService, private router: Router) {
    this.pagination();
  }

  ngOnInit(): void {
    this.pagination();
  }

  search() {
    this.pagination();
  }

  pagination() {
    this.companyService.findAll(this.name, '', (this.page - 1)).
      subscribe((pageServiceType: Pagination<Company>) => {
        this.companys = pageServiceType.contents;
        this.collectionSize = pageServiceType.totalRecords;

        console.log("OK");
      }, (err: Error) => {
        this.companys=[];
        alert("O Registro não encontrado!");
        console.log(err.message);
      });
  }

  delete(company: Company) {  
    const conf = confirm("Deseja excluir o registro? ");
    if(conf){
      this.companyService.delete(company.id).subscribe(data => {
        alert("O Registro foi excluido com sucesso!");
        console.log("Ok");
      }, (err: Error) => {
        
        alert("O Registro não pode ser excluido!");
        console.log(err.message);
      });
    }
  }

  edit(id: number) {
    this.router.navigate(['/company/company-create'], { queryParams: { id: id } });
  }



}
