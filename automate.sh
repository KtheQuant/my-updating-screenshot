#!/bin/bash

# Navigate to the project directory
cd /Users/camille/MyPuppetProject4

# Run the screenshot script
/usr/local/bin/node screenshot.js

# Commit and push the new screenshot to GitHub
git add latest.png
git commit -m "Updated screenshot at $(date)"
git push origin main

