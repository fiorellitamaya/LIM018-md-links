#!/usr/bin/env node

const mdLinks = require('./md-links');
// const index = require('./index');

const command = process.argv;
const path = command.filter((e) => e !== '--validate' && e !== '--stats' && e !== '--help')[2];
// console.log(path);
const validate = command.includes('--validate');
const stats = command.includes('--stats');
const help = command.includes('--help');

if (command.length <= 2) {
  console.log(`
  ╔═══════════════════ MD-LINKS by Fiorella Amaya ═══════════════════╗
  👉 Por favor ingrese una ruta o escriba md-links --help para ayuda
  ╚══════════════════════════════════════════════════════════════════╝
  `);
}
if (help) {
  console.log(`
  ╔═══════════════════════════════════════════════════════════════════════════════════╗
    🚀Uso: md-links <ruta> [opciones]

    📝Opciones:
    --validate          Muestra información del estado de los links encontrados.
    --stats             Muestra el total de links, los links únicos. 
    --validate --stats  Muestra el total de links, los links únicos y los links rotos.
  ╚═══════════════════════════════════════════════════════════════════════════════════╝
   `);
}

if (!validate && !stats && !help && command.length > 2) {
  mdLinks.mdLinks(path, { validate, stats })
    .then((result) => result.forEach((link) => {
      console.log(`
        ════════════════════════ LINK ════════════════════════
        href: ${link.href}
        text: ${link.text}
        file: ${link.file}
      `);
    }))
    .catch((error) =>
      console.log(error));
}
