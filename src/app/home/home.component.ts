import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../_models/userProfile.model';
import { Login } from '../_models/login.model';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { Post } from '../_models/post.model';
import { PostsService } from '../_services/posts.service';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userProfile: UserProfile;
  public loginUser: Login;
  public postsUser: Post;
  public model: any = {};
  public userLogged = localStorage.getItem('userLogged');
  public getPosts = localStorage.getItem('postsUser');
  public feeds: any;
  constructor(
    public router: Router, 
    public alertComponent: AlertComponent,
    public postsService: PostsService,
    public loginService: LoginService
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

  loadPosts(){
    if(this.getPosts.length > 0){
      let jsonPosts = JSON.parse(this.getPosts);
      let newObj: any = []
      for(let i = (jsonPosts.length - 1); i >= 0; i--){
        if(jsonPosts[i]['user'] == this.userLogged){
          newObj.push(jsonPosts[i])
        }
      }
      this.feeds = newObj;
    }
  }

  checkUserLogged(){
    let checkLogin = this.loginService.checkUserLogged();
    if(checkLogin == false){
      this.router.navigate(["/"])
    }
  }

  logout(){
    localStorage.setItem('userLogged','');
    this.router.navigate(['/'])    
  }

  ngOnInit() {
    this.model.post = "";
    localStorage.setItem('firstAccess', 'true');
    this.checkUserLogged();
    this.loadPosts();
    this.userProfile = {
      name: localStorage.getItem('userName'),
      login: this.loginUser = {
        email: localStorage.getItem('userLogged')
      },
      profileImage: localStorage.getItem('userProfileImage'),
      post: this.postsUser = {
        user: localStorage.getItem('userLogged'),
        post: this.getPosts[this.userLogged]
      }
    }
    this.loadPosts();
  }
}