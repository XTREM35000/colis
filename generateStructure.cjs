import fs from "fs";
import path from "path";
import archiver from "archiver";

// Fonction pour obtenir le répertoire du fichier actuel
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Configuration de la nouvelle structure
const structure = {
  backend: [
    "models",
    "middleware",
    "routes",
    "utils",
    "server.ts",
    "package.json",
  ],
  "admin-frontend": [
    "components",
    "layouts",
    "pages",
    "stores",
    "nuxt.config.ts",
    "package.json",
  ],
  "client-frontend": [
    "components",
    "layouts",
    "pages",
    "stores",
    "nuxt.config.ts",
    "package.json",
  ],
};
// Fonction pour créer un dossier
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Dossier créé : ${dirPath}`);
  }
};

// Fonction pour créer un fichier vide
const createFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
    console.log(`📄 Fichier créé : ${filePath}`);
  }
};

// Fonction pour sauvegarder le projet existant
const compressProject = (sourceDir, outputDir) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15);
  const outputPath = path.join(outputDir, `sauv_projet_${timestamp}.zip`);

  const output = fs.createWriteStream(outputPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  output.on("close", () => {
    console.log(
      `✅ Sauvegarde terminée : ${outputPath} (${archive.pointer()} bytes)`
    );
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(sourceDir, false); // Sauvegarder tout le contenu
  archive.finalize();
};

// Fonction pour supprimer un projet existant
const deleteOldProject = (sourceDir) => {
  if (fs.existsSync(sourceDir)) {
    fs.rmSync(sourceDir, { recursive: true, force: true });
    console.log(`🗑️ Ancien projet supprimé : ${sourceDir}`);
  }
};

// Génération de la nouvelle structure du projet
const generateStructure = (baseDir, structure) => {
  Object.entries(structure).forEach(([folder, items]) => {
    const folderPath = path.join(baseDir, folder);
    createDirectory(folderPath);

    items.forEach((item) => {
      const itemPath = path.join(folderPath, item);
      if (item.includes(".")) {
        createFile(itemPath); // Fichier
      } else {
        createDirectory(itemPath); // Sous-dossier
      }
    });
  });
};

// Génération du script de migration
const generateMigrationScript = (outputDir) => {
  const migrateScriptPath = path.join(outputDir, "migrateFiles.js");
  const scriptContent = `const fs = require("fs");
const path = require("path");

// Fonction pour déplacer un fichier
const moveFile = (src, dest) => {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(src, dest);
    console.log(\`🔄 Déplacé : \${src} → \${dest}\`);
  } else {
    console.log(\`⚠️ Fichier introuvable : \${src}\`);
  }
};

// Exemple de migrations
moveFile("server/api/auth", "backend/routes/auth");
moveFile("server/api/brand", "backend/routes/brand");
moveFile("types", "backend/models");
moveFile("utils", "backend/utils");

console.log("✅ Migration terminée !");
`;
  fs.writeFileSync(migrateScriptPath, scriptContent);
  console.log(`🛠️ Script de migration généré : ${migrateScriptPath}`);
};

// Chemins de base
const oldProjectDir = path.join(__dirname, "project-UIbest");
const newProjectDir = path.join(__dirname, "project");
const backupDir = path.join(__dirname, "backups");

// Étapes principales
try {
  console.log("🚀 Début du processus de restructuration...");

  // 1. Sauvegarde du projet existant
  createDirectory(backupDir);
  compressProject(oldProjectDir, backupDir);

  // 2. Suppression de l'ancien projet
  deleteOldProject(oldProjectDir);

  // 3. Génération de la nouvelle structure
  generateStructure(newProjectDir, structure);

  // 4. Génération du script de migration
  generateMigrationScript(newProjectDir);

  console.log("🎉 Processus terminé avec succès !");
} catch (err) {
  console.error("❌ Une erreur s'est produite :", err);
}
