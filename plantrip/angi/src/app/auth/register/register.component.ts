import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor() {}

  submitButtonProps = {
    auth: true,
    text: "Зарегистрироваться",
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

  passwordRepeatProps = {
    auth: true,
    text: "Повторите пароль",
    required: true,
    password: true
  };

  backArrowProps = {
    className: "auth__back-arrow",
    link: "../login",
  };

  titleProps = {
    className: "auth__title--smaller",
    text: "Регистрация"
  };

  ngOnInit() {}
}
