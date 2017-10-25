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

sed -i "s@$(echo $MANIFEST_VERSION | sed 's/\./\\./g')@$(echo $PACKAGE_VERSION | sed 's/\./\\./g')@g" manifest.json

git add .
git commit -m update-manifest-version

git remote add origin-update https://${GH_TOKEN}@github.com/Unbiasify/unbiasify.git > /dev/null 2>&1
git push --quiet --set-upstream origin-update master

