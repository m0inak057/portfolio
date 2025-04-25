#!/bin/bash

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
    git remote add origin https://github.com/m0inak057/portfolio.git
fi

# Add all files
git add .

# Get current timestamp for commit message
timestamp=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "Updated portfolio website - $timestamp"

# Rename branch to main and push
git branch -M main
git push -u origin main

echo "Successfully pushed to repository!"
