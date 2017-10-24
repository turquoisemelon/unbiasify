PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

MANIFEST_VERSION=$(cat manifest.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo $PACKAGE_VERSION
echo $MANIFEST_VERSION

sed -i '' "s@$(echo $MANIFEST_VERSION | sed 's/\./\\./g')@$(echo $PACKAGE_VERSION | sed 's/\./\\./g')@g" manifest.json

git add .
git commit -m update-manifest-version
git push
