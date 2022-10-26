import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  active1: boolean;

  constructor() {
    this.active1 = true;
  }

  ngOnInit(): void {

  }

}
