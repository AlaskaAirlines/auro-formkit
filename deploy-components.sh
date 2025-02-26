#!/bin/sh

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