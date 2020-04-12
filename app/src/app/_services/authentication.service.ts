import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { Parse } from "../app.parse";
import {Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';



import { User } from '../_models/user';
import {reject} from "q";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    parse;
    private router: Router;
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(parse: Parse, router: Router) {
        this.parse = parse;
        this.router = router;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public isLoggedIn(){
        return (this.currentUserValue?true:false);

    }

    login(username: string, password: string) {
        return this.parse.parse.User
            .logIn(username, password).then(
                (user)=>{
                    console.log(user/*,user.getUsername()*/);
                    user.authdata = window.btoa(user.id+'-'/*+user.getUsername()*/);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    //this.router.navigate(['/admin/list']);
                    return {success:true};

            },(failure)=>{
                    console.log('Authentication service could not login you in');
                    //this.router.navigate(['/admin/login?errorlogin']);
                    return {success:false};
                }).catch(function(error){
                console.log("Error: " + error.code + " " + error.message);
            });


        /*return this.http.post(`http://localhost:1337/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));*/
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
