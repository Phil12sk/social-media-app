import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../_models/userProfile.model';
import { Login } from '../_models/login.model';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { Post } from '../_models/post.model';
import { PostsService } from '../_services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userProfile: UserProfile;
  public loginUser: Login;
  public postsUser: Post;
  public model: any = {}
  public userLogged = localStorage.getItem('userLogged');
  public feeds: any
  constructor(
    public router: Router, 
    public alertComponent: AlertComponent,
    public postsService: PostsService
  ) { }

  goToPhotos(){
    this.router.navigate(["/photos"]);
  }

  erasePostArea(){
    this.model.post = "";
  }

  postText(){
    if(this.model.post != ""){
      this.postsService.sendPost(this.model.post);
    }else{
      let mes = '<p style="color:red;">Please, fill the textarea field to post something</p>';
      this.alertComponent.showAlert(mes)
    }
    this.model.post = "";
  }

  ngOnInit() {
    this.model.post = "";
    let getPosts = localStorage.getItem('postsUser');
    if(getPosts.length > 0){
      let jsonPosts = JSON.parse(getPosts);
      let newObj: any = []
      for(let i = (jsonPosts.length - 1); i >= 0; i--){
        newObj.push(jsonPosts[i])
      }
      this.feeds = newObj;
    }
    this.userProfile = {
      name: localStorage.getItem('userName'),
      login: this.loginUser = {
        email: localStorage.getItem('userLogged')
      },
      profileImage: localStorage.getItem('userProfileImage'),
      post: this.postsUser = {
        user: localStorage.getItem('userLogged'),
        post: getPosts[this.userLogged]
      }
    }
  }
}