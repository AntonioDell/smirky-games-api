# smirky-games-api

DISCLAIMER: The api is still in active development and is by no means polished yet!

Straight forward, simple backend for basic needs of the [smirky-games-website](https://smirky-games.com). Feel free to use any code you like from this project and to ask any question you like in the [issues section](https://github.com/AntonioDell/smirky-games-api/issues) :)
We use [Deno](https://deno.land/) as runtime, pm2 as process manager on the server and nginx as reverse proxy.

## Development

### Using docker

When using a docker container as development environment, attaching a debugger to the server is not possible (to my knowlegde).

In order to start the local docker container for development, you will need to have docker and docker-compose installed.

Run `sudo docker-compose up -d` to start 
1. the backend on port 8001 and
2. a mongodb server on port 27017.

### Using VSCode launch.json

Press `F5` to run the server and attach the vscode debugger to it. You can then set breakpoints and debug normally.

## Deployment

[THIS SECTION IS OUTDATED FOR DOCKER]

Run the [deploy.sh](scripts/deploy.sh) with the username as first command line argument to deploy the files to the server. You need to have a ssh certificate installed and used by the ssh-agent in order for the ssh connection to succeed.


# License
MIT License © 2021 Antonio Dell'Annunziata