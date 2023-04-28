import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | Product;
  productMessage: undefined | string;

  constructor(private route: ActivatedRoute, private router: Router, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((res) => {
      this.productData = res;
    });
  }

  submit(product: Product) {
    if(this.productData) {
      product.id = this.productData.id;
    }

    this.product.updateProduct(product).subscribe((res) => {
      if(res) {
        this.productMessage = "Product has updated!"
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigateByUrl('/seller-home');
    },3000);
    
  }

}
