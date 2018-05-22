import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  items: any[];
  filteredItems: any[];
  subscription: Subscription;
  query = '';

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(items => {
      console.log('items: ', items);
      this.filteredItems = this.items = items;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearchChange(query: string) {
    console.log(query);
    this.query = query;
    this.filteredItems = this.items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
  }

}
