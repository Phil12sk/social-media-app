import { UserProfile } from "../_models/userProfile.model";
import { Post } from "../_models/post.model";

export class PostsService{
    constructor(){}
    public newPost: Post
    sendPost(userName, post, time){
        let userEmail = localStorage.getItem('userLogged');
        let checkPosts = localStorage.getItem('postsUser');
        if(checkPosts.length > 0){
            let posts = JSON.parse(localStorage.getItem('postsUser'))
            this.newPost = {
                userName: userName,
                userEmail: userEmail,
                post: post,
                timePosted: time
            }
            posts.push(this.newPost);
            localStorage.setItem('postsUser', JSON.stringify(posts));
        }else{
            this.newPost = {
                userName: userName,
                userEmail: userEmail,
                post: post,
                timePosted: time
            }
            localStorage.setItem('postsUser', JSON.stringify([this.newPost]));
        }
        window.location.reload();
    }
}