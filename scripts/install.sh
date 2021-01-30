if ! command -v deno
then
    echo "Install deno..."
    curl -fsSL https://deno.land/x/install/install.sh | sh
    echo 'export DENO_INSTALL=\"$deno_install\"' >> ~/.bashrc 
    echo  'export PATH=\"\$DENO_INSTALL/bin:\$PATH\"' >> ~/.bashrc 
fi

if ! command -v npm
then
    echo "Install npm..."
    sudo apt install npm
fi

if ! command -v pm2
then
    echo "Install pm2..."
    sudo npm install -g pm2
fi