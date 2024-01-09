import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login:any;
  userId:any;
  Name:any;
  isLoginPage: boolean = false;
  isSignupPage: boolean = false;

  constructor(private service: SharedService,private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login'; // Modify this condition based on your login route
        this.isSignupPage = this.router.url === '/signup'; // Modify this condition based on your login route
      }
    });
  }
  ngOnInit(): void {debugger
    this.login=this.service.getUserName();
    this.userId=this.service.getUserID();
    console.log(this.login);

   this.Name =sessionStorage.getItem('UserName')
  }
  title = 'Hospital';
  isSidebarOpen = false;

  

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  
}
