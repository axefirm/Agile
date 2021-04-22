import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  image: any;
  constructor(private router: Router, public formBuilder: FormBuilder, private api: ApiService) {
    // Reactive Form
    this.uploadForm = this.formBuilder.group({
      avatar: [null],
      name: ['']
    });
  }

  main: FormGroup;
  ngOnInit(): void {
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
      categories: new FormArray([
      ])
    });
  }

  get categories(): FormArray {
    return this.main.get('categories') as FormArray;
  }

  addSkills(param) {
    this.categories.push(this.formBuilder.group({ _id: param }));
    console.log(this.main.value);
  }


  imageURL: string;
  uploadForm: FormGroup;



  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  // Submit Form
  submit() {
    if (this.main.valid) {
      this.api.addProduct(this.main.value).subscribe(res => {
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
