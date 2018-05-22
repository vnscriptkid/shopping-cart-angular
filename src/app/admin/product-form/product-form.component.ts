import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { take, catchError } from 'rxjs/operators';
import { Product } from '../../models/app-product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product: Product = {
    title: '',
    image: '',
    price: 0,
    category: '',
  };
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id param: ', this.id);
    if (this.id) {
      this.productService.getSingleProduct(this.id).pipe(take(1)).subscribe((item: Product) => {
        this.product = item;
        console.log('item from db: ', this.product);
      }, (err) => {
        console.log('err: ', err);
        this.router.navigate(['/admin/products']);
      });
    }
  }

  ngOnInit() {
  }

  saveProduct(form) {
    console.log('product', form.value);
    if (this.id) {
      // update this product
      this.productService.updateProduct(this.id, form.value).then(success => {
        console.log('success: ', success);
        console.log('redirecting...');
        this.router.navigate(['/admin/products']);
      });
    } else {
      // Create new one
      this.productService.save(form.value).then(result => {
        console.log('success: ', result);
        console.log('redirecting ...');
        this.router.navigate(['/admin/products']);
      });
    }
  }

  onDeleteClick(id: string) {
    if (confirm('Are you sure to delete the product ?')) {
      console.log('deleting');
      this.productService.deleteProduct(id).then(success => {
        console.log('success: ', success);
        this.router.navigate(['/admin/products']);
      });
    } else {
      console.log('no deleting');
    }
  }

}
