import { Location } from "./../../app.location";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { DateService } from "../../../../shared/services/date.service";
import { DetailsService } from "./../../details.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Place } from "../../app.place";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-details-list",
  templateUrl: "./details-list.component.html",
  styleUrls: ["./details-list.component.scss"]
})
export class DetailsListComponent implements OnInit {
  @Input() list: Place[];
  @Input() isNotEditable: boolean;
  @Output() deleteEmitter = new EventEmitter();

  dropdownIconImg = "assets/icons/down-chevron.svg";
  editIconImage = "assets/icons/pen.svg";
  removeIconImage = "assets/icons/closeIcon.svg";
  dropdownIconColor = "#10645D";
  editIconsColor = "#10645D";

  placeToDelete: object;
  locationToUpdate: Location;

  dropdownIconBigSize = 38;
  dropdownIconMediumSize = 28;
  dropdownIconSmallSize = 18;

  modalAcceptProps = {
    text: "Да",
    type: "button",
    isFullWidth: true
  };

  modalDeclineProps = {
    text: "Нет",
    type: "button",
    isFullWidth: true,
    isModalDecline: true
  };

  modalEditProps = {
    text: "Изменить",
    type: "button",
    isFullWidth: true
  };

  modalNoEditProps = {
    text: "Отменить",
    type: "button",
    isFullWidth: true
  };

  locationDescriptionForm: FormGroup;

  dropdownButtonClickListener(place: any) {
    if (typeof place.hidden === "undefined") {
      place.hidden = true;
    } else {
      place.hidden = !place.hidden;
    }
  }

  destinationDeleteHandler(modalContent: any, place: object) {
    this.placeToDelete = place;
    this.open(modalContent);
  }

  editDescriptionHandler(modalContent: any, location: Location) {
    this.locationToUpdate = location;
    this.locationDescriptionForm.setValue({
      description: location.description
    });
    this.openEditModal(modalContent);
  }

  emitPlaceToDelete(): void {
    let updatedList = this.detailsService.deletePlaceFromList(this.list, this.placeToDelete);
    this.deleteEmitter.emit(updatedList);
  }
  emitLocationDescription(): void {
    let updatedList = this.detailsService.updateLocationDescription(
      this.list,
      this.locationToUpdate,
      this.locationDescriptionForm.value.description
    );
    this.deleteEmitter.emit(updatedList);
  }

  modalOptions = {
    centered: true,
    windowClass: "modalDelete"
  };

  openEditModal(modalContent: any) {
    this.modalService.open(modalContent, this.modalOptions).result.then(
      result => {
        if (result === "accept") {
          this.emitLocationDescription();
        }
      },
      reason => {}
    );
  }

  open(modalContent: any) {
    this.modalService.open(modalContent, this.modalOptions).result.then(
      result => {
        if (result === "accept") {
          this.emitPlaceToDelete();
        }
      },
      reason => {}
    );
  }

  getDate(dates: number[]): string {
    return this.dateService.getParsedDates(dates);
  }

  constructor(
    private dateService: DateService,
    private detailsService: DetailsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.locationDescriptionForm = this.formBuilder.group({
      description: [""]
    });
  }
}
