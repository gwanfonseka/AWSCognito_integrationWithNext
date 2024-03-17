'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { signIn, changePassword } from '@/lib/cognito';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isPasswordChangeRequired, setIsPasswordChangeRequired] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const jwtToken = await signIn(email, password);
            console.log('jwtToken:', jwtToken);
            // Redirect to the home page after successful login
            // TO DO: redirection seems bit complex here, need to find a better way
        } catch (error) {
            console.log('Error signing in:', error);
            if (error === 'New password required') {
                setIsPasswordChangeRequired(true);
            } else {
                console.error('Error signing in:', error);
                // Here you can handle the error, for example show a message to the user
            }
        }
    };


    const handlePasswordChange = async () => {
        const jwtToken = await changePassword(newPassword);

    };

    return (
        <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputBlocks}>
                    <label>
                        Email:
                    </label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className={styles.inputBlocks}>
                    <label>
                        Password:
                    </label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>

                {isPasswordChangeRequired && (
                    <>
                        <label className={styles.newPassword}>
                            New Password:
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            required
                        />
                        <button type='button' className={styles.changePasswordButton} onClick={handlePasswordChange}>Change password</button>
                    </>
                )}

                {!isPasswordChangeRequired && <button type="submit" value="Submit">Log in</button>}
            </form>
        </div>
    );
};

export default Login;