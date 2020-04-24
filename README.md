# ip-address-change-notifier
Notifies change of public IP address via [Pushover](https://pushover.net/).

## How to use
In order to use this script, you have to create Pushover account and [obtain API token](https://pushover.net/apps/build).

```
# Install
npm i

# Configure via .env file (or use Environmental Variables)
cp .env.example .env && $EDITOR .env

# Run
npm start
```
