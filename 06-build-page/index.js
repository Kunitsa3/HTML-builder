const fs = require('fs');
const path = require('path');

const mergeStyles = require('../05-merge-styles/index');
const copyDirectory = require('../04-copy-directory/index');

const pathToHTML = path.join(__dirname, 'template.html')
const pathToComponents = path.join(__dirname, 'components')
const pathToProjectDist = path.join(__dirname, 'project-dist')
const pathToNewHTML = path.join(pathToProjectDist, 'index.html')
const pathToNewCSS = path.join(pathToProjectDist, 'style.css')
const pathToStyles = path.join(__dirname, 'styles')
const pathToAssets = path.join(__dirname, 'assets')
const pathToCopyAssets = path.join(pathToProjectDist, 'assets')

const buildPage = async () => {
  let HTMLContent = await fs.promises.readFile(pathToHTML, 'utf-8');
  const components = await fs.promises.readdir(pathToComponents);

  for (let template of components) {
    const currentPath = path.join(pathToComponents, template);
    let templateContent = await fs.promises.readFile(currentPath, 'utf-8');
    const templateName = path.basename(template, '.html');
    HTMLContent = HTMLContent.replace(`{{${templateName}}}`, templateContent);
  }

  fs.mkdir(pathToProjectDist, {
    recursive: true
  }, (err) => {
    if (err) {
      return console.error(err);
    }
  })

  await fs.promises.writeFile(pathToNewHTML, HTMLContent);
  mergeStyles(pathToNewCSS, pathToStyles);
  copyDirectory(pathToAssets, pathToCopyAssets);
}

buildPage()