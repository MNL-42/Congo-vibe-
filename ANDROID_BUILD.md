# Version Android Congo Vibe

Le dépôt conserve le site installable et ajoute un conteneur Android natif basé sur Capacitor.

## Générer un APK de test

1. Ouvre l'onglet **Actions** du dépôt GitHub.
2. Sélectionne **Build Congo Vibe Android APK**.
3. Appuie sur **Run workflow** sur la branche `main`.
4. Quand le workflow est terminé, ouvre son exécution et récupère l'artefact `congo-vibe-android-debug`.

Le workflow prépare les ressources web, génère le projet Android Capacitor et compile un APK debug. Ce n'est pas encore une version Play Store signée. La publication officielle demandera une clé de signature privée conservée dans les secrets GitHub.

## Technologies

- Capacitor Android : conteneur d'application natif.
- Supabase : comptes, profils, messages et stockage déjà utilisés par l'application.
- Pixabay : source vidéo de découverte, activée après configuration du secret serveur décrite dans `VIDEO_SETUP.md`.

Les plugins natifs Haptics, Keyboard, Status Bar et Splash Screen sont installés dans le projet. Leur intégration fonctionnelle pourra être ajoutée progressivement.
