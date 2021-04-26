import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['photo', 'productName', 'date', 'productPrice', 'productStatus', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe(res => {
      this.dataSource = res.data.products;
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(e) {
    let req;
    console.log(e);
    req = e;
    this.api.deleteProduct(req).subscribe(res => {
      if (res.success) {
        alert(res.data.message);
        this.api.getProducts().subscribe(prodRes => {
          this.dataSource = prodRes.data.products;
        })
      } else {
        alert(res.data.message);
      }
    })
  }

  detail(element) {
    this.router.navigate(['add-product'], { queryParams: { productId: element._id } });
  }
  addProduct() {
    this.router.navigate(['add-product']);
  }
}
