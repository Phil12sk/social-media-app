import { Router } from "@angular/router";

export class LoginService{
    constructor(){}

    checkUserLogged(){
        let userLogged = localStorage.getItem('userLogged');
        if(userLogged == "" || userLogged == null || userLogged == undefined){
            return false;
        }
    }

}