import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService, private auth: AuthService) { }

  main: FormGroup;
  ngOnInit(): void {
    this.main = this.formBuilder.group({
      shopName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      address: new FormControl('', [Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
      telephone: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      detail: new FormControl('', [Validators.maxLength(100)]),
      domain: new FormControl('', [Validators.required]),
      // facebook: new FormControl(''),
      // instagram: new FormControl(''),
      // youtube: new FormControl(''),

    });

    this.api.getMerchData().subscribe(res => {
      const data = res.data.merchData;
      this.main.setValue({
        shopName: data.shopName,
        address: data.address,
        email: data.email,
        telephone: data.telephone,
        detail: data.detail,
        domain: data.domain,
        // facebook: data.facebook,
        // instagram: data.instagram,
        // youtube: data.youtube,
      }
      );
    });
  }

}
