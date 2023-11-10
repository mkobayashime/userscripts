#!/usr/bin/env bash

set -euo pipefail

pushd dist > /dev/null

target=$(fd -t f | fzf)
[[ ! "$target" ]] && exit 0

url=$(grep '@updateURL' < "$target" | sed -E 's#^// @updateURL\s+##')
[[ "$url" ]] && open "$url"
