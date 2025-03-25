import Handler from './handler.js'
import Callupdate from './call-handler.js'
import GroupUpdate from './group-handler.js'

export { Handler, Callupdate, GroupUpdate };

import autoStatus from './joelXtec/joelXbot/statuslike.js';
import { Client } from 'whatsapp-web.js';  // If using whatsapp-web.js, for example

const sock = new Client();

sock.initialize();

sock.on('status', async (status) => {  // Use 'status' or the correct event name
  try {
    console.log('New status update received:', status);
    await autoStatus.handleStatusUpdate(status, sock);
  } catch (error) {
    console.error('Error handling status update:', error);
  }
});


/*import Handler from './handler.js'
import Callupdate from './call-handler.js'
import GroupUpdate from './group-handler.js'

export { Handler, Callupdate, GroupUpdate };

import autoStatus from './joelXtec/joelXbot/statuslike.js';

// Assuming `sock` is your WhatsApp client instance
sock.on('status_update', async (status) => {
  // This event is triggered when a new status is posted
  await autoStatus.handleStatusUpdate(status, sock);
});
*/


