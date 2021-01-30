user=$1
dist_dir=../dist
api_dir=/var/www/api

rm -rf $dist_dir
mkdir -p $dist_dir

cp install.sh $dist_dir/install.sh
cp ../server.ts $dist_dir/server.ts

ssh $user@smirky-games.com "rm -rf $api_dir"
scp -r $dist_dir $user@smirky-games.com:$api_dir
ssh $user@smirky-games.com "$api_dir/install.sh"