#!/bin/sh

files=$(jq '.files' package.json)

for file in *.js; do
  exists=$(echo $files | grep -c $file)

  if [ $exists == "0" ]; then
    echo "$file not found"
  fi
done;
