import mongoose from "mongoose"; // Pour interagir avec la base de données.
import { defineNuxtConfig } from "nuxt/config";
// Importation des variables d'environnement.
const brandName = process.env.BRAND_NAME || "Gogo Export 2.0";
const brandLogo = process.env.BRAND_LOGO || "/default-logo.png";
const brandOwner = process.env.BRAND_OWNER || "Nom par défaut";
const brandPhone = process.env.BRAND_PHONE || "+22500000000";

// Fonction pour récupérer les données de la collection "brand".
async function fetchBrandData() {
  try {
    // Connexion à MongoDB (modifiez l'URI en fonction de votre configuration).
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/test"
    );

    // Définir le schéma et le modèle pour la collection "brand".
    const brandSchema = new mongoose.Schema({
      name: String,
      logo: String,
      owner: String,
      phone: String,
    });

    const Brand = mongoose.model("Brand", brandSchema);

    // Récupérer les informations du premier document dans "brand".
    const brand = await Brand.findOne();

    // Retourner les données trouvées ou les valeurs par défaut.
    return {
      name: brand?.name || brandName,
      logo: brand?.logo || brandLogo,
      owner: brand?.owner || brandOwner,
      phone: brand?.phone || brandPhone,
    };
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des données "brand" :',
      error
    );
    return {
      name: brandName,
      logo: brandLogo,
      owner: brandOwner,
      phone: brandPhone,
    };
  } finally {
    mongoose.disconnect();
  }
}

// Cela configure le comportement global du projet Nuxt.
export default defineNuxtConfig({
  // Modules utilisés dans le projet.
  // '@nuxt/ui' : Module pour utiliser des composants UI préconstruits.
  // '@pinia/nuxt' : Intégration de Pinia (gestion d'état) avec Nuxt.
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  // Configuration spécifique pour le module '@nuxt/ui'.
  ui: {
    global: true, // Indique que les styles et composants du module sont disponibles globalement dans le projet.
    icons: ["heroicons", "lucide"], // Bibliothèques d'icônes à inclure (Heroicons et Lucide).
  },

  // Activation des outils de développement (devtools) pour déboguer plus facilement.
  devtools: {
    enabled: true,
  },

  // Configuration TypeScript.
  typescript: {
    strict: true, // Active le mode strict de TypeScript pour une meilleure validation des types.
  },

  // Configuration de l'application (app).
  app: {
    // Personnalisation de l'entête HTML (balise <head>) de l'application.
    head: {
      title: "Gogo Export 2.0", // Titre de l'application affiché dans l'onglet du navigateur.
      meta: [
        { charset: "utf-8" }, // Encodage des caractères.
        { name: "viewport", content: "width=device-width, initial-scale=1" }, // Vue adaptative pour les appareils mobiles.
      ],
    },
  },
});
