#!/usr/bin/env node

const mdLinks = require('./md-links');
const index = require('./index');

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
} else if (help) {
  console.log(`
  ╔═══════════════════════════════════════════════════════════════════════════════════╗
    🚀Uso: md-links <ruta> [opciones]

    📝Opciones:
    --validate          Muestra información del estado de los links encontrados.
    --stats             Muestra el total de links, los links únicos. 
    --validate --stats  Muestra el total de links, los links únicos y los links rotos.
  ╚═══════════════════════════════════════════════════════════════════════════════════╝
   `);
} else {
  mdLinks.mdLinks(path, { validate, stats })
    .then((objArray) => {
      if (validate && stats && !help) {
        console.log(`
      ═════════════════════ VALIDATE & STATS ═════════════════════
      Total links: ${index.getStats(objArray).totalLinks}
      Unique links: ${index.getStats(objArray).uniqueLinks}
      Broquen links: ${index.getBrokenLinks(objArray)}
    `);
      } else if (!validate && stats && !help) {
        console.log(`
        ════════════════════════ STATS ════════════════════════
        Total links: ${index.getStats(objArray).totalLinks}
        Unique links: ${index.getStats(objArray).uniqueLinks}
        
      `);
      } else {
        objArray.forEach((link) => {
          if (!validate && !stats && !help && command.length > 2) {
            console.log(`
            ════════════════════════ LINK  ════════════════════════
            href: ${link.href}
            text: ${link.text}
            file: ${link.file}
          `);
          } else if (validate && !stats && !help) {
            console.log(`
          ════════════════════════ VALIDATE ════════════════════════
          href: ${link.href}
          text: ${link.text}
          file: ${link.file}
          status: ${link.status}
          message: ${link.message}
        `);
          }
        });
      }
    })
    .catch((error) => console.log(error));
}
