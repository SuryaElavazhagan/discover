#!/usr/bin/env sh

# abort on errors
set -e

# Build app
yarn build
cd build

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:SuryaElavazhagan/discover.git master:gh-pages

cd -
