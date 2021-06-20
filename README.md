[![Netlify Status](https://api.netlify.com/api/v1/badges/27143e3c-9c91-4751-8fdb-1f69a3178fff/deploy-status)](https://app.netlify.com/sites/angry-lamarr-ff3a8e/deploys)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## netlify test repo

use `netlify-cli@2.54.0` not `netlify-cli@latest` because later 2.54.0 is on error when send POST request in dev server
please let me know if that error has solved then I will change netlify-cli's version to latest

## needed ENV_VAR

- FAUNA_SECRET=

- NODE_VERSION=14.17.0
- AWS_LAMBDA_JS_RUNTIME=nodejs14.x
- YARN_VERSION=1.22.5
