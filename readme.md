A simple tool to update your NPM package to AWS Lambda with zero extra configurations required. The only prerequisite is have an aws-cli [installed](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## Usage
Script
```js
const update = require('simple-aws-lambda-update');
const includesDevDeps = false;// optional, default
const keepsZipFile = false;// optional, default
const name = 'the-name-from-package-json';// optional, default

update(name, keepsZipFile, includesDevDeps).then(function () {
...  
});

```
Cli
```
aws-lambda-update --name=your-lambda-name --dev-deps --keep-zip
```

Note: All args are optional. Please check script section for the default values.
