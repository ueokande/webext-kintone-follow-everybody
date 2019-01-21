#!/bin/sh

MANIFEST="manifest.json"

version=$(jq -r '.version' $MANIFEST)

icons=$(jq -r '.icons[]' $MANIFEST)
content_scripts=$(jq -r '.content_scripts[].js[]' $MANIFEST)
background_scripts=$(jq -r '.background.scripts[]' $MANIFEST)
web_accessible_resources=$(jq -r '.web_accessible_resources[]' $MANIFEST)

zip ${version}.zip $MANIFEST $icons $content_scripts $background_scripts $web_accessible_resources
