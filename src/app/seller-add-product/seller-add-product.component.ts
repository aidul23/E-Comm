import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';


@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string|undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
  }

  submit(product: Product) {
    console.log(product);
    this.productService.addProduct(product).subscribe((res) => {
        console.log(res);
        if(res) {
          this.addProductMessage = "Product successfully added!";
        }
        setTimeout(() => this.addProductMessage = undefined,3000);
    });
  }

}
