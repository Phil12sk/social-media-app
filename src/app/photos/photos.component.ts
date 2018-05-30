import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../_services/photos.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { Photo } from '../_models/photo.model';
import { EventListener } from '@angular/core/src/debug/debug_node';
declare var $: any;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  public photo: Photo
  public photos: any;
  constructor(
    public router: Router, 
    public alertComponent: AlertComponent,
    public photosService: PhotosService
  ) { }
  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    let file:File = inputValue.files[0];
    let fileName = inputValue.files[0].name;
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      localStorage.setItem('imageUploaded', myReader.result);
      localStorage.setItem('namePhoto', fileName);
      document.getElementById('teste').click();
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

  ngOnInit() {
    let getPhotos = localStorage.getItem('photosUser');
    if(getPhotos.length > 0){
      let jsonPhotos = JSON.parse(getPhotos);
      let newObj: any = []
      for(let i = (jsonPhotos.length - 1); i >= 0; i--){
        newObj.push(jsonPhotos[i])
      }
      this.photos = newObj;
    }
  }

}
