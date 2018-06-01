import { UserUnfollow } from '../_models/userUnfollow.model';
export class UserUnfollowService {
	private userUnfollowed: UserUnfollow;
	unfollowUser(userID){
		let userLogged = localStorage.getItem('userLogged');
		this.userUnfollowed = {
			user: userLogged,
			userUnfolllowed: userID
		}
		localStorage.setItem('usersUnfollowed', JSON.stringify(this.userUnfollowed));
	}
}