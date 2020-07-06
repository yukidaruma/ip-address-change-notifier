# ip-address-change-notifier
Notifies change of public IP address via [Pushover](https://pushover.net/).

## How to use
In order to use this script, you have to create Pushover account and [obtain API token](https://pushover.net/apps/build).

```bash
# Install
npm i

# Configure via .env file (or use Environmental Variables)
cp .env.example .env && $EDITOR .env

# Register as service (recommended)
vi ip-address-change-notifier.service # Edit User, ExecStart, WorkingDirectory fields if necessary

service_unit_path="$(pwd)/ip-address-change-notifier.service"
sudo systemctl link "$service_unit_path"
sudo systemctl enable "$service_unit_path"
sudo systemctl start ip-address-change-notifier

# Run (one time)
npm start
```
