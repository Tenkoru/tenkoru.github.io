import { Component, OnInit, Input } from '@angular/core';
import { Friends } from '../friends';

@Component({
  selector: 'app-friendsList',
  templateUrl: './friendsList.component.html',
  styleUrls: ['./friendsList.component.scss']
})
export class FriendsListComponent implements OnInit {

  @Input() friendsLists: Friends;

  unacceptedListTitle = "Заявки в друзья";
  acceptedListTitle = "Мои друзья";


  constructor() { }

  ngOnInit() {
  }

}
