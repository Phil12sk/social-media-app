import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../_services/photos.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { Photo } from '../_models/photo.model';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  public photo: Photo
  public photos: any;
  public userLogged = localStorage.getItem('userLogged');
  constructor(
    public router: Router, 
    public alertComponent: AlertComponent,
    public photosService: PhotosService,
    public loginService: LoginService
  ) { }
  changeListener($event) : void {
    let fileSize = $event.target.files[0].size;
    let fileType = $event.target.files[0].name.split('.')[1];
    console.log(fileSize);
    console.log(fileType)
    if(fileSize > 1024000){
      let mes = '<p style="color:#EA4335;">Files can not be bigger than 1MB</p>';
      this.alertComponent.showAlert(mes);
      (<HTMLInputElement>document.getElementById('openPhotoSelection')).value = ""
    }else{
      if(fileType == "png" || fileType == "jpg" || fileType == "jpeg"){
        this.readThis($event.target);
      }else{
        let mes = '<p style="color:#EA4335;">Only files with extensions .png, .jpeg or .jpg will be accepted</p>';
        this.alertComponent.showAlert(mes);
        (<HTMLInputElement>document.getElementById('openPhotoSelection')).value = ""
      }
    }
  }

  readThis(inputValue: any) : void {
    let file:File = inputValue.files[0];
    let fileName = inputValue.files[0].name;
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      localStorage.setItem('imageUploaded', myReader.result);
      localStorage.setItem('namePhoto', fileName);
      document.getElementById('btnSendData').click();
    }
    myReader.readAsDataURL(file);
  }

  sendData(){
    this.photo = {
      namePhoto: localStorage.getItem('namePhoto'),
      photo: localStorage.getItem('imageUploaded'),
      user: localStorage.getItem('userLogged')
    }
    this.photosService.uploadPhoto(this.photo)
  }

  addPhotos(){
    document.getElementById('openPhotoSelection').click();
  }

  checkUserLogged(){
    let checkLogin = this.loginService.checkUserLogged();
    if(checkLogin == false){
      this.router.navigate(["/login"])
    }
  }

  ngOnInit() {
    this.checkUserLogged();
    let getPhotos = localStorage.getItem('photosUser');
    if(getPhotos.length > 0){
      let jsonPhotos = JSON.parse(getPhotos);
      let newObj: any = []
      for(let i = (jsonPhotos.length - 1); i >= 0; i--){
        if(jsonPhotos[i]['user']==this.userLogged){
          newObj.push(jsonPhotos[i])
        }
      }
      this.photos = newObj;
    }
  }

}
