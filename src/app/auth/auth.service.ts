import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class AuthService {
    isAuthenticated = false;
    private tokenTimer: NodeJS.Timer;
    private token:string;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router:Router){

    }

    getToken():string{
        return this.token;
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    createUser(email:string, password:string){
        const authData :AuthData = {
            email:email,
            password:password
        };

        return this.http.post("http://localhost:3000/api/user/signup", authData)
        .subscribe(response => {
            this.router.navigate(["/"]);
        }, err => {
            this.authStatusListener.next(false);
        });
    }

    login(email:string, password:string){
        const authData :AuthData = {
            email:email,
            password:password
        };
        this.http.post<{token:string, expiresIn:number, userId:string}>("http://localhost:3000/api/user/login", authData)
        .subscribe(data =>{
            const token = data.token;
            const expiresIn = data.expiresIn;
            this.token = token;
            if(token){
                this.setAuthTimer(expiresIn);
                this.isAuthenticated = true;
                const now = new Date();
                this.userId = data.userId;
                const expiration = new Date(now.getTime() + expiresIn * 10000);
                this.saveAuthData(token, expiration, this.userId);

                //emit authStatus as logged in
                this.authStatusListener.next(true);
                this.router.navigate(['/']);
            }
        }, err =>{
            this.authStatusListener.next(false);
        });
    }

    private setAuthTimer(duration: number){
        this.tokenTimer = setTimeout(() =>{
            this.logout();
        }, duration * 10);
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private saveAuthData(token:string, expirationDate: Date, userId:string){
        localStorage.setItem('token',token)
        localStorage.setItem('expiration',expirationDate.toISOString())
        localStorage.setItem('userId',userId);
    }

    private getAuthData(){
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        if(!token && !expirationDate){
            return null;
        }
        return {
            token:token,
            expirationDate:new Date(expirationDate),
            userId:userId
        }

    }

    autoAuthUser(){
        const authInfo = this.getAuthData();
        if (!authInfo) return;
        const now = new Date();
        const expires = authInfo.expirationDate.getTime() - now.getTime();

        if (expires > 0) {
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.userId = authInfo.userId;
            this.setAuthTimer(expires /1000);
            this.authStatusListener.next(true);
        }
        
    }

    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    getUserId(){
        return this.userId;
    }
}