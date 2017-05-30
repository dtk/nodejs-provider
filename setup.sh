#!/usr/bin/env bash

# make sure NODE_PATH is set
if [[ -z $NODE_PATH ]]; then
  echo '$NODE_PATH is not set'
  echo 'Exiting'
  exit 1
fi

provider_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $provider_dir
yarn install --force --modules-folder $NODE_PATH
