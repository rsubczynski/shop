import { Product } from 'src/app/models/app-product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filterProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products: Product[]) => {
      this.filterProducts = this.products = products;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    console.log(this.filterProducts);
    this.filterProducts = (query) ?
      this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }
}
