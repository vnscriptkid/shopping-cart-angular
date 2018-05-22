import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  items$: Observable<any[]>;
  constructor(private productService: ProductService) {
    // this.productService.getAll().subscribe(items => {
    //   console.log('items: ', items);
    // });
    this.items$ = this.productService.getAll();
  }

  ngOnInit() {
  }

}
