import {Routes} from '@angular/router'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FollowComponent } from './follow/follow.component';
export const ROUTES: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'photos', component: PhotosComponent},
    {path: 'following', component: FollowComponent},
    {path: 'perfil', component: PerfilComponent},
]