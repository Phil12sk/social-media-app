import { HttpModule, Http, RequestOptions, Headers } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalModule } from 'ngx-simple-modal';

import { Options } from 'selenium-webdriver/firefox';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AlertComponent, SafeHtmlPipe } from './alert/alert.component';
import { InitialInfos } from './initial/initial-infos';
import { PhotosComponent } from './photos/photos.component';
import { PostsService } from './_services/posts.service';
import { PhotosService } from './_services/photos.service';
import { LoginService } from './_services/login.service';
import { PerfilComponent } from './perfil/perfil.component';
import { FriendsComponent } from './friends/friends.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    AlertComponent,
    SafeHtmlPipe,
    PhotosComponent,
    PerfilComponent,
    FriendsComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    SimpleModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    LayoutComponent
  ],
  entryComponents: [
    AlertComponent
  ],
  providers: [
    LoginComponent,
    AlertComponent,
    InitialInfos,
    PostsService,
    PhotosService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
