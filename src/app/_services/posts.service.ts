import { UserProfile } from "../_models/userProfile.model";
import { Post } from "../_models/post.model";

export class PostsService{
    constructor(){}
    public newPost: Post
    sendPost(post){
        let userLogged = localStorage.getItem('userLogged');
        let checkPosts = localStorage.getItem('postsUser');
        if(checkPosts.length > 0){
            let posts = JSON.parse(localStorage.getItem('postsUser'))
            this.newPost = {
                user: userLogged,
                post: post
            }
            posts.push(this.newPost);
            localStorage.setItem('postsUser', JSON.stringify(posts));
        }else{
            this.newPost = {
                user: userLogged,
                post: post
            }
            localStorage.setItem('postsUser', JSON.stringify([this.newPost]));
        }
        window.location.reload();
    }
}