import { UserUnfollow } from '../_models/userUnfollow.model';
export class UserUnfollowService {
	private userUnfollowed: UserUnfollow;
	unfollowUser(userId){
		this.userUnfollowed = {
			userUnfollowed: userId
		}
		localStorage.setItem('usersUnfollowed', JSON.stringify(this.userUnfollowed));
	}

	followUser(userId){
		let usersUnfol = JSON.parse(localStorage.getItem('usersUnfollowed'));
		if(usersUnfol.length > 0){
			for(let i = 0; i < usersUnfol.length; i++){
				if(usersUnfol[i]['userUnfollowed'] == userId){
					delete usersUnfol.userUnfollowed
				}
			}
			localStorage.setItem('usersUnfollowed', JSON.stringify(usersUnfol));
		}else{
			localStorage.setItem('usersUnfollowed', '');
		}
	}
}