import { Component, OnInit } from '@angular/core';

import { Stock } from './stock';
import { DisplayService } from './display.service';

@Component({
  selector: 'display-page',
  templateUrl: './display.component.html',
  providers: [DisplayService]
})


export class DisplayComponent implements OnInit {
  stocks: Stock[];
  errorMsg: string;

  constructor(private displayService: DisplayService) {}

  getStock() {
    this.displayService.getStock().subscribe(
      stocks => this.stocks = stocks,
      error => this.errorMsg = <any>error);
  }

  ngOnInit(): void {
    this.getStock();
  }
}
