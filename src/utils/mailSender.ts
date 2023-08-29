import sgmail from '@sendgrid/mail';
import { config } from '../config/env';


export const sendMail = (userEmail: string, adminEmail: string) =>{

    const ApiKey = config.DOCMAN_API_KEY;
    sgmail.setApiKey(ApiKey)

    console.log(userEmail,adminEmail)
    const message = {
        to: userEmail,
        from: adminEmail,
        subject: 'Accept Admin Invitation from DocMan',
        text: ' become an admin'
    }

    sgmail
    .send(message)
    .then((response) =>console.log('email sent'))
    .catch((err) => console.log(err.response.body));
    
}