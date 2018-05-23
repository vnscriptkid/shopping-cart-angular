import { CartService } from './../cart.service';
import { CategoryService } from './../category.service';
import { Product } from './../models/app-product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [];
  filteredProducts = [];
  categories$;
  query: string;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {
    this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      console.log('products: ', this.products);
    });
    this.categories$ = this.categoryService.getCategories();
   }

  ngOnInit() {
  }

  onCategorySelect(cat: string) {
    console.log('click: ', cat);
    this.query = cat;
    if (cat === 'all') {
      return this.filteredProducts = this.products.concat();
    }
    this.filteredProducts = this.products.filter(p => p.category === this.query);
  }

  onCartClick(product) {
    console.log('product to add: ', product);
    this.cartService.addItemToCart(product);
  }
}
