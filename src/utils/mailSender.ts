import sgmail from '@sendgrid/mail';
import { config } from 'src/config/env';


export const sendMail = (userEmail: string, adminEmail: string) =>{

    const ApiKey = config.DOCMAN_API_KEY;
    sgmail.setApiKey(ApiKey)

    const message = {
        to: userEmail,
        from: {
            name: 'DOC-MAN',
            email: adminEmail
        },
        subject: 'Accept Admin Invitation from DocMan',
        text: ''
    }

    sgmail
    .send(message)
    .then((response) =>console.log('email sent', response))
    .catch((err) => console.log(err.message));
    
}