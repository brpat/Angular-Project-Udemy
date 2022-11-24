import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  public userIsAuthenticated: boolean = false;
  private authListernerSubs: Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authListernerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
    }); 
  }

  ngOnDestroy(): void {
    this.authListernerSubs.unsubscribe();
  }

}
