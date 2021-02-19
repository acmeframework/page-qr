# Changelog

## v0.1.0 - Initial release - 2021-02-11

## v0.1.1 - Fixes & Improvement to Automation - 2021-02-19

### Fixes

- removed `script` permission from `manifest.json`
- fixed wording and added more content in `README.md`
- added repo, issue information in `package.json`
- updated `.eslintrc.js` to properly handle browser and node code, and include globals

### Automation Improvements

- added `package.json` scripts to provide automation scripts
- added `grunt` to provide automation around build
- added additional Node modules for development use (`rimraf`, `archiver`)
- added `.vscode` to `.eslintignore`, `prettierignore`
- added an `assets` folder to house the app icons and resources for the Chrome Store
