#!/bin/bash

npm run build

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for d in ${DIR}/../packages/*/ ; do (cd "$d" && npm publish); done

cd ${DIR}/../ && npm publish
