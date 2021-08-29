#!/usr/bin/env sh

# abort on errors
set -e

# Build app
yarn build

aws s3 cp build "s3://clumio-discover" --recursive --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers full=id=9e202f33659a5bb049f05c298af497560a88036746a2e2b2f03a2d790973d1b7 --region=us-east-2

cd build

surge

cd -
