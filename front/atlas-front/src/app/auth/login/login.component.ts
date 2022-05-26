import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { JwtResponse } from '../../shared/model/data/JwtResponse.model';
import { LoginRequest } from '../../shared/model/data/LoginRequest.model';
import { UtilsServiceService } from '../../utils-service.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class NgxLoginComponent {
  showAlertError: any = false;
  auth: LoginRequest = new LoginRequest(
    '',
    ''
  );
  message = "Authentifizierungsfehler. Überprüfen Sie Ihre E-Mail oder Ihr Passwort ! ";
  viewPassword: boolean = false;

  constructor(private route: ActivatedRoute, public router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }


  onFormSubmit() {
    const auth = new LoginRequest(this.auth.username, this.auth.userPassword);
    this.login(auth);
  }

  changeViewPassword() {
    this.viewPassword = !this.viewPassword;
  }

  private login(auth: LoginRequest) {
    this.authService.signIn(auth).subscribe(response => {
      localStorage.setItem('token',response.token);
      localStorage.setItem('username', response.username);
      localStorage.setItem('userFirstName', response.userFirstName);
      localStorage.setItem('userLastName', response.userLastName);

      localStorage.setItem('roles', JSON.stringify(response.roles));
      this.router.navigateByUrl('admin/agencies/list-agency');
    }, error => {
      if (error.status === 404) {
        this.showAlertError = true;
      }
    });
  }
}

