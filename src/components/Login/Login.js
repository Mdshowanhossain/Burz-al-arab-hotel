import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);
            history.replace(from);
            // ...
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    return (
        <div>
            <h1 style={{
                texAlign: 'center',
                marginTop: '30px',
                marginLeft: '800px',
                // fontSize: '0px'
            }}>Please Log In first</h1>
            <button
                style={{
                    texAlign: 'center',
                    marginTop: '30px',
                    marginLeft: '880px',
                    padding: '10px',
                    backgroundColor: 'orange',
                    border: 'none',
                    borderRadius: '10px',
                    color: 'black',
                    fontWeight: '700',
                    pointer: 'cursor',
                }}

                onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;