import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(public dialog: MatDialog, private api: ApiService) { }
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  menuList: any;
  _categories: any;
  selected: any;

  categoryName: string;

  subselected: any;
  public theBoundCallback: Function;

  ngOnInit(): void {
    this.theBoundCallback = this.onChange.bind(this);
    this.api.getCategories().subscribe(res => {
      if (res.success) {
        this.menuList = res.data.categories;
        console.log(this.menuList);
      }
    })
  }
  addCategory(type) {
    this.categoryName = '';
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { categoryName: this.categoryName, title: type == 0 ? 'Шинэ ангилал нэмэх' : 'Дэд ангилал нэмэх' }
    });
    console.log(this.selected);
    dialogRef.afterClosed().subscribe(result => {
      if (result?.status == 1) {
        if (type == 0) {
          // Ангилал нэмэх
          let req = { categoryName: '', shopId: '' };
          req.categoryName = result.categoryName;
          req.shopId = sessionStorage.getItem('shopId');
          this.api.addCategory(req).subscribe(res => {
            if (res.success) {
              this.api.getCategories().subscribe(resCategory => {
                console.log(resCategory);
                this.menuList = resCategory.data.categories;
              })
            }
          })
        } else if (type == 1) {
          // Дэд ангилал нэмэх

          let req = { categoryName: '', shopId: '', parentId: '' };
          req.categoryName = result.categoryName;
          req.shopId = sessionStorage.getItem('shopId');
          req.parentId = this.selected._id;
          this.api.addCategory(req).subscribe(res => {
            if (res.success) {
              this.api.getCategories().subscribe(resCategory => {
                this.menuList = resCategory.data.categories;
              })
            }
          })
        }
      }
    });
  }


  onChange(e) {
    console.log(e);
    this.selected = e.value;
    console.log(this.selected);
  }

  changeName() {
    this.categoryName = this.selected.categoryName;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { categoryName: this.categoryName, title: 'Ангилалын нэр солих' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.status == 1) {
        let req = { categoryName: result.categoryName, _id: this.selected._id };
        this.api.updateNameOfCategory(req).subscribe(res => {
          if (res.success) {
            this.api.getCategories().subscribe(resCategory => {
              this.menuList = resCategory.data.categories;
            })
          } else {
            alert(res.data.message);
          }
        })
      }
    });
  }

  delete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: 'Ангилалын нэр солих', description: 'Энэхүү ангилалыг устгахдаа итгэлтэй байна уу?', button: 'Устгах' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.status == 1) {
        let req = { _id: this.selected._id };
        this.api.deleteCategory(req).subscribe(res => {
          if (res.success) {
            this.api.getCategories().subscribe(resCategory => {
              this.menuList = resCategory.data.categories;
            })
          } else {
            alert(res.data.message);
          }
        })
      }
    });
  }
}
