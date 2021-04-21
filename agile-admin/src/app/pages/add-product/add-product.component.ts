import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  image: any;
  constructor(private router: Router, public formBuilder: FormBuilder) {
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
      productPrice: new FormControl(''),
      productSale: new FormControl(''),
      productTotalCount: new FormControl(''),
      productDescription: new FormControl(''),
      productStatus: new FormControl(''),
      hasDeliver: new FormControl(''),
      controlTotalCount: new FormControl(''),
    });
  }

  addProduct() {
    this.router.navigate(['register']);
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
    console.log(this.main.value);
  }
}
