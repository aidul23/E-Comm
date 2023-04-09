import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { LogIn, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient,
    private router: Router) { }

  userSignUp(data: SignUp) {
    return this.http.post('http://localhost:3000/seller',data,{observe: 'response'}).subscribe((result) => {
    this.isSellerLoggedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body));   
    this.router.navigate(['seller-home']);
    });
  }

  reloadSeller() {
    if(localStorage.getItem('seller')) {
      localStorage.removeItem('seller');
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: LogIn) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result: any) => {
      console.log(result);
      if(result && result.body.length) {
        console.log("user logged in");
        localStorage.setItem('seller',JSON.stringify(result.body));   
        this.router.navigate(['seller-home']);
      } else {
        console.log("user not registered");
        this.isLoginError.emit(true);
      }
    })
  }
}
