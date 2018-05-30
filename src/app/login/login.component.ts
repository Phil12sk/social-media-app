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
  constructor(
    public router: Router,
    public alertComponent: AlertComponent,
    public initialInfos: InitialInfos
  ) {}

  checkFields(event){
    let userInfos = JSON.parse(localStorage.getItem('userInfos'));
    let existingUser = []
    
    for(let i = 0; i < userInfos.length; i++){
      let infos = {}
      infos['user'] = userInfos[i].login.email;
      infos['password'] = userInfos[i].login.password
      existingUser.push(infos);
    }

    if(this.login.email == "" || this.login.password == ""){
      let mes = '<p style="color:red;">Please, fill the fields "Email" and "Password"</p>'
      this.alertComponent.showAlert(mes);
    }else{
      let count = 0;
      for(let i = 0; i < existingUser.length; i++){
        if(this.login.email != existingUser[i]['user']){
          count++
        }else{
          if(this.login.password != atob(existingUser[i]['password'])){
            let mes = '<p style="color:red;">Wrong email or password</p>'
            this.alertComponent.showAlert(mes);
          }else{
            localStorage.setItem('userLogged', this.login.email);
            localStorage.setItem('userName', userInfos[i].name);
            localStorage.setItem('userProfileImage', userInfos[i]['profileImage']);
            this.router.navigate(["/home"]);
          }
        }
      }
      if(count == existingUser.length){
        let mes = '<p style="color:red;">Wrong email, please, check it again</p>'
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
  }
}