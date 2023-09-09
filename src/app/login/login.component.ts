import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // public loginForm!: FormGroup;
  loginForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public userLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   userName: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    // });
  }

  onLogin(): void {
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.userLoggedIn = true;
      console.log(this.loginForm.value);
      this.router.navigate(['/products/']);
      // localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      // this.router.navigate(["/"]);
    }
  }
}
