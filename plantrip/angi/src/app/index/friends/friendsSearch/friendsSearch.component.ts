import { FriendsService } from "./../friends.service";
import { Validators } from "@angular/forms";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-friendsSearch",
  templateUrl: "./friendsSearch.component.html",
  styleUrls: ["./friendsSearch.component.scss"]
})
export class FriendsSearchComponent implements OnInit {
  requestForm: FormGroup;
  buttonImage = "assets/icons/plus.svg";
  iconColor = "#019287";
  iconHoverColor = "#ffffff";
  iconCurrentColor = this.iconColor;

  submitClasses = {
    submitText: true,
    submitOk: false,
    submitError: true
  };
  inputClasses = {
    "input input__common friends_input": true,
    isFilled: ""
  };
  submitMessageText = "";
  currentUserEmail: string;

  submitError: string;

  mousehover(): void {
    this.iconCurrentColor = this.iconHoverColor;
  }
  mouseleave(): void {
    this.iconCurrentColor = this.iconColor;
  }
  submit() {
    this.friendsService.trySubmitRequest(this.requestForm).subscribe(submitAnswer => {
      this.submitClasses.submitOk = submitAnswer.submitOk;
      this.submitClasses.submitError = submitAnswer.submitError;
      this.submitMessageText = submitAnswer.submitMessageText;
    })
  }

  constructor(private formBuilder: FormBuilder, private friendsService: FriendsService) {}

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      input: ["", [Validators.required, Validators.email]]
    });
    this.requestForm.valueChanges.subscribe(value => {
      this.inputClasses.isFilled = value.input;
    });
  }
}
