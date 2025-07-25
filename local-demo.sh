#!/bin/sh

# Overview:
# This script copies Auro FormKit component demos to a new directory structure.
# It iterates through a list of components, finding their demo directories
# and copying each one to a new location with names matching the components.
# With the --zip flag, it will also create a zip archive of the demo folder and delete the original.

# Steps:
# 1. Defines a list of components to copy
# 2. Creates a target directory if it doesn't exist
# 3. For each component, copies its demo directory if it exists
# 4. Prints a summary of all copied component folders at the end
# 5. If --zip flag is provided, creates a zip archive and deletes the original folder

# Usage:
# ./local-demo.sh        # Creates the demo folder
# ./local-demo.sh --zip  # Creates the demo folder, zips it, and deletes the original

# Check for --zip flag
zip_flag=false
for arg in "$@"; do
  if [ "$arg" = "--zip" ]; then
    zip_flag=true
  fi
done

# Simple array of component names
components="checkbox combobox counter datepicker dropdown form input menu radio select"

# Directory patterns
demo_dir="components/%s/demo"
target_dir="auro-formkit-demo"

# Create target directory if it doesn't exist
mkdir -p "$target_dir"

# Generate package.json for auro-formkit-demo
echo "Generating package.json file..."
cat > "$target_dir/package.json" << EOF
{
  "name": "auro-formkit-demo",
  "version": "1.0.0",
  "scripts": {
    "start": "http-server ./ -o"
  },
  "author": "Auro",
  "license": "ISC",
  "description": "Auro FormKit component demo",
  "devDependencies": {
    "http-server": "^14.1.1"
  }
}
EOF
echo "✓ Generated package.json file"

# Iterate over components
for component in $components; do
    src_dir=$(printf "$demo_dir" "$component")
    dst_dir="$target_dir/$component"
    
    echo "Processing $component from $src_dir"
    if [ -d "$src_dir" ]; then
        # Remove destination directory if it already exists
        if [ -d "$dst_dir" ]; then
            rm -rf "$dst_dir"
        fi
        
        # Copy demo directory to the target with component name
        cp -r "$src_dir" "$dst_dir"
        
        # Fix relative paths in HTML files to work with file based serving
        find "$dst_dir" -name "*.html" -type f -exec sed -i '' \
            -e "s|<script src=\"\./\([^\"]*\.min\.js\)\"|<script src=\"../$component/\1\"|g" \
            -e "s|fetch('\./\([^']*\.md\)')|fetch('../$component/\1')|g" \
            -e "s|fetch(\"\./\([^\"]*\.md\)\")|fetch(\"../$component/\1\")|g" \
            {} \;
        
        echo "✓ Copied to $dst_dir"
    else
        echo "✗ Source directory not found: $src_dir"
    fi
done

echo ""
echo "Copied component demos to $target_dir"
echo "---"
echo "The following component demos were copied:"
for component in $components; do
    dst_dir="$target_dir/$component"
    if [ -d "$dst_dir" ]; then
        echo "- $component"
    fi
done

# Generate an index.html file with links to all components
echo "Generating index.html file..."
cat > "$target_dir/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auro FormKit Components</title>
    <!-- Include Tailwind CSS via CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 font-sans text-gray-800 max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-auro-blue border-b border-gray-200 pb-3 mb-4">Auro FormKit Components</h1>
    <p class="text-lg mb-8">This page provides quick access to all FormKit component demos. Click on a component to view its demo.</p>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
EOF

# Add each component to the index.html
for component in $components; do
    dst_dir="$target_dir/$component"
    if [ -d "$dst_dir" ]; then
        # Find the main demo file in the component folder
        demo_files=$(find "$dst_dir" -name "*.html")
        if [ -n "$demo_files" ]; then
            # Use the first HTML file found (using head -1 to get first line)
            demo_file=$(echo "$demo_files" | head -1)
            # Get the relative path from target_dir
            rel_path="${demo_file#$target_dir/}"
            # Add a link to the component in the index.html
            cat >> "$target_dir/index.html" << EOF
        <a href="$component/$(basename "$demo_file")" class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-6 text-center">
            <span class="text-auro-blue font-medium text-lg capitalize hover:underline">$component</span>
        </a>
EOF
        else
            # If no HTML file is found, just link to the directory
            cat >> "$target_dir/index.html" << EOF
        <a href="$component/" class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-6 text-center">
            <span class="text-auro-blue font-medium text-lg capitalize hover:underline">$component</span>
        </a>
EOF
        fi
    fi
done

# Finish the HTML file
cat >> "$target_dir/index.html" << EOF
    </div>
</body>
</html>
EOF

echo "✓ Generated index.html with quick links to all components"

# Generate a README.md file with installation and usage instructions
echo "Generating README.md file..."
cat > "$target_dir/README.md" << EOF
# Auro FormKit Demo

This folder contains a collection of demos for all Auro FormKit components. It provides a quick way to explore and review component documentation in a local environment.

## Installation

To install the necessary dependencies, run:

\`\`\`bash
npm install
\`\`\`

## Usage

To start the local server and view the demos:

\`\`\`bash
npm start
\`\`\`

This will open a browser window with the demo collection index. From there, you can navigate to individual component demos.

## Available Components

The following components are included in this demo collection:
EOF

# Add each available component to the README
for component in $components; do
    dst_dir="$target_dir/$component"
    if [ -d "$dst_dir" ]; then
        echo "- \`$component\`" >> "$target_dir/README.md"
    fi
done

# Add footer to README
cat >> "$target_dir/README.md" << EOF

## Development

This demo collection was generated using the \`local-demo.sh\` script from the Auro FormKit repository. If you want to regenerate or update the demos, please refer to the main repository.
EOF

echo "✓ Generated README.md with installation and usage instructions"

# If --zip flag is provided, create a zip archive and delete the original folder
if [ "$zip_flag" = true ]; then
    echo ""
    echo "Creating zip archive..."
    zip_file="${target_dir}.zip"
    
    # Check if zip command is available
    if command -v zip >/dev/null 2>&1; then
        # Create zip archive
        zip -r "$zip_file" "$target_dir"
        
        if [ $? -eq 0 ]; then
            echo "✓ Created zip archive: $zip_file"
            
            # Delete the original folder
            rm -rf "$target_dir"
            echo "✓ Deleted original folder: $target_dir"
            echo ""
            echo "Done! You can find the zipped demo at: $zip_file"
        else
            echo "✗ Failed to create zip archive"
        fi
    else
        echo "✗ The 'zip' command is not installed. Please install it to use the --zip option."
        echo "  On macOS: brew install zip"
        echo "  On Linux: sudo apt-get install zip (Ubuntu/Debian) or sudo yum install zip (CentOS/RHEL)"
    fi
fi
