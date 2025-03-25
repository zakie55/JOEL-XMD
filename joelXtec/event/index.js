import Handler from './handler.js'
import Callupdate from './call-handler.js'
import GroupUpdate from './group-handler.js'

export { Handler, Callupdate, GroupUpdate };

import autoStatus from './joelXtec/joelXbot/statuslike.js';

// Assuming `sock` is your WhatsApp client instance
sock.on('status_update', async (status) => {
  // This event is triggered when a new status is posted
  await autoStatus.handleStatusUpdate(status, sock);
});



