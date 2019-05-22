import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
/*alertmesage.createNotification(status,"Message")----->Call this function in your message*/
export const alertmesage = {
    createNotification (status,message){
        switch (status) {
          case 200:
             return NotificationManager.info(message);
          case 201:
            return NotificationManager.success(message);
         
          case 400:
             return NotificationManager.warning(message, 3000);
           
          case 500:
            return NotificationManager.error(message);
           default: 
            return NotificationManager.info(message);
      }
    }
}
