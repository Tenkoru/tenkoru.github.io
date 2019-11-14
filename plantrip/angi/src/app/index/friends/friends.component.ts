import { Subscription } from 'rxjs';
import { FriendsService } from './friends.service';
import { Component, OnInit } from '@angular/core';
import { Friends } from './friends';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends: Friends;
  friendsSubscription: Subscription;
  constructor(private friendsService: FriendsService) { }

  ngOnInit() {
    this.friendsSubscription = this.friendsService.getFriendsList().subscribe(friendsLists => {
      this.friends = friendsLists;
    });
  }
  ngOnDestroy() {
    if (typeof this.friendsSubscription !== "undefined") {
      this.friendsSubscription.unsubscribe();
    }
  }

}
