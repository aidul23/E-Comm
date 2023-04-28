import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | Product[];
  productMessage: undefined | string;

  deleteIcon = faTrash;
  updateIcon = faEdit;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.product.getProducts().subscribe((res) => {
      console.log(res);
      this.productList = res;
    });
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((res) => {
      if(res) {
        this.productMessage = "Product is deleted!"
        this.getProductList();
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000)
  }

}
