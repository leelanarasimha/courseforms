import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  signup(f: NgForm) {
    let email = f.value.email;
    let password = f.value.password;
    this.authservice.signupUser(email, password);
  }

}
