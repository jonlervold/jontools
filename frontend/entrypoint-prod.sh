#!/bin/sh

# Periodically reload nginx to pick up renewed SSL certificates.
# Certbot (in a separate container) renews certificate files on disk,
# but nginx caches them in memory. This background loop reloads nginx
# every 12 hours so it reads the latest certificates from disk.
(while true; do sleep 12h; nginx -s reload 2>/dev/null; done) &

# Start nginx in the foreground
exec nginx -g "daemon off;"
