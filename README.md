# WatchSync Plugin Catalog

Ce dépôt publie le catalogue public consommé par WatchSync V4. Il ne contient
aucun code de plugin : uniquement des métadonnées et des URLs de releases
signées hébergées dans les dépôts propres à chaque plugin.

## Publication

1. Ajouter ou mettre à jour une entrée dans `catalog.json`.
2. Renseigner le SHA-256 du fichier `.wsp` publié par le dépôt du plugin.
3. Ouvrir une pull request ; la CI valide le contrat et les doublons.
4. Fusionner sur `main`. GitHub Pages publie alors `catalog.json`.

Configurer WatchSync avec :

```env
WS_PLUGIN_CATALOG_URL=https://watchsync.github.io/watchsync-plugin-catalog/catalog.json
```

Le catalogue ne remplace pas la vérification cryptographique du package : le
Core vérifie encore sa signature avec la clé publique de l'éditeur approuvé.
