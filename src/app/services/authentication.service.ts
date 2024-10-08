import { HttpClient } from '@angular/common/http';
import { Observable, tap } from "rxjs";
import { Customer } from "src/app/model/customer.model";
import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }
  customerLoginState: boolean = false; //thử
  adminLoginState: boolean = false;
  customerInfo: any;
  userLogin: any;
  username:any

  userLoginEmitter: EventEmitter<string> = new EventEmitter<string>();
  // userName: EventEmitter<string> = new EventEmitter<string>()
  customerStated: EventEmitter<boolean> = new EventEmitter<boolean>();
  adminStated: EventEmitter<boolean> = new EventEmitter<boolean>();

  LogOut() {
    this.adminLoginState = false
    this.customerLoginState = false
    this.customerStated.emit(this.customerLoginState)
    this.adminStated.emit(this.adminLoginState)
  }

  Register(cus: any) {
    return this.http.post('https://localhost:7069/api/Customers', cus);
  }

  Login(cus: any) {
    this.customerLoginState = true;
    return this.http.post<any>(
      'https://localhost:7069/api/Customers/signin',
      cus
    );
  }
  getCurrentUser(): Customer {
    return this.customerInfo.userId;
  }
  getCustomerListAPI(): Observable<any> {
    return this.http.get<any>('https://localhost:7069/api/Customers');
  }
  // GetCustomerById(idCus: number): Observable<Customer> {
  //     // return this.http.get<Customer>('https://localhost:7277/api/Customers/' + idCus.toString());
  // }
}
