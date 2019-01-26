# get azure vm with nvidia cloud compute image
# must be GRID compatable
# https://docs.microsoft.com/en-us/azure/virtual-machines/windows/n-series-driver-setup

# run gpu status to ensure driver works
nvidia-smi -l 2

# install nvidia drivers
https://askubuntu.com/questions/951046/unable-to-install-nvidia-drivers-unable-to-locate-package

# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
# close and open ssh shell
# install node
nvm install 10.15.0

# install puppeteer deps
sudo apt-get update && \
    sudo apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget


# install shell (see troubleshooting to restart)
https://docs.microsoft.com/en-us/azure/virtual-machines/linux/use-remote-desktop

sudo apt-get update
sudo apt-get install xfce4
sudo apt-get install xrdp
sudo systemctl enable xrdp
echo xfce4-session >~/.xsession
sudo service xrdp restart

sudo passwd azureuser

sudo service xrdp restart

# in azure, open port 3389

# clone repo 
git clone https://github.com/TrevorDev/babylonServer
cd babylonServer
npm install

npm install webpack-cli -g
npm install webpack -g
npm install concurrently -g
npm install nodemon -g

webpack
npm run start

