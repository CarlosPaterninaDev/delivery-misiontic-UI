import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UiService } from '../service/ui.service';
import { ApigatewayService } from '../service/apigateway.service';

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userForm: FormGroup;

  constructor(
    private menu: MenuController,
    private router: Router,
    private fb: FormBuilder,
    private uiService: UiService,
    private apiService: ApigatewayService
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  ionViewWillEnter() {
    const token = localStorage.getItem('token');

    if (token) {
      this.menu.enable(true).then((e) => {
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      });
    }

    this.menu.enable(false);
  }

  async handleSubmitUser() {
    await this.uiService.presentLoading();
    const user: User = this.userForm.value;

    console.log(user);

    this.apiService.authentication(user).subscribe(
      (e) => {
        localStorage.setItem('token', e.access);
        this.apiService.verify(e.access).subscribe((e) => {
          this.apiService.getAccountInfo(e.UserId).subscribe((e) => {
            const newUser = {
              name: user.username,
              balance: e.balance,
              userId: e.userId,
            };

            this.apiService.login.next(newUser);

            localStorage.setItem('user', JSON.stringify(newUser));

            this.router.navigateByUrl('/tabs', { replaceUrl: true });
            this.uiService.loading.dismiss();
          });
        });
      },
      (err) => {
        this.uiService.presentErrorToast(
          'Usuario no existe, intente con otras credenciales'
        );
        this.uiService.loading.dismiss();
      }
    );

    // this.authService.searchUser(user).subscribe(
    //   () => {
    //     this.loginForm.patchValue({ ...this.userForm.value });
    //     this.getEmpresas(this.userForm.value.usuario);
    //     this.moveSlides(1);
    //     this.uiService.loading.dismiss();
    //   },
    //   (error) => {
    //     this.uiService.presentErrorToast(error);
    //     this.uiService.loading.dismiss();
    //   }
    // );
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
}
