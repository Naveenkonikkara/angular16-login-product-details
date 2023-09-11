import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../model/user';
import { LoginService } from '../services/login.service';

const usersKey = 'angular-16-login-users';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public userLoggedIn: boolean = false;
  public loading: boolean = false;
  public submitted: boolean = false;
  public registeredUser: boolean = false;
  public user!: User | null;
  public loginError: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.isRegisteredUser();
  }

  isRegisteredUser() {
    this.registeredUser = JSON.parse(localStorage.getItem(usersKey)!)
      ? true
      : false;
  }

  get loginfrm() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userLoggedIn = true;
    this.loginError = {};

    this.loginService
      .login(this.loginfrm.userName.value, this.loginfrm.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/products/']);
        },
        error: (error) => {
          this.loginError = error;
          console.log(error);
          this.loginForm.reset();
          this.loading = false;
        },
      });
  }

  onRegister(): void {
    const user: User = {
      username: 'Admin',
      password: 'Admin',
    };
    this.loginService.register(user).subscribe((res) => {
      console.log(res);
      alert(
        'User Registered with Username: ' +
          user.username +
          ', Password: ' +
          user.password
      );
      this.registeredUser = true;
    });
  }
}
