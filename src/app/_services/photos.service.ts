import { UserProfile } from "../_models/userProfile.model";
import { Photo } from "../_models/photo.model";

export class PhotosService{
    constructor(){}
    public newPhoto: Photo

    uploadPhoto(photo){
        let userLogged = localStorage.getItem('userLogged');
        let checkPhotosUser = localStorage.getItem('photosUser');
        if(checkPhotosUser.length > 0){
            let photosUser = JSON.parse(localStorage.getItem('photosUser'));
            this.newPhoto = {
                namePhoto: photo['namePhoto'],
                user: userLogged,
                photo: photo['photo']
            }
            photosUser.push(this.newPhoto);
            localStorage.setItem('photosUser', JSON.stringify(photosUser));
        }else{
            this.newPhoto = {
                namePhoto: photo['namePhoto'],
                user: userLogged,
                photo: photo['photo']
            }
            localStorage.setItem('photosUser', JSON.stringify([this.newPhoto]));
        }
        //window.location.reload();
    }
}