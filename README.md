# Road Trip Dolomites - Application Web Interactive

Une application web pour organiser et explorer votre road trip de 14 jours dans les Dolomites avec votre copine et votre chien!

## 📋 Fonctionnalités

- ✅ **14 jours complets d'itinéraire** (du 29/08 au 11/09)
- 🏨 **Tous les logements intégrés** avec prix et infos de contact
- 🥾 **Activités suggérées** : randonnées modérées, sites touristiques, paysages
- 🗺️ **Intégration Google Maps** : trajet direct vers chaque activité
- 🔗 **Mini-boucles** : combinez plusieurs activités pour un jour
- 📱 **Design responsive** : fonctionne sur desktop et mobile
- 📊 **Temps de trajet** : includs entre chaque logement
- 🎫 **Alertes réservations** : cable car, parking, etc.

## 🚀 Démarrage Rapide

### 1. Configuration Google Maps API

L'app utilise Google Maps pour afficher les itinéraires. Vous devez obtenir une clé API :

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet
3. Activez l'API "Maps JavaScript API"
4. Créez une clé API (Credential → API key)
5. Dans `index.html`, remplacez `YOUR_API_KEY` par votre clé :
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
   ```

### 2. Ouvrir l'Application

Ouvrez `index.html` dans votre navigateur :
- Clic droit → Ouvrir avec → Navigateur
- Ou glissez-déposez le fichier dans votre navigateur
- Ou utilisez un serveur local (recommandé pour éviter les CORS)

## 📖 Comment Utiliser

### Navigation par Jours
- **Barre latérale gauche** : Cliquez sur chaque jour pour voir ses activités
- **Flèches clavier** : Utilisez ← et → pour naviguer entre les jours

### Consulter une Activité
1. Cliquez sur une activité dans la liste
2. Elle se surligne en bleu
3. En bas à droite, vous verrez la mini-boucle

### Voir sur la Carte
- **Clic "🗺️ Google Maps"** : Ouvre l'itinéraire dans Google Maps
- **Clic "ℹ️ Infos"** : Cherche l'activité sur Google

### Créer une Mini-Boucle
1. Cliquez sur plusieurs activités du même jour
2. La section "Combiner les activités" apparaît
3. Clic "🗺️ Voir itinéraire" pour voir la boucle sur Google Maps

## 📍 Points Importants

### Réservations Recommandées
- ⛷️ **Marmolada Glacier** (Jour 6) : Téléphérique peut nécessiter réservation
- 🚡 **Sella Grup** (Jour 8) : Cable car - vérifiez les horaires
- 🕳️ **Grotta Gigante** (Jour 12) : Réservation visite guidée
- 🅿️ **Parking Tre Cime & Lago di Sorapis** : Peut être complet en haute saison

### Avec Votre Chien
- ✅ Tous les sentiers suggérés sont dog-friendly
- ✅ Les cable car acceptent généralement les chiens en caisse
- ⚠️ Vérifiez les règles locales pour le bivouac (Jour 9)
- ⚠️ Pensez à de l'eau et des zones d'ombre

### Temps de Trajet
- Jour 1 : 6h30 de Bourg-en-Bresse
- Jour 2 : 1h30 vers Polsa
- Jour 3 : 2h30 vers Terlano
- Jour 10 : 2h45 vers Trieste
- Jour 13 : 2h30 vers Valdobbiadene
- Jour 14 : 3-4h retour vers la Vallée d'Aosta

## 🎯 Organisation de Fichiers

```
newProject/
├── index.html      # Page principale
├── app.js         # Logique JavaScript
├── data.js        # Données d'itinéraire
└── README.md      # Ce fichier
```

## 🔧 Personnalisation

### Modifier les Activités
Éditez `data.js` pour :
- Ajouter/supprimer des activités
- Changer les descriptions
- Modifier les coordonnées GPS

### Modifier les Logements
Dans `data.js`, chaque day possède :
- `accommodation.name`
- `accommodation.location`
- `accommodation.lat/lng`

### Ajouter des Jours
Dupliquez un objet day dans `data.js` et incrémentez l'ID.

## 💡 Conseils

- Imprimez les itinéraires avant de partir (mode hors ligne)
- Téléchargez les cartes Google Maps en mode hors ligne
- Gardez les contacts des logements à portée de main
- Vérifiez la météo et les conditions des sentiers avant chaque jour
- Le tipi et bivouac nécessitent une préparation particulière

## ❓ Dépannage

**"API Key not valid for this service"**
- Vérifiez votre clé API dans index.html
- Assurez-vous que Maps JavaScript API est activée

**Carte ne s'affiche pas**
- Vérifier votre connexion internet
- Navigateur à jour (Chrome, Firefox, Safari)
- Essayez avec un serveur local

**Itinéraires ne s'ouvrent pas**
- Vérifiez les coordonnées GPS
- Conectez-vous à Google Maps manuellement

## 🗺️ Ressources Utiles

- [Google Maps](https://maps.google.com)
- [Sentiers Dolomites](https://www.dolomites.com)
- [Reservations cable car](https://www.dolomititrekking.it)
- [Météo Alpes](https://www.meteo.fr)

---

**Bon voyage dans les Dolomites! 🏔️🐶**

N'oubliez pas :
- Eau et friandises pour votre chien
- Crème solaire et casquette
- Bonnes chaussures de randonnée
- Batterie externe pour téléphone
- Sac à dos confortable

