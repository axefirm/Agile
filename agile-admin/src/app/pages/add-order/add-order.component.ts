import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  image: any;
  constructor(private router: Router, public formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) {
    // Reactive Form
    this.uploadForm = this.formBuilder.group({
      avatar: [null],
      name: ['']
    });
  }

  displayedColumns: string[] = ['photo', 'productName', 'date', 'productPrice', 'productStatus', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  menuList: any;
  data: any;
  categoryList: any = [];
  public theBoundCallback: Function;
  productId: any;
  main: FormGroup;

  ngOnInit(): void {
    this.productId = this.route.snapshot.queryParamMap.get('productId');


    this.theBoundCallback = this.onChange.bind(this);
    this.api.getCategories().subscribe(resCategory => {
      this.menuList = resCategory.data.categories;
    });

    this.api.getProducts().subscribe(res => {
      this.dataSource = res.data.products;
    });
    // console.log(this.router.getCurrentNavigation().extras.state.example); // 
    this.main = this.formBuilder.group({
      productName: new FormControl('', [Validators.required]),
      productCode: new FormControl(''),
      productPrice: new FormControl('0'),
      productSale: new FormControl('0'),
      productTotalCount: new FormControl(''),
      productDescription: new FormControl(''),
      productStatus: new FormControl(false),
      hasDeliver: new FormControl(false),
      controlTotalCount: new FormControl(false),
    });
    if (this.productId != null) {
      this.api.getProductDetail(this.productId).subscribe(res => {
        if (res.success) {
          const data = res.data.product;
          this.main.setValue({
            productName: data.productName,
            productCode: data.productCode,
            productPrice: data.productPrice,
            productSale: data.productSale,
            productTotalCount: data.productTotalCount,
            productDescription: data.productDescription,
            productStatus: data.productStatus,
            hasDeliver: data.hasDeliver,
            controlTotalCount: data.controlTotalCount,
          }
          );
          // TODO
          this.categoryList = data.categories;
          this.data = data;
        }

        console.log(this.main);
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get categories(): FormArray {
    return this.main.get('categories') as FormArray;
  }

  addSkills(param) {
    this.categories.push(this.formBuilder.group({ _id: param }));
    console.log(this.main.value);
  }

  onChange(e) {
    if (e._selected) {
      this.categoryList.push(e.value);
    } else {

      this.categoryList = this.categoryList.filter((value, index, arr) => {
        return value !== e.value;
      });
    }

  }

  imageURL: string;
  uploadForm: FormGroup;
  selectedFiles: any;
  filePaths: any = [];


  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.selectedFiles = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.filePaths.push(reader.result as string);
    }
    reader.readAsDataURL(file)
  }

  test() {
    console.log("test");
  }
  close(e) {
    this.filePaths.splice(e, 1);
  }
  // Submit Form
  submit() {
    if (this.main.valid) {
      var req = this.main.value;
      if (this.productId) {
        req._id = this.data._id;
        req.shopId = this.data.shopId;
        req.categories = this.categoryList;
        if (this.selectedFiles) {
          console.log(this.selectedFiles);
          this.api.upload(this.selectedFiles).subscribe(resPhoto => {
            console.log(resPhoto);
            req.photo = resPhoto.data.path;
            this.api.updateProductDetail(req).subscribe(res => {
              if (res.success) {
                console.log(res);
                alert(res.data.message);
              } else {
                console.log(res);
                alert(res.data.message);
              }
            }, err => {
              alert(err);
            }
            );
          })
        } else {
          this.api.updateProductDetail(req).subscribe(res => {
            if (res.success) {
              console.log(res);
              alert(res.data.message);
            } else {
              console.log(res);
              alert(res.data.message);
            }
          }, err => {
            alert(err);
          }
          );
        }

      } else {
        var req = this.main.value;
        req.shopId = sessionStorage.getItem('shopId');
        req.categories = this.categoryList;
        console.log(req);
        if (this.selectedFiles) {
          console.log(this.selectedFiles);
          this.api.upload(this.selectedFiles).subscribe(resPhoto => {
            console.log(resPhoto)
            req.photo = resPhoto.data.path;
            this.api.addProduct(req).subscribe(res => {
              if (res.success) {
                console.log(res);
                alert(res.data.message);
              } else {
                console.log(res);
                alert(res.data.message);
              }
            }, err => {
              alert(err);
            }
            );
          })
        } else {
          this.api.addProduct(req).subscribe(res => {
            if (res.success) {
              console.log(res);
              alert(res.data.message);
            } else {
              console.log(res);
              alert(res.data.message);
            }
          }, err => {
            alert(err);
          }
          );
        }
      }
    }
  }

}
