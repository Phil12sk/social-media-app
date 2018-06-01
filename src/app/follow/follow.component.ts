import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../_models/userProfile.model';
import { Login } from '../_models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  public userProfile: UserProfile;
  public userLogged = localStorage.getItem('userLogged');
  public loginUser: Login;
  public users: any;

  constructor(public router: Router) { }

  loadFollowing(){
    let userInfos = JSON.parse(localStorage.getItem('userInfos'));
    let usersUnfollowed = JSON.parse(localStorage.getItem('usersUnfollowed'));
    let newObj = [];
    for(let i = 0; i < userInfos.length; i++){
      if(this.userLogged != userInfos[i]['login']['email']){
        let item = {}
        item['profileImage'] = userInfos[i]['profileImage'];
        item['name'] = userInfos[i]['name'];
        item['userEmail'] = userInfos[i]['login']['email'];
        newObj.push(item);
      }
    }
    this.users = newObj;
  }

  perfilChoosed(event){
    localStorage.setItem('perfilChoosed', event.target.id);
    this.router.navigate(['/profile'])
  }

  ngOnInit() {
    this.loadFollowing()
    this.userProfile = {
      name: localStorage.getItem('userName'),
      login: this.loginUser = {
        email: localStorage.getItem('userLogged')
      },
      profileImage: localStorage.getItem('userProfileImage'),
    }
  }

}
