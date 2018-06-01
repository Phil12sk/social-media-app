import { UserUnfollowed } from '../_models/user-unfollowed.model';
export class UserUnfollowedService {
	private userUnfollowed: UserUnfollowed;
	unfollowedUser(userID){
		let userLogged = localStorage.getItem('userLogged');
		this.userUnfollowed = {
			user: userLogged,
			userUnfolllowed: userID
		}
		console.log(this.userUnfollowed)
	}
}