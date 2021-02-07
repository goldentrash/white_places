[![Netlify Status](https://api.netlify.com/api/v1/badges/27143e3c-9c91-4751-8fdb-1f69a3178fff/deploy-status)](https://app.netlify.com/sites/angry-lamarr-ff3a8e/deploys)

## netlify test repo

use `netlify-cli@2.54.0` not `netlify-cli@latest` because later 2.54.0 is on error when send POST request in dev server
please let me know if that error has solved then I will change netlify-cli's version to latest

## Must Use --no-ff option when merge to master branch

until husky support `pre-merge-commit` hook  
I highly recommand to do `git config branch.master.mergeoptions --no-ff`
