# Vidéos de découverte Congo Vibe

Congo Vibe utilise Pixabay comme source de vidéos de découverte. Les vidéos communautaires restent hébergées dans le stockage Supabase existant.

## Configuration sécurisée

1. Crée un compte Pixabay et récupère une clé API depuis ton espace développeur.
2. Dans le projet Supabase lié à Congo Vibe, ajoute le secret Edge Function nommé `PIXABAY_API_KEY`. Ne colle jamais cette clé dans `index.html`, dans GitHub ou dans un message public.
3. Déploie la fonction `supabase/functions/cv-videos/index.ts` sous le nom `cv-videos`.
4. Ouvre l'onglet Découvrir : la sélection Pixabay sera chargée depuis la fonction serveur.

La fonction retourne uniquement les vidéos MP4 de qualité moyenne ou petite, avec le nom du contributeur et le lien de la page Pixabay. Le navigateur conserve les résultats localement pendant 24 heures afin de limiter les appels API.

Commande de déploiement, si la CLI Supabase est disponible :

```bash
supabase secrets set PIXABAY_API_KEY=TA_CLE_API
supabase functions deploy cv-videos
```

Pixabay impose de créditer la source lorsque les résultats sont affichés. Le lien « Vidéos fournies par Pixabay » et le crédit de chaque contributeur sont prévus dans l'interface.
