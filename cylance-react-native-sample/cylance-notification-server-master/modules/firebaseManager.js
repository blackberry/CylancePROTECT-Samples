/* Copyright (c) 2021 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const admin = require('firebase-admin');
const serviceAccount = require('../bin/config/firebase.json');
const logger = require('./logger');

class FirebaseManager {
  constructor() {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  sendMessageToDevices(title, message, data, devices) {
    let wereMessagesSent = false;
    const payload = {
      notification: {
        title,
        body: message,
      },
      data: {
        device_id: data.device_id,
      },
    };
    const payloadOptions = {
      priority: 'high',
      timeToLive: 5,
    };

    Object.values(devices).forEach((device) => {
      const registrationToken = device.registration_token;
      if (registrationToken !== undefined && registrationToken != null) {
        this.admin.messaging().sendToDevice(registrationToken, payload, payloadOptions)
          .then(() => {
            wereMessagesSent = true;
            logger.log('info', `[Notification Success] Message Sent to: ${registrationToken}`);
          })
          .catch((error) => {
            logger.log('error', `[Notification Error] FCM Admin failed to send message!${error}`);
          });
      } else {
        logger.log('info', '[Notification Warning] found null registration token');
      }
    });
    logger.log('info', wereMessagesSent ? '[Failure] No Messages were sent, perhaps there are no tokens in DB?' : '[Success] Messages were sent!');
  }
}
module.exports = FirebaseManager;
