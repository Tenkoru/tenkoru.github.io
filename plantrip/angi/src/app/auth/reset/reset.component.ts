import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.scss"]
})
export class ResetComponent implements OnInit {
  constructor() {}

  getCodeButtonProps = {
    auth: true,
    fade: true,
    text: "Получить код",
    type: "submit"
  };

  telProps = {
    auth: true,
    text: "Введите номер телефона или почту",
    required: true
  };

  codeProps = {
    auth: true,
    text: "Введите код",
    required: true
  }

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
    text: "Востановление пароля"
  };

  submitButtonProps = {
    auth: true,
    text: "Войти",
    type: "submit"
  };

  links = [
    {
      text: "Получить код ещё раз",
      link: "",
    }
  ];
  ngOnInit() {}
}
