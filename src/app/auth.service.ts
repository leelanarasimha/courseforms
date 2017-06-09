/**
 * Created by leelanarasimha on 28/05/17.
 */
import * as firebase from 'firebase';

export class AuthService {
    token: string;
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(error));

    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                firebase.auth().currentUser.getToken().then(
                    (token: string) => {
                        this.token = token;
                });
            })
        .catch (error => console.log(error));
    }

    getToken() {
         firebase.auth().currentUser.getToken().then(
            (token: string) => {
                this.token = token;
            }
        );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }


}
