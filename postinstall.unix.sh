libPath=$PWD/lib/xfi.lib

git submodule update --init --recursive

#UI library installation
cd $libPath
git checkout develop
git pull origin develop

cd ../..