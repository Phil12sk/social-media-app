import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../_services/photos.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { Photo } from '../_models/photo.model';
import { EventListener } from '@angular/core/src/debug/debug_node';

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
    window.addEventListener("storage", storageHandler, false);
    var storageHandler = function () {
      console.log('teste');
    };
    let file:File = inputValue.files[0];
    let fileName = inputValue.files[0].name;
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      localStorage.setItem('imageUploaded', myReader.result);
      localStorage.setItem('namePhoto', fileName);
    }
    window.addEventListener('storage', function(){
      console.log('foi aqui')
    })
    myReader.readAsDataURL(file);
    //this.photosService.uploadPhoto(photo)
  }
  uploadFile(event){
    console.log('1');
    /*console.log('1');
    let file = event.target.files[0];
    let ready = false;
    let reader = new FileReader();
    console.log(reader.result);
    reader.onloadend = function(){
      localStorage.setItem('imageUploaded', reader.result);
      localStorage.setItem('namePhoto', event.target.files[0].name);
      check();
    }*/
    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = (event) => {
      console.log(event)
      localStorage.setItem('imageUploaded', fileReader.result);
      //localStorage.setItem('namePhoto', event);
    }
    //reader.readAsDataURL(file);
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
