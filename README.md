# Les déportés gapençais

Site vitrine et pédagogique consacré à l’antisémitisme, aux déportés gapençais, et à plusieurs témoignages et voyages de mémoire en lien avec le lycée Dominique Villars.

Le projet est un site statique composé d’une page principale qui rassemble :

- des vidéos d’introduction sur l’antisémitisme en Allemagne et en France ;
- une séquence vidéo en plusieurs étapes sur les événements dans les Hautes-Alpes ;
- des témoignages d’élèves du lycée Dominique Villars et de familles concernées ;
- une carte interactive des déportés gapençais ;
- des vidéos sur des voyages mémoriels (Mémorial de la Shoah, Buchenwald, etc.).

## Contenu du projet

### Fichiers principaux

- `index.html` : structure de la page et organisation des sections.
- `assets/css/style.css` : mise en page, navigation, modale, carte et styles des vidéos.
- `assets/js/map.js` : gestion de la carte interactive et de la fenêtre modale.
- `assets/js/slideshow.js` : fonctionnement du carrousel vidéo de la section « Dans les Hautes-Alpes ».

### Ressources

- `assets/img/` : images utilisées sur le site.
- `assets/font/` : polices locales.
- `assets/video/` : ensemble des vidéos embarquées dans les différentes sections.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- Leaflet pour la carte interactive
- Font Awesome pour certaines icônes
- jQuery, chargé via CDN

## Fonctionnement

Le site est entièrement statique : aucune base de données ni serveur applicatif n’est nécessaire. Les contenus sont chargés depuis les fichiers du dépôt et depuis quelques bibliothèques externes via CDN.

## Lancer le projet

### Option 1 : ouvrir directement le fichier

Ouvrir `index.html` dans un navigateur moderne.

### Option 2 : utiliser un serveur local

Par exemple avec Python :

```bash
cd /mnt/files/Documents/GitHub/dominique-villars.github.io
python3 -m http.server 8000
```

Puis ouvrir : `http://localhost:8000`

## Remarques

- Le site utilise une navigation par ancres pour passer d’une section à l’autre.
- Certaines vidéos et la carte interactive nécessitent une connexion internet pour charger les dépendances CDN.
- Le projet semble destiné à un usage éducatif et mémoriel.

