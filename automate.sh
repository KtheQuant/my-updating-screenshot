#!/bin/bash

# Navigate to your project directory
cd /Users/camille/MyPuppetProject4

# Run the screenshot script
/usr/local/bin/node screenshot.js

# Add the updated screenshot to Git
git add latest.png

# Commit the change with a timestamp
git commit -m "Updated screenshot at $(date)"

# Push the update to GitHub
git push origin main


