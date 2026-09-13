#!/bin/bash
set -e

echo "Building admin client..."
cd admin
npm run build
cd ..

echo "Building library client..."
cd client/library
npm run build
cd ../..

echo "Copying admin dist into library dist/admin..."
mkdir -p client/library/dist/admin
cp -r admin/dist/* client/library/dist/admin/

echo "Deploying to Firebase Hosting on book-store-13579..."
npx firebase deploy --only hosting --project book-store-13579

echo "Deployment successful!"
