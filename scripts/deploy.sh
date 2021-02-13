current_dir=$(pwd)

docker context use remote

docker-compose -f $current_dir/docker/docker-compose.yml -f $current_dir/docker/docker-compose.prod.yml up --build -d

docker context use default
