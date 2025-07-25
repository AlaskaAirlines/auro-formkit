#!/bin/sh


# Can be run using `npm run deploy-demo`
# or `sh deploy-components.sh` just make sure you have updated the builds first

# Overview:
# This script deploys Auro FormKit component demos to surge.sh for review.
# It iterates through a list of components, finding their demo directories
# and deploying each one to a unique surge.sh URL.

# Steps:
# 1. Defines a list of components to deploy
# 2. For each component, navigates to its demo directory if it exists
# 3. Uses surge to deploy the current directory to a component-specific URL
# 4. Prints a summary of all deployed component URLs at the end

# Requirements:
# - surge CLI must be installed and authenticated
# - Components must follow the expected directory structure

# Simple array of component names
components="checkbox combobox counter datepicker dropdown form input menu radio select"

# Directory pattern
demo_dir="components/%s/demo"

# Iterate over components
for component in $components; do
    dir=$(printf "$demo_dir" "$component")
    echo "Deploying $component from $dir"
    if [ -d "$dir" ]; then
        cd "$dir" || exit
        surge . "auro-review-formkit-${component}.surge.sh"
        cd - > /dev/null || exit
    fi
done

echo "Deployed components to surge"
echo "---"
for component in $components; do
    echo "https://auro-review-formkit-${component}.surge.sh"
done
