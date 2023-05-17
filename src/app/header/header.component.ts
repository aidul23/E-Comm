import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = "default";
  sellerName: string = ""; 
  searchResults: undefined | Product[];

  constructor(private router: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((route: any) => {
        if(route.url) {
          if(localStorage.getItem("seller") && route.url.includes("seller")) {
              this.menuType = "seller";
              if(localStorage.getItem("seller")) {
                let sellerStore = localStorage.getItem("seller");
                let sellerData = sellerStore && JSON.parse(sellerStore)[0];
                this.sellerName = sellerData.name;
              }
          }
          else {
              this.menuType = "default";
          }
        }
    });
  }

  onSearch(val: string) {
    console.log(val);
    this.router.navigate([`search/${val}`]);
  }

  searchProduct(query: KeyboardEvent) {
    if(query) {
      const elements = query.target as HTMLInputElement;
      this.product.searchProducts(elements.value).subscribe((res) => {
        if(res.length>5)
        {
          res.length = 5;
        }
        this.searchResults = res;
      });
    }
  }

  hideSearch() {
    this.searchResults = undefined;
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  
}
