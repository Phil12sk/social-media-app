import { UserUnfollow } from '../_models/userUnfollow.model';
export class UserUnfollowService {
	private userUnfollowed: UserUnfollow;
	unfollowUser(userId){
		let userLogged = localStorage.getItem('userLogged');
		this.userUnfollowed = {
			userUnfolllowed: userId
		}
		localStorage.setItem('usersUnfollowed', JSON.stringify(this.userUnfollowed));
	}
}