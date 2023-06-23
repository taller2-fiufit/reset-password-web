import axios from 'axios';

const API_URL=process.env.VUE_APP_USERS_API_URL;

class PasswordResetService {
  resetPassword(token, new_password) {
    return axios.patch(API_URL + 'users/password', { 
        "password": new_password, 
        "passRecoveryToken": token
    });
  } 
}

export default new PasswordResetService();