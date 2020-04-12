import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { Parse } from '../app.parse';

//Form includes
//import {FormsModule, NgForm} from '@angular/forms';
//import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
//Include authenticate service
import { AuthenticationService } from "../_services/authentication.service";
import {NgForm} from "@angular/forms";
import {Title} from "@angular/platform-browser";
//import {log} from "util";

/*import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@services/authentication.service';*/

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  private route: ActivatedRoute;
  /*router: Router;*/router;
  private authenticationService;
  username: String;
  password: String;
  public wrongPassword = false;

  /*loginForm: FormGroup;
  private formBuilder: FormBuilder;*/

  constructor(authenticationService: AuthenticationService, router: Router,title: Title){
    title.setTitle('Login');
    this.router = router;
    this.authenticationService = authenticationService;
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/admin/list']);
    }
  }

  ngOnInit(){

  }

  onSubmit() {
    console.log(this.username);
    console.log(this.password);
    this.authenticationService.login(this.username, this.password)
        .then(
            data => {
              if(typeof data.success === 'undefined') alert('Authentication service is down!');
              if(data.success) this.router.navigate(['/admin/list']);
              this.wrongPassword = true;

            });
  }

    /*let user = this.parse.parse.User
        .logIn("admin", "admin").then(function(user) {
          console.log('User logged in successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
        }).catch(function(error){
          console.log("Error: " + error.code + " " + error.message);
        });*/


/*  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.error = error;
              this.loading = false;
            });
  }*/

}
