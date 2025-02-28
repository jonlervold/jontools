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

##############
# DEPLOYMENT #
##############

##########################################################

# Loading environment variables from .env file

print_section_header "LOADING ENVIRONMENT VARIABLES FROM .ENV FILE"

source "$PROJECT_DIR/.env"

echo "Loaded environment variables from .env file"

##########################################################

# Copy current versionFile.json to frontend

print_section_header "COPYING CURRENT VERSIONFILE.JSON TO FRONTEND"

cp "$PROJECT_DIR/versionFile.json" "$PROJECT_DIR/frontend/"

echo "Copied versionFile.json to frontend"

##########################################################

# Build the frontend locally

print_section_header "BUILDING FRONTEND LOCALLY"

cd "$PROJECT_DIR/frontend"
npm install
npm run build
cd "$PROJECT_DIR"

##########################################################

# Ensure directories exist on the VPS

print_section_header "ENSURING NECESSARY DIRECTORIES EXIST ON VPS"

ssh -T "$HOST_ALIAS" << EOF
mkdir -p "$VPS_DESTINATION/frontend/dist"
mkdir -p "$VPS_DESTINATION/python-backend"
mkdir -p "$VPS_DESTINATION/config"
EOF

##########################################################

# Clean up any existing containers, networks, images on VPS

print_section_header "CLEANING UP EXISTING CONTAINERS, NETWORKS, AND IMAGES ON VPS"

ssh -T "$HOST_ALIAS" << EOF
docker stop \$(docker ps -q) || true
docker rm \$(docker ps -aq) || true
docker network prune -f
docker image prune -af
EOF

# ##########################################################

# Sync files to VPS

print_section_header "SYNCING FILES TO VPS"

# Copy/overwrite individual files in root directory
rsync -avvvz \
    "$PROJECT_DIR/.env" \
    "$PROJECT_DIR/docker-compose.prod.yml" \
    "$HOST_ALIAS:$VPS_DESTINATION/"

# Sync python-backend directory
rsync -avvvz --delete \
    "$PROJECT_DIR/python-backend/" \
    "$HOST_ALIAS:$VPS_DESTINATION/python-backend/"

# Copy/overwrite individual frontend config files
rsync -avvvz \
    "$PROJECT_DIR/frontend/nginx.conf" \
    "$PROJECT_DIR/frontend/nginx-default.conf" \
    "$PROJECT_DIR/frontend/Dockerfile-frontend-prod" \
    "$HOST_ALIAS:$VPS_DESTINATION/frontend/"

# Sync frontend dist/build directory
# Exclude .well-known so it doesn't get overwritten, needed for Certbot
rsync -avvvz --delete --exclude '.well-known' \
    "$PROJECT_DIR/frontend/dist/" \
    "$HOST_ALIAS:$VPS_DESTINATION/frontend/dist/"


##########################################################

# Build the Python backend on the VPS

print_section_header "BUILDING PYTHON BACKEND ON VPS"

ssh -T "$HOST_ALIAS" << EOF
cd "$VPS_DESTINATION"
docker compose -f docker-compose.prod.yml build python-backend
EOF

##########################################################

# Build the frontend on the VPS

print_section_header "BUILDING FRONTEND ON VPS"

ssh -T "$HOST_ALIAS" << EOF
cd "$VPS_DESTINATION"
docker compose -f docker-compose.prod.yml build frontend
EOF

##########################################################

# Build certbot on the VPS

print_section_header "BUILDING CERTBOT ON VPS"

ssh -T "$HOST_ALIAS" << EOF
cd "$VPS_DESTINATION"
docker compose -f docker-compose.prod.yml build certbot
EOF

##########################################################

# Start the Python backend container

print_section_header "STARTING PYTHON BACKEND CONTAINER"

ssh -T "$HOST_ALIAS" << EOF
cd "$VPS_DESTINATION"
docker compose -f docker-compose.prod.yml up -d --force-recreate python-backend
EOF

##########################################################

# Start the frontend container

print_section_header "STARTING FRONTEND CONTAINER"

ssh -T "$HOST_ALIAS" << EOF
cd "$VPS_DESTINATION"
docker compose -f docker-compose.prod.yml up -d --force-recreate frontend
EOF

##########################################################

# Start the certbot container

print_section_header "STARTING CERTBOT CONTAINER"

ssh -T "$HOST_ALIAS" << EOF
cd "$VPS_DESTINATION"
docker compose -f docker-compose.prod.yml up -d certbot
EOF

##########################################################

# Success!

print_section_header "DEPLOYMENT COMPLETED SUCCESSFULLY"
