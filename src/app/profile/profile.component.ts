import { Component, OnInit } from '@angular/core';
import { UserUnfollowService } from '../_services/userUnfollow.service';
import { UserProfile } from '../_models/userProfile.model';
import { Login } from '../_models/login.model';
import { Photo } from '../_models/photo.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	public perfilChoosed = localStorage.getItem('perfilChoosed');
	public getPosts = localStorage.getItem('postsUser');
	public getPhotos = localStorage.getItem('photosUser');
	public userProfile: UserProfile;
	public login: Login;
	public photo: Photo
	public feeds: any;
	public checkFollow: any;
  	public photos: any;

  	constructor(
  		public userUnfollowService: UserUnfollowService) { }

  	loadPosts(){
  		if(this.getPosts.length > 0){
      		let jsonPosts = JSON.parse(this.getPosts);
      		let newObj: any = []
      		for(let i = (jsonPosts.length - 1); i >= 0; i--){
        		if(jsonPosts[i]['userEmail'] == this.perfilChoosed){
          			newObj.push(jsonPosts[i])
        		}
      		}
      		this.feeds = newObj;
    	}
  	}
	followUnfollowUser(event){
		let userId = event.target.id;
		if(this.checkFollow == "Follow"){
			this.userUnfollowService.followUser(userId)
		}else{
			this.userUnfollowService.unfollowUser(userId);
		}
    }

  	loadPhotos(){
    	if(this.getPhotos.length > 0){
    		let jsonPhotos = JSON.parse(this.getPhotos);
    		let newObj: any = []
    		for(let i = (jsonPhotos.length - 1); i >= 0; i--){
    			if(jsonPhotos[i]['user'] == this.perfilChoosed)
      		newObj.push(jsonPhotos[i])
    		}
    		this.photos = newObj;
    	}
  	}

  	loadUser(){
	  	let userInfos = JSON.parse(localStorage.getItem('userInfos'));
	  	for(let i = 0; i < userInfos.length; i++){
	  		if(userInfos[i]['login']['email'] == this.perfilChoosed){
	  			this.userProfile = {
	  				login: this.login = {
	  					email: userInfos[i]['login']['email']
	  				},
	  				name: userInfos[i]['name'],
	  				profileImage: userInfos[i]['profileImage']
	  			}		
	  		}
	  	}
  	}

  	ngOnInit() {
  		this.loadPosts();
  		this.loadPhotos();
		this.loadUser();
		if(localStorage.getItem('usersUnfollowed').length > 0){
			let getUsersUnfollowed = JSON.parse(localStorage.getItem('usersUnfollowed'));
			if(getUsersUnfollowed['userUnfollowed'] == this.perfilChoosed){
				this.checkFollow = "Follow"
			}else{
				this.checkFollow = "Unfollow"
			}
		}else{
			this.checkFollow = "Unfollow"
		}
  	}
}
