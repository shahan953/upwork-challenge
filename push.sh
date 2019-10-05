#!/bin/bash

read -r -p 'Commit message: ' desc  # Promt user for commit message
git add .
git commit -m "$desc"
read -r -p 'Branch: ' branch        # Take branch name from user
git push origin "$branch"