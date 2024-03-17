'use client';

import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'eu-north-1_zQUtKKO6E',
    ClientId: '5vmrg89uahhek1p67l6iorkh5f'
};

const userPool = new CognitoUserPool(poolData);

let sessionUserAttributes;
let cognitoUser;

export function signUp(username, password) {
    return new Promise((resolve, reject) => {
        userPool.signUp(username, password, null, null, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.user);
            }
        });
    });
}

export async function signIn(username, password) {
    const authenticationData = {
        Username: username,
        Password: password,
    };
    cognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    try {
        const jwtToken = await authenticateUser(cognitoUser, authenticationDetails);
        return jwtToken;
    } catch (error) {
        throw error;
    }
}

function authenticateUser(cognitoUser, authenticationDetails) {
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
            onFailure: (err) => reject(err),
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                delete userAttributes.email;

                // store userAttributes on global variable
                sessionUserAttributes = userAttributes;

                // handle exception to prompt new password
                reject('New password required');
            }
        });
    });
}

export function changePassword(newPassword) {
    cognitoUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes, {
        onSuccess: function (result) {
            console.log('Password changed successfully');
        },
        onFailure: function (err) {
            console.error(err);
        }
    });
}

export function signOut() {
    if (cognitoUser != null) {
        cognitoUser.signOut();
        cognitoUser = null;
    }
}

export function getCurrentUser() {
    return userPool.getCurrentUser();
}