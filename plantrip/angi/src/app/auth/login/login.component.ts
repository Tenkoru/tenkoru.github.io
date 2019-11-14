import { AuthService } from '../authentication/auth.service';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  submitButtonProps = {
    auth:  true,
    text: "Войти",
    type: "submit"
  };

  telProps = {
    auth: true,
    text: "Введите номер телефона или почту",
    required: true
  };

  passwordProps = {
    auth: true,
    text: "Введите пароль",
    required: true,
    password: true
  };

  links = [
    {
      text: "Зарегистрироваться",
      link: "../register"
    },
    {
      text: "Забыли пароль?",
      link: "../reset"
    }
  ];

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}
}
