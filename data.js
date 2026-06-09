const roadTripData = {
    days: [
        {
            id: 1,
            date: "29/08",
            title: "Arrivée - Bourg-en-Bresse → Corte Franca",
            accommodation: {
                name: "Relais Franciacorta",
                location: "Corte Franca, Lombardie",
                lat: 45.4833,
                lng: 10.1000,
                type: "Hôtel Relais"
            },
            travelInfo: {
                from: "Bourg-en-Bresse",
                distance: "~580 km",
                duration: "~6h30",
                note: "Arrivée tardive - repos recommandé"
            },
            activities: [
                {
                    id: "1-1",
                    name: "Visite du Relais (arrivée tardive)",
                    type: "site",
                    duration: "30 min",
                    distance: "Au logement",
                    description: "Prise de possession des chambres, installation avec votre chien.",
                    lat: 45.4833,
                    lng: 10.1000
                },
                {
                    id: "1-2",
                    name: "Détente au domaine",
                    type: "site",
                    duration: "1-2h",
                    distance: "Au logement",
                    description: "Profitez des espaces du Relais et promenade avec votre chien.",
                    lat: 45.4833,
                    lng: 10.1000
                }
            ]
        },
        {
            id: 2,
            date: "30/08",
            title: "Jour 2 - Corte Franca -> Polsa",
            accommodation: {
                name: "Airbnb Tipi",
                location: "Polsa",
                lat: 45.8500,
                lng: 10.9000,
                type: "Airbnb"
            },
            travelInfo: {
                from: "Corte Franca",
                distance: "~90 km",
                duration: "~1h30",
                note: "Depart en fin de journee vers Polsa"
            },
            nextAccommodation: {
                name: "Art & Design Hotel Napura",
                location: "Terlano",
                lat: 46.4667,
                lng: 11.3333,
                distance: "~120 km",
                duration: "~2h30"
            },
            activities: [
                {
                    id: "2-1",
                    name: "Vignobles Franciacorta",
                    type: "site",
                    duration: "2-3h",
                    distance: "3-5 km",
                    description: "Randonnée pédestre entre les vignobles avec vue magnifique. Parcours facile et chien-friendly.",
                    lat: 45.5000,
                    lng: 10.0800
                },
                {
                    id: "2-2",
                    name: "Lac d'Iseo",
                    type: "site",
                    duration: "2h",
                    distance: "12 km",
                    description: "Visite du lac avec promenade en bord de rive. Nombreux sentiers pour chiens.",
                    lat: 45.6648,
                    lng: 10.0481,
                    parking: "Parcheggio Lungolago Marconi (Iseo) - arrivee conseillee avant 10h",
                    parkingLat: 45.6589,
                    parkingLng: 10.0503,
                    walkRoute: "Boucle pedestre Iseo Lungolago -> Porto Gabriele Rosa -> Lido dei Platani -> retour centre",
                    walkDistance: "4.5 km",
                    walkDuration: "1h15"
                },
                {
                    id: "2-3",
                    name: "Village de Sulzano",
                    type: "site",
                    duration: "1h",
                    distance: "15 km",
                    description: "Petit village pittoresque au bord des collines. Bonnes routes pour la promenade.",
                    lat: 45.5800,
                    lng: 9.9800
                },
                {
                    id: "2-4",
                    name: "Polsa - Arrivée au Tipi",
                    type: "site",
                    duration: "2h",
                    distance: "90 km",
                    description: "Route pittoresque vers les Alpes. Installation au Tipi en soiree.",
                    lat: 45.8500,
                    lng: 10.9000
                }
            ]
        },
        {
            id: 3,
            date: "31/08",
            title: "Jour 3 - Polsa -> Terlano",
            accommodation: {
                name: "Art & Design Hotel Napura",
                location: "Terlano, Trentin-Haut-Adige",
                lat: 46.4667,
                lng: 11.3333,
                type: "Hôtel Design"
            },
            previousAccommodation: {
                name: "Airbnb Tipi",
                location: "Polsa",
                lat: 45.8500,
                lng: 10.9000,
                distance: "~120 km",
                duration: "~2h30"
            },
            travelInfo: {
                from: "Polsa",
                distance: "~120 km",
                duration: "~2h30",
                note: "Trajet montagneux vers Terlano"
            },
            activities: [
                {
                    id: "3-1",
                    name: "Passo del Tonale - Sentier des lacs",
                    type: "hike",
                    duration: "3h",
                    distance: "7 km",
                    description: "Randonnée alpine modérée avec lacs de montagne. Sol bien entretenu pour les chiens.",
                    lat: 46.3500,
                    lng: 10.6000,
                    difficulty: "Modérée"
                },
                {
                    id: "3-2",
                    name: "Vignobles en terrasse",
                    type: "site",
                    duration: "2h",
                    distance: "4-8 km",
                    description: "Sentier touristique parmi les vignobles en terrasse UNESCO. Vue panoramique.",
                    lat: 46.4500,
                    lng: 11.3500
                },
                {
                    id: "3-3",
                    name: "Lac de Soraga",
                    type: "hike",
                    duration: "2h30",
                    distance: "6 km",
                    description: "Balade autour du lac cristallin. Facile et très dog-friendly. Aire de repos.",
                    lat: 46.3333,
                    lng: 11.1667,
                    difficulty: "Facile"
                },
                {
                    id: "3-4",
                    name: "Installation a Napura & marche dans Terlano",
                    type: "site",
                    duration: "1-2h",
                    distance: "2-5 km",
                    description: "Arrivee a l'hotel puis balade douce dans les environs.",
                    lat: 46.4600,
                    lng: 11.3400
                }
            ]
        },
        {
            id: 4,
            date: "01/09",
            title: "Jour 4 - Deuxieme nuit a Terlano (Napura)",
            accommodation: {
                name: "Art & Design Hotel Napura",
                location: "Terlano, Trentin-Haut-Adige",
                lat: 46.4667,
                lng: 11.3333,
                type: "Hôtel Design"
            },
            activities: [
                {
                    id: "4-1",
                    name: "Sentier des vignes a Terlano",
                    type: "hike",
                    duration: "1h30",
                    distance: "5 km",
                    description: "Circuit facile entre les vignobles celebres de Terlano. Parfait pour vous detendre.",
                    lat: 46.4667,
                    lng: 11.3333,
                    difficulty: "Facile"
                },
                {
                    id: "4-2",
                    name: "Village medieval de Vilpiano",
                    type: "site",
                    duration: "1-2h",
                    distance: "6 km",
                    description: "Charmant village avec histoire viticole et ruelles ombragees.",
                    lat: 46.4500,
                    lng: 11.4000
                },
                {
                    id: "4-3",
                    name: "Mont Bondone - Panorama ridge",
                    type: "hike",
                    duration: "2h30",
                    distance: "8 km",
                    description: "Randonnee moderee avec vues spectaculaires. Chien-friendly.",
                    lat: 46.2000,
                    lng: 11.1000,
                    difficulty: "Modérée"
                },
                {
                    id: "4-4",
                    name: "Marche agricole local",
                    type: "site",
                    duration: "1-2h",
                    distance: "2-5 km",
                    description: "Produits locaux de montagne: fromages, charcuterie, fruits. Visite gourmande.",
                    lat: 46.4600,
                    lng: 11.3400
                }
            ]
        },
        {
            id: 5,
            date: "02/09",
            title: "Jour 5 - Terlano → Canazei",
            accommodation: {
                name: "Camping Marmolada",
                location: "Canazei, Trentin-Haut-Adige",
                lat: 46.4500,
                lng: 11.9800,
                type: "Camping"
            },
            nextAccommodation: {
                distance: "~100 km",
                duration: "~2h"
            },
            activities: [
                {
                    id: "5-1",
                    name: "Passo Gavia - Route panoramique",
                    type: "site",
                    duration: "2-3h",
                    distance: "80 km route",
                    description: "Une des plus belles routes alpines. Arrêts multiples pour photos.",
                    lat: 46.3500,
                    lng: 11.5000
                },
                {
                    id: "5-2",
                    name: "Rifugio Fedare trail",
                    type: "hike",
                    duration: "2h",
                    distance: "6 km",
                    description: "Randonnée modérée vers refuge alpin. Paysage de haute montagne. Chien bienvenu.",
                    lat: 46.4200,
                    lng: 11.8500,
                    difficulty: "Modérée"
                },
                {
                    id: "5-3",
                    name: "Lac de Soraya",
                    type: "site",
                    duration: "1h30",
                    distance: "10 km",
                    description: "Petit lac alpin. Sentier facile et ombragé. Zone de pique-nique.",
                    lat: 46.3800,
                    lng: 11.8000
                },
                {
                    id: "5-4",
                    name: "Découverte du camping & Canazei",
                    type: "site",
                    duration: "1-2h",
                    distance: "100 km route",
                    description: "Installation au camping. Visite du charmant village de Canazei.",
                    lat: 46.4500,
                    lng: 11.9800
                }
            ]
        },
        {
            id: 6,
            date: "03/09",
            title: "Jour 6 - Exploration Canazei et Val di Fassa",
            accommodation: {
                name: "Camping Marmolada",
                location: "Canazei, Trentin-Haut-Adige",
                lat: 46.4500,
                lng: 11.9800,
                type: "Camping"
            },
            activities: [
                {
                    id: "6-1",
                    name: "Marmolada Glacier - Téléphérique & Randonnée",
                    type: "hike",
                    duration: "3-4h",
                    distance: "15 km round-trip",
                    description: "Peut nécessiter une réservation. Vue spectaculaire sur le glacier. Randonnée modérée depuis le sommet.",
                    lat: 46.4100,
                    lng: 11.8500,
                    difficulty: "Modérée",
                    reservation: true,
                    reservationDetails: "Telepherique Marmolada: reserver un billet horaire a l'avance en haute saison."
                },
                {
                    id: "6-2",
                    name: "Tre Cime di Lavaredo - Sentier facile",
                    type: "hike",
                    duration: "2-3h",
                    distance: "5-8 km",
                    description: "Vue sur les trois pics les plus célèbres des Dolomites. Accessible chien-friendly.",
                    lat: 46.5833,
                    lng: 12.0167,
                    difficulty: "Facile",
                    parking: "Parcheggio Rifugio Auronzo (acces route a peage, reservation utile en saison)",
                    parkingLat: 46.6125,
                    parkingLng: 12.3014,
                    walkRoute: "Boucle classique Rifugio Auronzo -> Rifugio Lavaredo -> Forcella Lavaredo -> Rifugio Locatelli -> retour",
                    walkDistance: "9.5 km",
                    walkDuration: "3h15"
                },
                {
                    id: "6-3",
                    name: "Circ trail - Col Rosa",
                    type: "hike",
                    duration: "2h30",
                    distance: "7 km",
                    description: "Sentier reculé avec peu de foule. Vues libres à 360°. Sol parfait pour chiens.",
                    lat: 46.4000,
                    lng: 11.9500,
                    difficulty: "Modérée"
                },
                {
                    id: "6-4",
                    name: "Lago Soraia",
                    type: "hike",
                    duration: "1h30",
                    distance: "4 km",
                    description: "Promenade facile autour du petit lac. Parfait pour l'après-midi. Peu fréquenté.",
                    lat: 46.4200,
                    lng: 11.8800,
                    difficulty: "Facile"
                }
            ]
        },
        {
            id: 7,
            date: "04/09",
            title: "Jour 7 - Canazei → San Cassiano",
            accommodation: {
                name: "Camping Sass Dlacia",
                location: "San Cassiano, Trentin-Haut-Adige",
                lat: 46.5500,
                lng: 12.1500,
                type: "Camping"
            },
            activities: [
                {
                    id: "7-1",
                    name: "Passo Ghedina - Panorama & Trail",
                    type: "hike",
                    duration: "2h30",
                    distance: "7 km",
                    description: "Route pittoresque. Sentier facile vers le col. Vues somptueuses des pic rocheux.",
                    lat: 46.5333,
                    lng: 12.0333,
                    difficulty: "Facile"
                },
                {
                    id: "7-2",
                    name: "Val di Fanes - Sentier nature",
                    type: "hike",
                    duration: "3h",
                    distance: "9 km",
                    description: "Vallée enchanteresse. Faune alpine. Parfait pour observer la nature avec votre chien.",
                    lat: 46.5333,
                    lng: 12.0333,
                    difficulty: "Modérée"
                },
                {
                    id: "7-3",
                    name: "Lago di Sorapis",
                    type: "site",
                    duration: "2-3h",
                    distance: "20 km route",
                    description: "Lac turquoise emblématique des Dolomites. Parking peut nécessiter réservation. Sites de pique-nique.",
                    lat: 46.5333,
                    lng: 12.2000,
                    reservation: true,
                    reservationDetails: "Parking Passo Tre Croci: arriver tot ou reserver si service actif selon la periode.",
                    parking: "Parking Passo Tre Croci (places limitees)",
                    parkingLat: 46.5888,
                    parkingLng: 12.1718,
                    walkRoute: "Aller-retour Passo Tre Croci -> Sentiero 215 -> Lago di Sorapis",
                    walkDistance: "11.5 km",
                    walkDuration: "4h30"
                },
                {
                    id: "7-4",
                    name: "Route vers San Cassiano",
                    type: "site",
                    duration: "1h",
                    distance: "30 km route",
                    description: "Parcours montagneux à travers le Colle di Ra Gusela. Arrêts photographiques multiples.",
                    lat: 46.5500,
                    lng: 12.1500
                }
            ]
        },
        {
            id: 8,
            date: "05/09",
            title: "Jour 8 - Discovery de San Cassiano & Alta Badia",
            accommodation: {
                name: "Camping Sass Dlacia",
                location: "San Cassiano, Trentin-Haut-Adige",
                lat: 46.5500,
                lng: 12.1500,
                type: "Camping"
            },
            activities: [
                {
                    id: "8-1",
                    name: "Sentier Strada del Ladin",
                    type: "site",
                    duration: "2-3h",
                    distance: "8-10 km",
                    description: "Célèbre sentier de randonnée à travers Alta Badia. Culture Ladin locale. Très chien-friendly.",
                    lat: 46.5500,
                    lng: 12.1500,
                    difficulty: "Facile"
                },
                {
                    id: "8-2",
                    name: "Sella Grup - Haute montagne",
                    type: "hike",
                    duration: "3-4h",
                    distance: "10 km",
                    description: "Randonnée alpine modérée. Massif rocheux spectaculaire. Réservation cable car possible.",
                    lat: 46.5433,
                    lng: 11.8833,
                    difficulty: "Modérée",
                    reservation: true,
                    reservationDetails: "Cable car Alta Badia/Sella: billet coupe-file recommande la veille ou 48h avant."
                },
                {
                    id: "8-3",
                    name: "Lago Fedare",
                    type: "hike",
                    duration: "2h30",
                    distance: "6 km",
                    description: "Petit lac secret à haute altitude. Peu fréquenté. Sentier bien marqué.",
                    lat: 46.5200,
                    lng: 12.0500,
                    difficulty: "Modérée"
                },
                {
                    id: "8-4",
                    name: "Villages Ladin - La Vil, Colfosco",
                    type: "site",
                    duration: "2h",
                    distance: "5-10 km",
                    description: "Villages traditionnels magnifiques. Architecture alpine. Restaurants locaux.",
                    lat: 46.5333,
                    lng: 12.0833
                }
            ]
        },
        {
            id: 9,
            date: "06/09",
            title: "Jour 9 - Aventure Bivouac en Haute Montagne",
            accommodation: {
                name: "Bivouac",
                location: "À définir - Sesto/Dolomites",
                lat: 46.6333,
                lng: 12.3333,
                type: "Bivouac sauvage"
            },
            activities: [
                {
                    id: "9-1",
                    name: "Tre Cime di Sumela - Randonnée intense",
                    type: "hike",
                    duration: "4-5h",
                    distance: "12-14 km",
                    description: "Sentier alpin vers les trois pics. Attention: vérifiez les conditions. Chien doit être entraîné.",
                    lat: 46.5833,
                    lng: 12.0167,
                    difficulty: "Difficile"
                },
                {
                    id: "9-2",
                    name: "Sorapis - Ascension",
                    type: "hike",
                    duration: "3-4h",
                    distance: "8-10 km",
                    description: "Randonnée alpine impressionnante. Phase d'escalade facile. Vue 360° en sommet.",
                    lat: 46.5333,
                    lng: 12.2000,
                    difficulty: "Modérée"
                },
                {
                    id: "9-3",
                    name: "Sesto - Sentier des trois pics",
                    type: "hike",
                    duration: "2-3h",
                    distance: "8 km",
                    description: "Vue sur Tre Cime depuis le Nord. Moins touristique. Parfait pour bivouac.",
                    lat: 46.6333,
                    lng: 12.3333,
                    difficulty: "Modérée"
                },
                {
                    id: "9-4",
                    name: "Installation bivouac sauvage",
                    type: "site",
                    duration: "2-3h",
                    distance: "Variable",
                    description: "À définir ensemble. Zones recommandées au-dessus de 2000m. Vérifiez la météo et régulations locales.",
                    lat: 46.6333,
                    lng: 12.3333
                }
            ]
        },
        {
            id: 10,
            date: "07/09",
            title: "Jour 10 - Bivouac → Trieste",
            accommodation: {
                name: "Villa Bella Vista",
                location: "Trieste, Friuli-Venezia Giulia",
                lat: 45.6500,
                lng: 13.7833,
                type: "B&B"
            },
            activities: [
                {
                    id: "10-1",
                    name: "Descente du bivouac",
                    type: "site",
                    duration: "2-3h",
                    distance: "5-10 km marche",
                    description: "Retour guidé jusqu'au point de ravitaillement. Route vers le sud jusqu'à Trieste.",
                    lat: 46.6333,
                    lng: 12.3333
                },
                {
                    id: "10-2",
                    name: "Route vers Trieste",
                    type: "site",
                    duration: "2h30-3h",
                    distance: "~170 km",
                    description: "Route côtière spectaculaire. Possible arrêt à Aquileia ou Palmanova. Paysage côtier.",
                    lat: 45.6500,
                    lng: 13.7833
                },
                {
                    id: "10-3",
                    name: "Trieste - Visite côtière",
                    type: "site",
                    duration: "1-2h",
                    description: "Arrivée à Trieste. Promenade en bord de mer. Installation à Villa Bella Vista.",
                    lat: 45.6500,
                    lng: 13.7833
                }
            ]
        },
        {
            id: 11,
            date: "08/09",
            title: "Jour 11 - Découverte de Trieste",
            accommodation: {
                name: "Villa Bella Vista",
                location: "Trieste, Friuli-Venezia Giulia",
                lat: 45.6500,
                lng: 13.7833,
                type: "B&B"
            },
            activities: [
                {
                    id: "11-1",
                    name: "Promenade Barcola - Côte Adriatique",
                    type: "site",
                    duration: "1-2h",
                    distance: "3 km",
                    description: "Magnifique côte avec plages. Toutes accessibles aux chiens. Barres de poisson frais.",
                    lat: 45.6500,
                    lng: 13.8000
                },
                {
                    id: "11-2",
                    name: "Château de Miramare",
                    type: "site",
                    duration: "2-3h",
                    distance: "8 km",
                    description: "Château blanc spectaculaire en bord de mer. Parc magnifique. Chien bienvenu en extérieur.",
                    lat: 45.7040,
                    lng: 13.7120,
                    parking: "Parcheggio Castello di Miramare (P1/P2)",
                    parkingLat: 45.7024,
                    parkingLng: 13.7115,
                    walkRoute: "Parcheggio -> Viale dei Lecci -> Belvedere -> Parco storico -> retour",
                    walkDistance: "3.2 km",
                    walkDuration: "1h"
                },
                {
                    id: "11-3",
                    name: "Vieille ville - Via Sant'Antonio",
                    type: "site",
                    duration: "2h",
                    distance: "Cœur de ville",
                    description: "Ruelle piétonnes pittoresques. Restaurants. Boutiques. Parfait pour musarder.",
                    lat: 45.6500,
                    lng: 13.7833
                },
                {
                    id: "11-4",
                    name: "Musée naval de Trieste",
                    type: "site",
                    duration: "1-2h",
                    distance: "0.5 km",
                    description: "Histoire maritime riche. Votre chien peut rester dehors à l'entrée.",
                    lat: 45.6500,
                    lng: 13.7833
                }
            ]
        },
        {
            id: 12,
            date: "09/09",
            title: "Jour 12 - Exploration côtière de Trieste",
            accommodation: {
                name: "Villa Bella Vista",
                location: "Trieste, Friuli-Venezia Giulia",
                lat: 45.6500,
                lng: 13.7833,
                type: "B&B"
            },
            activities: [
                {
                    id: "12-1",
                    name: "Grotta Gigante - Caverne souterraine",
                    type: "site",
                    duration: "2-3h",
                    distance: "15 km",
                    description: "Impressionnante grotte karstique. Votre chien reste à l'extérieur. Visite guidée en français.",
                    lat: 45.7000,
                    lng: 13.7500,
                    reservation: true,
                    reservationDetails: "Visite guidee Grotta Gigante: reserver un creneau pour garantir la langue et l'horaire souhaites.",
                    parking: "Parking officiel Grotta Gigante (gratuit)",
                    parkingLat: 45.7091,
                    parkingLng: 13.7646,
                    walkRoute: "Parking -> entree grotte -> sentier botanique court -> retour",
                    walkDistance: "1.8 km",
                    walkDuration: "35 min"
                },
                {
                    id: "12-2",
                    name: "Sentier côtier vers Aquileia",
                    type: "hike",
                    duration: "2-3h",
                    distance: "8 km",
                    description: "Chemin côtier très chien-friendly. Plages sauvages. Paysage Adriatique.",
                    lat: 45.6000,
                    lng: 13.8500,
                    difficulty: "Facile"
                },
                {
                    id: "12-3",
                    name: "Marché du Rialto de Trieste",
                    type: "site",
                    duration: "1-2h",
                    distance: "0.5 km",
                    description: "Marché traditionnel vibrant. Fruits frais, spécialités locales. Ambiance authentique.",
                    lat: 45.6500,
                    lng: 13.7833
                },
                {
                    id: "12-4",
                    name: "Coucher de soleil Barcola",
                    type: "site",
                    duration: "1-2h",
                    distance: "3 km",
                    description: "Parfait moment pour se détendre en fin d'après-midi. Restaurants au bord de la mer.",
                    lat: 45.6500,
                    lng: 13.8000
                }
            ]
        },
        {
            id: 13,
            date: "10/09",
            title: "Jour 13 - Trieste → Valdobbiadene",
            accommodation: {
                name: "Locanda Sandi",
                location: "Valdobbiadene, Veneto",
                lat: 45.8833,
                lng: 12.3000,
                type: "Locanda"
            },
            activities: [
                {
                    id: "13-1",
                    name: "Route viticole vers le Veneto",
                    type: "site",
                    duration: "2h30",
                    distance: "100 km",
                    description: "Route sublime. Arrêts possibles. Paysage de collines ondulantes. Vignobles Prosecco.",
                    lat: 45.8833,
                    lng: 12.3000
                },
                {
                    id: "13-2",
                    name: "Sentier des vignes de Valdobbiadene",
                    type: "hike",
                    duration: "2-3h",
                    distance: "7-8 km",
                    description: "Randonnée entre les vignobles UNESCO. Panoramas spectaculaires. Très accessible.",
                    lat: 45.8833,
                    lng: 12.3000,
                    difficulty: "Facile"
                },
                {
                    id: "13-3",
                    name: "Castelli d'Ateleta - Ruins",
                    type: "site",
                    duration: "1-2h",
                    distance: "3-5 km",
                    description: "Ruines de castels médiévaux. Sentier pédestre agréable. Vue panoramique.",
                    lat: 45.8667,
                    lng: 12.2833
                },
                {
                    id: "13-4",
                    name: "Visite locale de Valdobbiadene",
                    type: "site",
                    duration: "1-2h",
                    description: "Petite town, restaurants. Installation à Locanda Sandi. Dégustation Prosecco possible.",
                    lat: 45.8833,
                    lng: 12.3000
                }
            ]
        },
        {
            id: 14,
            date: "11/09",
            title: "Jour 14 - Valdobbiadene → Jovencan (Valle d'Aosta) - Retour",
            accommodation: {
                name: "Les Plaisirs d'Antan",
                location: "Jovencan, Valle d'Aosta",
                lat: 45.5500,
                lng: 7.5500,
                type: "Hôtel Boutique"
            },
            activities: [
                {
                    id: "14-1",
                    name: "Route des Alpes - Direction Ouest",
                    type: "site",
                    duration: "3-4h",
                    distance: "~270 km",
                    description: "Route spectaculaire. Paysage alpin. Possible passage par le Mont-Blanc. Arrêts recommandés.",
                    lat: 45.5500,
                    lng: 7.5500
                },
                {
                    id: "14-2",
                    name: "Vallée d'Aosta - Paysage alpin",
                    type: "site",
                    duration: "2-3h",
                    distance: "40 km",
                    description: "Paysage montagneux majestueux. Montagne du Mont-Blanc visible. Routes panoramiques.",
                    lat: 45.5500,
                    lng: 7.5500
                },
                {
                    id: "14-3",
                    name: "Installation & Détente",
                    type: "site",
                    duration: "2-3h",
                    description: "Arrivée à Jovencan. Installation à Les Plaisirs d'Antan. Fin du voyage. Repos bien mérité!",
                    lat: 45.5500,
                    lng: 7.5500
                }
            ]
        }
    ]
};
