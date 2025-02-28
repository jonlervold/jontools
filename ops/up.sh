#!/bin/bash

##########
# CONFIG #
##########

# Exit immediately if a command exits with a non-zero status
set -e

# Pipeline returns the status of the last command to exit with a non-zero status
set -o pipefail

# Prints the line number of the error
handle_error() {
  echo "Error on line $1"
  exit 1
}

# Call handle_error on error
trap 'handle_error $LINENO' ERR

# Prints the section headers in a more easily seen format
print_section_header() {
  echo -e "\n"
  echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  echo "$1"
  echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  echo -e "\n"
}

# The root directory of the project
PROJECT_DIR=$(dirname "$(pwd)")

##########################################################

# Copy current versionFile.json to frontend

print_section_header "COPYING CURRENT VERSIONFILE.JSON TO FRONTEND"

cp "$PROJECT_DIR/versionFile.json" "$PROJECT_DIR/frontend/"

echo "Copied versionFile.json to frontend"

##########################################################

# Build the containers

print_section_header "BUILDING CONTAINERS"

docker compose -f "$PROJECT_DIR/docker-compose.dev.yml" build

##########################################################

# Run the containers

print_section_header "STARTING CONTAINERS"

docker compose -f "$PROJECT_DIR/docker-compose.dev.yml" up -d

##########################################################

# Success!

print_section_header "BUILD SUCCESSFULLY COMPLETED"
