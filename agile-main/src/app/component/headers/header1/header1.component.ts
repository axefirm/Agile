import { Component, Input, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {
  @Input() currentSection = 'home';

  constructor() { }

  loggedIn = false;
  user: SocialUser;
  merchData: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('facebook_auth'));

    this.merchData = JSON.parse(localStorage.getItem('merchData'));
    console.log(this.merchData);
    this.loggedIn = (this.user != null);
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('navbarCollapse').classList.toggle('show');
  }
}
