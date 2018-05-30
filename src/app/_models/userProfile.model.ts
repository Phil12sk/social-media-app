import { Photo } from './photo.model';
import { Login } from './login.model';
import { Post } from './post.model';

export interface UserProfile{
    name?: string,
    login?: Login,
    profileImage?: string,
    photos?: Photo,
    post?: Post
}