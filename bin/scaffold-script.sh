#!/usr/bin/env bash

echo 'Name of the userscript (in kebab-case):'
read -r script_name

echo 'Description of the userscript:'
read -r description

cat << TEMPLATE > "src/$script_name.user.ts"
const config = {
};

(({}: typeof config) => {
  //
})(config);

export {};
TEMPLATE

existing_meta=$(head -n -1 src/userscripts/meta/index.ts)

cat << META > "src/userscripts/meta/index.ts"
$existing_meta
  "$script_name": {
    name: "",
    description: "$description",
    version: "0.1.0",
    match: "https://example.com/*",
    icon: "https://www.google.com/s2/favicons?domain=example.com"
  },
}
META
