import fs from "fs";
import path from "path";

// Fonction pour déplacer un fichier
const moveFile = (src, dest) => {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(src, dest);
    console.log(`🔄 Déplacé : ${src} → ${dest}`);
  } else {
    console.log(`⚠️ Fichier introuvable : ${src}`);
  }
};

// Fonction pour déplacer tous les fichiers et dossiers
const migrateFiles = () => {
  // Déplacement des fichiers du backend
  moveFile("server/api/auth", "backend/routes/auth");
  moveFile("server/api/brand", "backend/routes/brand");
  moveFile("server/api/packages", "backend/routes/packages");
  moveFile("server/utils", "backend/utils");
  moveFile("server/server.ts", "backend/server.ts");

  // Déplacement des fichiers du frontend admin
  moveFile("components", "admin-frontend/components");
  moveFile("layouts", "admin-frontend/layouts");
  moveFile("pages", "admin-frontend/pages");
  moveFile("stores", "admin-frontend/stores");
  moveFile("nuxt.config.ts", "admin-frontend/nuxt.config.ts");
  moveFile("package.json", "admin-frontend/package.json");

  // Déplacement des fichiers du frontend client
  moveFile("components", "client-frontend/components");
  moveFile("layouts", "client-frontend/layouts");
  moveFile("pages", "client-frontend/pages");
  moveFile("stores", "client-frontend/stores");
  moveFile("nuxt.config.ts", "client-frontend/nuxt.config.ts");
  moveFile("package.json", "client-frontend/package.json");

  // Déplacement des fichiers autres
  moveFile("tailwind.config.js", "client-frontend/tailwind.config.js");
  moveFile("tsconfig.json", "client-frontend/tsconfig.json");

  console.log("✅ Migration terminée !");
};

// Lancer la migration
migrateFiles();
