#!/bin/bash
# Build the site and expose it publicly through a Cloudflare quick tunnel.
# Usage: ./tunnel.sh   (requires `cloudflared` on PATH, or set CLOUDFLARED=/path/to/cloudflared)
set -e
PORT=${PORT:-8080}
CLOUDFLARED=${CLOUDFLARED:-cloudflared}

(cd admin && npm run build)
(cd client/library && npm run build)
mkdir -p client/library/dist/admin
cp -r admin/dist/* client/library/dist/admin/

PORT=$PORT node serve.mjs &
trap 'kill $!' EXIT
"$CLOUDFLARED" tunnel --no-autoupdate --url "http://localhost:$PORT"
