import { AppRoutingModule } from "./../app-routing.module";
import { BackArrowComponent } from "./back-arrow/back-arrow.component";
import { ButtonComponent } from "./button/button.component";
import { LabelComponent } from "./label/label.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedComponent } from "./shared.component";
import { LinkComponent } from "./link/link.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
  imports: [CommonModule, AngularSvgIconModule, AppRoutingModule],
  declarations: [
    SharedComponent,
    LabelComponent,
    ButtonComponent,
    LinkComponent,
    BackArrowComponent,
    TextareaComponent,
  ],
  exports: [LabelComponent, ButtonComponent, LinkComponent, BackArrowComponent, TextareaComponent,]
})
export class SharedModule {}
