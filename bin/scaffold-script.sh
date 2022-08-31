#!/usr/bin/env bash

echo 'Name of the userscript (in kebab-case):'
read -r script_name

echo 'Description of the userscript:'
read -r description

cat << TEMPLATE > "src/$script_name.user.ts"
// ==UserScript==
// @name         $script_name // FIXME:
// @namespace    mkobayashime
// @version      1.0.0
// @description  $description
// @author       mkobayashime
// @homepage     https://github.com/mkobayashime/userscripts
// @updateURL    https://github.com/mkobayashime/userscripts/raw/main/dist/$script_name.user.js
// @match        https://exapmle.com/* // FIXME:
// @icon         https://www.google.com/s2/favicons?domain=exapmle.com // FIXME:
// @run-at       document-end
// @grant        none
// ==/UserScript==

const config = {};

(({}: typeof config) => {
  //
})(config);

export {};
TEMPLATE
