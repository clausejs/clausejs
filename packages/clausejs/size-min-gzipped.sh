DIR="$( dirname $0 )"
cat $DIR/dist/clausejs.min.js | gzip | wc -c
