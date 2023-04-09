import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { LogIn, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin = false;
  authError: string = '';
  constructor(private seller: SellerService) {
  }

  ngOnInit() {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  LogIn(data: LogIn):void {
    this.authError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError = "Email or password is not correct";
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }
  
}
