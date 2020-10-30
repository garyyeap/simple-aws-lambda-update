const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const pack = require('npm-pack-all-zip');

module.exports = async function (name, keep, devDeps) {
  if (!shell.which('aws')) {
    shell.echo('Sorry, this script requires aws-cli: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html');
    shell.exit(1);
  }

  try {
    name = name || require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    shell.echo('package.json not found or is invalid.\n Please check your current execution path or package.json file');
    shell.exit(1);
  }

  if (!name) {
    shell.echo('The name of the lambda function is required!');
    shell.exit(1);
  }

  try {
    await pack(name, devDeps);
  } catch (e) {
    shell.echo(e);
    shell.exit(1);
  }

  shell.echo(`Updating codes to lambda: ${name}`);

  const file = `fileb://./${name}.zip`;
  const command = `aws lambda update-function-code --function-name=${name} --zip-file=${file}`;
  const result = shell.exec(command, { slient: true });

  if (!keep) {
    fs.unlinkSync(path.join(process.cwd(), `${name}.zip`));
  }

  if (result.code !== 0) {
    shell.echo(result.stderr);
    shell.exit(1);
  }

  shell.echo('Update done!');
};
