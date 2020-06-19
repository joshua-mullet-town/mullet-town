"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp(functions.config().mailchimp.key);
exports.post = async (req, res) => {
    const user = req.body;
    let auth;
    try {
        auth = await admin.auth().createUser({
            password: user.password,
            email: user.email,
        });
    }
    catch (err) {
        console.error('Could not create user auth: ', err);
        return res.status(400).send({ err, message: err.errorInfo.message });
    }
    const userId = auth.uid;
    user.created = Date.now();
    user.role = 'STUDENT';
    user.archived = 0;
    user.id = userId;
    delete user.password;
    delete user.repeat_password;
    try {
        await admin.firestore().collection('users').doc(userId).set(user);
    }
    catch (err) {
        console.error('Could not create user: ', err);
        admin.auth().deleteUser(userId);
        return res.status(400).send({ err, message: 'Could not create user.' });
    }
    let customToken;
    try {
        customToken = await admin.auth().createCustomToken(userId);
    }
    catch (err) {
        console.error('Could not get access token: ', err);
        return res.status(400).send({ err, message: 'Could not get access token.' });
    }
    try {
        await mailchimp.post(`/lists/91b16c0158/members/`, {
            email_address: user.email,
            status: 'subscribed',
            tags: ['virtual summer camp'],
        });
    }
    catch (err) {
        console.error('Could not add email to mailchimp list: ', user.email, err);
        // won't stop flow if the error is with Mailchimp. just let the kid code
    }
    return res.send({ customToken });
};
//# sourceMappingURL=post.js.map