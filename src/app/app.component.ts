import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApigatewayService } from './service/apigateway.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public labels = ['Log Out'];
  public currentUser;
  constructor(
    private menu: MenuController,
    private router: Router,
    private apiService: ApigatewayService
  ) {}

  ngOnInit() {
    this.apiService.login.subscribe((e) => {
      console.log('login');
      this.currentUser = e;
    });
    this.getUser();
  }

  getUser() {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      this.apiService.currentUser = JSON.parse(currentUser);
      this.currentUser = this.apiService.currentUser;
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.menu.enable(false);
    this.router.navigateByUrl('/login');
  }
}
