#!/bin/bash

if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo:"
    echo "sudo $0 $*"
    exit 1
fi


ask()
{
  declare -g $1="$2"
  if [ -z "${!1}" ]; then
    echo "$3"
    read $1
  fi
}

ask NS "$1" "Network namespace name:"

# Get into namespace
ip netns exec ${NS} /bin/bash --rcfile <(echo "PS1=\"${NS}> \"")
