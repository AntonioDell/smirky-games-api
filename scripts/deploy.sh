user=$1
dry_run=$2
dist_dir=../dist
api_dir=/var/www/api

rm -rf $dist_dir
mkdir -p $dist_dir

cp install.sh $dist_dir/install.sh
cp ../server.ts $dist_dir/server.ts
cp -r ../src $dist_dir/src

if [ "$dry_run" = true ]; then
    exit
fi
ssh $user@smirky-games.com "rm -rf $api_dir"
scp -r $dist_dir $user@smirky-games.com:$api_dir
ssh $user@smirky-games.com "$api_dir/install.sh"