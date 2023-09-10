import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../model/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public userLoggedIn: boolean = false;
  public loading = false;
  public submitted = false;

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
  }

  get loginfrm() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;
    // console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userLoggedIn = true;

    this.loginService
      .login(this.loginfrm.userName.value, this.loginfrm.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/products/']);
        },
        error: (error) => {
          // this.alertService.error(error);
          console.log(error);
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
    });
  }
}
