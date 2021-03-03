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

Press `F5` to run the server either with the profile `Deno debug` or `Deno hot reload`. 

With debug you can then set breakpoints and debug normally.

With hot reload you can instantly test changes to your code.

## Deployment

We use [Docker](https://www.docker.com/) for building the api backend and deploying to our server.

### Pre-requesits

1. Install docker and docker-compose on your deployment/development machine
2. Import the [remote.dockercontext](./remote.dockercontext) via `docker context import remote.dockercontext` and modify DOCKER ENDPOINT (can be inspoected by using `docker context ls`) by running `docker context update ...` (see documentation for how to change a context).
3. You need to have a ssh certificate installed and used by the ssh-agent in order for the ssh connection to succeed.
4. Install docker and docker-compose on your server

### Deploy docker image

Simply run the [deploy.sh](scripts/deploy.sh). 

# License
MIT License © 2021 Antonio Dell'Annunziata