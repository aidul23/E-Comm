import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller: SellerService) {
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  ngOnInit() {
    this.seller.reloadSeller();
  }
}
