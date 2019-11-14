import { Friend } from './../../friend';
import { Component, OnInit, Input } from '@angular/core';
import { FriendsService } from '../../friends.service';

@Component({
  selector: 'app-friendsCard',
  templateUrl: './friendsCard.component.html',
  styleUrls: ['./friendsCard.component.scss']
})
export class FriendsCardComponent implements OnInit {

  @Input() card: Friend;
  @Input() isAccepted: boolean;
  link = "";

  constructor(private friendsService: FriendsService) { }

  buttonHandler() {
    this.friendsService.sendRequesAcception(this.card).subscribe();
  }

  ngOnInit() {
    this.link = `dashboard/${this.card.email}`;
  }
}
