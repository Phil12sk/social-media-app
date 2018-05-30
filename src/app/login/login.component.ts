import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserProfile } from '../_models/userProfile.model';
import { Login } from '../_models/login.model';
import { AlertComponent } from '../alert/alert.component';
import { InitialInfos } from '../initial/initial-infos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login: Login;
  public user1: Login;
  public user2: Login;
  public userProfile: UserProfile;
  
  public model: any = {};
  constructor(
    public router: Router,
    public alertComponent: AlertComponent,
    public initialInfos: InitialInfos
  ) {}

  checkFields(event){
    if(this.login.email == "" || this.login.password == ""){
      let mes = '<p style="color:red;">Please, fill the fields "Email" and "Password"</p>'
      this.alertComponent.showAlert(mes);
    }else{
      if(
      (this.login.email == this.user1.email && this.login.password == this.user1.password)||
      (this.login.email == this.user2.email && this.login.password == this.user2.password)
      ){
        localStorage.setItem('userLogged', this.login.email);
        this.router.navigate(["/home"]);
      }else{
        let mes = '<p style="color:red;">Wrong user or password, check it again, please</p>'
        this.alertComponent.showAlert(mes);
      }
    }
  }

  ngOnInit(){
    this.initialInfos.setInitialInfos();
    this.login = {
      email: "",
      password: ""
    }
    this.user1 = {
      email: localStorage.getItem('user1Email'),
      password: atob(localStorage.getItem('password1'))
    }
    this.user2 = {
      email: localStorage.getItem('user2Email'),
      password: atob(localStorage.getItem('password2'))
    }
    this.userProfile = {
      profileImage: localStorage.getItem('user1ProfileImage')
    }
  }
}