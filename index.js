import fs from 'fs';
import retry from 'async-retry';
import PublicIp from 'public-ip';
import Pushover from 'pushover-notifications';

const ONE_MINUTE = 60000;
const SAVE_FILE = 'last-ip-address';

const push = new Pushover({
  user: process.env['PUSHOVER_USER'],
  token: process.env['PUSHOVER_TOKEN'],
});

const sendNotification = (message) => new Promise((resolve, reject) => {
  push.send(
    {
      title: process.env['NEW_IP_ADDRESS_NOTIFICATION_TITLE'],
      message,
    },
    (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    },
  );
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let lastIpAddress = (() => {
  try {
    return fs.readFileSync(SAVE_FILE, 'utf-8');
  } catch (e) {
    return;
  }
})();

const loop = async () => {
  console.log('Checking IP address.');
  const ipAddress = await PublicIp.v4();
  console.log(`Current IP address is ${ipAddress}.`);

  if (lastIpAddress === ipAddress) {
    console.log('IP address has not been changed.');
    return;
  }

  if (lastIpAddress) {
    console.log('IP address has been changed. Sending notification.');

    await retry(
      () => sendNotification(ipAddress),
      {
        forever: true,
        onRetry: () => { console.log('Failed to send notification. Retrying.') },
       },
    );
    console.log('Successfully sent notification.');

    fs.writeFileSync(SAVE_FILE, ipAddress);
  }

  lastIpAddress = ipAddress;
};

(async () => {
  while (true) {
    await loop();
    await sleep(ONE_MINUTE);
  }
})();
