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
                    name: "Seceda - Telepherique & cretes panoramiques",
                    type: "hike",
                    duration: "4-5h",
                    distance: "95 km route + 8 km marche",
                    description: "Grande classique des Dolomites depuis Ortisei. Ideal par beau temps pour une journee entiere avec panorama massif.",
                    lat: 46.5994,
                    lng: 11.7281,
                    difficulty: "Moderee",
                    groupKey: "seceda-odle",
                    reservation: true,
                    reservationDetails: "Telepherique Ortisei-Seceda: verifier billets et horaires, surtout en haute saison.",
                    parking: "Ortisei - parking village puis telepherique Seceda",
                    parkingLat: 46.5756,
                    parkingLng: 11.6713,
                    walkRoute: "Arrivee Seceda -> crete panoramique -> points de vue Odle -> retour telepherique",
                    walkDistance: "7.5 km",
                    walkDuration: "3h",
                    bookingUrl: "https://www.seceda.it/en/"
                },
                {
                    id: "4-2",
                    name: "Alpe di Siusi - Ortisei cable car",
                    type: "hike",
                    duration: "4-5h",
                    distance: "90 km route + 7 km marche",
                    description: "Tres belle option depuis Napura en evitant les restrictions voitures en journee sur l'Alpe. Depart recommande via Ortisei.",
                    lat: 46.5660,
                    lng: 11.7043,
                    difficulty: "Facile",
                    groupKey: "alpe-di-siusi",
                    reservation: true,
                    reservationDetails: "Montee conseillee via Ortisei/Seiser Alm Bahn pour eviter les limitations d'acces routier sur l'Alpe di Siusi.",
                    parking: "Ortisei / St. Ulrich - parking telepherique Alpe di Siusi",
                    parkingLat: 46.5749,
                    parkingLng: 11.6732,
                    walkRoute: "Station amont -> prairies de l'Alpe -> points de vue Sassolungo -> retour",
                    walkDistance: "7 km",
                    walkDuration: "2h30",
                    bookingUrl: "https://www.seiseralm.it/en/"
                },
                {
                    id: "4-3",
                    name: "Lac de Carezza",
                    type: "site",
                    duration: "1-2h",
                    distance: "38 km route",
                    description: "Lac iconique aux reflets verts et turquoises, ideal en option plus calme ou a combiner sur la route vers Canazei.",
                    lat: 46.4108,
                    lng: 11.5748,
                    groupKey: "carezza-lake",
                    parking: "Parcheggio Lago di Carezza",
                    parkingLat: 46.4104,
                    parkingLng: 11.5762,
                    walkRoute: "Passerelles autour du lac et points de vue forestiers",
                    walkDistance: "1.8 km",
                    walkDuration: "35 min"
                },
                {
                    id: "4-4",
                    name: "Kastelruth / Castelrotto",
                    type: "site",
                    duration: "1-2h",
                    distance: "26 km route",
                    description: "Village alpin tres photogenique, parfait pour une demi-journee tranquille ou une pause de fin de journee.",
                    lat: 46.5688,
                    lng: 11.5641
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
                    name: "Lac de Carezza",
                    type: "site",
                    duration: "1-2h",
                    distance: "35 km detour",
                    description: "Tres belle halte faisable entre Napura et Canazei. Fonctionne bien en debut de trajet pour casser la route.",
                    lat: 46.4108,
                    lng: 11.5748,
                    groupKey: "carezza-lake",
                    parking: "Parcheggio Lago di Carezza",
                    parkingLat: 46.4104,
                    parkingLng: 11.5762,
                    walkRoute: "Passerelles autour du lac et points de vue forestiers",
                    walkDistance: "1.8 km",
                    walkDuration: "35 min"
                },
                {
                    id: "5-2",
                    name: "Passo Sella",
                    type: "hike",
                    duration: "2-3h",
                    distance: "18 km route + 5 km marche",
                    description: "Belvederes majeurs sur le Sassolungo et le groupe du Sella. Ideal pour une premiere immersion autour de Canazei.",
                    lat: 46.5066,
                    lng: 11.7618,
                    groupKey: "passo-sella",
                    difficulty: "Modérée"
                },
                {
                    id: "5-3",
                    name: "Passo Gardena",
                    type: "site",
                    duration: "1-2h",
                    distance: "22 km route",
                    description: "Col tres photogenique, facile a integrer le jour d'arrivee pour profiter du meilleur de la route Dolomites.",
                    lat: 46.5539,
                    lng: 11.8102,
                    groupKey: "passo-gardena"
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
                    id: "6-4",
                    name: "Passo Giau",
                    type: "hike",
                    duration: "2-3h",
                    distance: "48 km route + 5 km marche",
                    description: "Un des plus beaux cols panoramiques, tres bon plan B si Tre Cime est trop charge ou meteo moyenne en haute altitude.",
                    lat: 46.4805,
                    lng: 12.0656,
                    difficulty: "Facile"
                },
                {
                    id: "6-5",
                    name: "Seceda - Telepherique & cretes panoramiques",
                    type: "hike",
                    duration: "4-5h",
                    distance: "40 km route + 8 km marche",
                    description: "Depuis Canazei, Seceda devient une excellente option de journee si vous preferez Odle plutot que Cortina/Tre Cime.",
                    lat: 46.5994,
                    lng: 11.7281,
                    difficulty: "Moderee",
                    groupKey: "seceda-odle",
                    reservation: true,
                    reservationDetails: "Telepherique Ortisei-Seceda: billets et horaires a verifier la veille.",
                    parking: "Ortisei - parking village puis telepherique Seceda",
                    parkingLat: 46.5756,
                    parkingLng: 11.6713,
                    walkRoute: "Arrivee Seceda -> crete panoramique -> points de vue Odle -> retour telepherique",
                    walkDistance: "7.5 km",
                    walkDuration: "3h",
                    bookingUrl: "https://www.seceda.it/en/"
                }
            ]
        },
        {
            id: 7,
            date: "04/09",
            title: "Jour 7 - Tre Cime + Cadini depuis Sass Dlacia",
            accommodation: {
                name: "Camping Sass Dlacia",
                location: "San Cassiano, Trentin-Haut-Adige",
                lat: 46.5534,
                lng: 11.9706,
                type: "Camping"
            },
            activities: [
                {
                    id: "7-6",
                    name: "Tre Cime di Lavaredo - Sentier facile",
                    type: "hike",
                    duration: "4-5h",
                    distance: "40 km route + 9.5 km marche",
                    description: "Grande boucle classique au depart du Rifugio Auronzo. Depuis le Camping Sass Dlacia, c'est la base la plus logique pour faire Tre Cime ce jour-la.",
                    lat: 46.6184,
                    lng: 12.3035,
                    difficulty: "Facile",
                    groupKey: "auronzo-parking",
                    choiceHint: "Vous pouvez faire Tre Cime seule, Cadini seule, ou les deux le meme jour. L'essentiel est le jour de reservation du parking Auronzo.",
                    reservation: true,
                    reservationDetails: "Route a peage du Rifugio Auronzo et parking a reserver/verifier tres tot en haute saison.",
                    parking: "Parcheggio Rifugio Auronzo (acces payant, a reserver/verifier selon la date)",
                    parkingLat: 46.6157,
                    parkingLng: 12.3009,
                    walkRoute: "Boucle classique Rifugio Auronzo -> Rifugio Lavaredo -> Forcella Lavaredo -> Rifugio Locatelli -> retour",
                    walkDistance: "9.5 km",
                    walkDuration: "3h15"
                },
                {
                    id: "7-7",
                    name: "Cadini di Misurina - Belvedere",
                    type: "hike",
                    duration: "2-3h",
                    distance: "40 km route + 4 km marche",
                    description: "Belvedere tres spectaculaire depuis le meme parking que Tre Cime. Logique a enchainer le meme jour tant que vous restez sur une journee montagne bien remplie.",
                    lat: 46.6180,
                    lng: 12.2963,
                    difficulty: "Moderee",
                    groupKey: "auronzo-parking",
                    choiceHint: "Meme parking Auronzo que Tre Cime: vous pouvez faire l'un ou les deux, ou enchainer les deux si vous voulez une grosse journee.",
                    reservation: true,
                    reservationDetails: "Meme contrainte d'acces que Tre Cime: route a peage et parking Auronzo a anticiper.",
                    parking: "Parcheggio Rifugio Auronzo (meme acces que Tre Cime)",
                    parkingLat: 46.6157,
                    parkingLng: 12.3009,
                    walkRoute: "Rifugio Auronzo -> sentier Cadini -> belvedere -> retour",
                    walkDistance: "4 km",
                    walkDuration: "2h"
                },
                {
                    id: "7-1",
                    name: "Lago di Braies",
                    type: "site",
                    duration: "2-3h",
                    distance: "22 km route + 4 km marche",
                    description: "Grand classique faisable depuis San Cassiano/Sass Dlacia, mieux tot le matin pour eviter la foule et profiter des reflets.",
                    lat: 46.6944,
                    lng: 12.0847,
                    difficulty: "Facile",
                    groupKey: "lago-braies",
                    parking: "Parcheggio Lago di Braies / Pragser Wildsee",
                    parkingLat: 46.6928,
                    parkingLng: 12.0853,
                    walkRoute: "Tour partiel ou complet du lac selon l'affluence",
                    walkDistance: "3.6 km",
                    walkDuration: "1h15",
                    reservation: true,
                    reservationDetails: "Le parking peut etre regule/reservable selon la saison et l'horaire. Arrivee tres tot recommandee."
                },
                {
                    id: "7-2",
                    name: "Vallunga Valley",
                    type: "hike",
                    duration: "3-4h",
                    distance: "25 km route + 8 km marche",
                    description: "Tres belle vallee ouverte et facile a lire, excellente journee de rando sans logistique cable car.",
                    lat: 46.5637,
                    lng: 11.7506,
                    difficulty: "Modérée"
                },
                {
                    id: "7-3",
                    name: "Lago di Sorapis",
                    type: "hike",
                    duration: "4-5h",
                    distance: "42 km route + 11.5 km marche",
                    description: "Lac turquoise emblématique. Belle journee complete si vous partez tot depuis San Cassiano.",
                    lat: 46.5333,
                    lng: 12.2000,
                    groupKey: "lago-sorapis",
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
                    lat: 46.5534,
                    lng: 11.9706
                },
                {
                    id: "7-5",
                    name: "Passo Giau",
                    type: "site",
                    duration: "1-2h",
                    distance: "34 km route",
                    description: "Excellent spot photo et balade facile a combiner sur une journee autour de Cortina/Sorapis.",
                    lat: 46.4805,
                    lng: 12.0656,
                    groupKey: "passo-giau"
                }
            ]
        },
        {
            id: 8,
            date: "05/09",
            title: "Jour 8 - Alta Badia relax apres Tre Cime",
            accommodation: {
                name: "Camping Sass Dlacia",
                location: "San Cassiano, Trentin-Haut-Adige",
                lat: 46.5534,
                lng: 11.9706,
                type: "Camping"
            },
            activities: [
                {
                    id: "8-1",
                    name: "Passo Valparola & Forte Tre Sassi",
                    type: "site",
                    duration: "1-2h",
                    distance: "9 km route",
                    description: "Option tres cool avec parking direct sur le col, grand panorama et petit passage au fort si vous voulez une sortie ultra legere.",
                    lat: 46.5198,
                    lng: 11.9933,
                    parking: "Parking direct au Passo Valparola / Forte Tre Sassi",
                    parkingLat: 46.5198,
                    parkingLng: 11.9933,
                    difficulty: "Facile"
                },
                {
                    id: "8-2",
                    name: "Passo Gardena",
                    type: "site",
                    duration: "1-2h",
                    distance: "18 km route",
                    description: "Un des plus beaux cols autour de San Cassiano, ideal pour une pause photo sans effort avec parking sur place.",
                    lat: 46.5539,
                    lng: 11.8102,
                    groupKey: "passo-gardena",
                    parking: "Parking direct au col",
                    parkingLat: 46.5539,
                    parkingLng: 11.8102,
                    difficulty: "Facile"
                },
                {
                    id: "8-3",
                    name: "Corvara & Colfosco",
                    type: "site",
                    duration: "1-2h",
                    distance: "10 km route",
                    description: "Boucle tres facile entre deux villages, terrasses, cafe et petites pauses sans gros effort physique.",
                    lat: 46.5511,
                    lng: 11.8738,
                    parking: "Parkings de village a Corvara ou Colfosco",
                    parkingLat: 46.5511,
                    parkingLng: 11.8738
                },
                {
                    id: "8-4",
                    name: "Lago di Misurina",
                    type: "site",
                    duration: "1-2h",
                    distance: "46 km route",
                    description: "Grand lac tres accessible avec parking au bord de l'eau. Bon plan repos pour profiter sans ajouter une rando supplementaire.",
                    lat: 46.5819,
                    lng: 12.2554,
                    parking: "Parkings directs autour du lac",
                    parkingLat: 46.5819,
                    parkingLng: 12.2554,
                    walkRoute: "Petite promenade libre en bord de lac selon l'energie du jour",
                    walkDistance: "1-2 km",
                    walkDuration: "30-45 min"
                },
                {
                    id: "8-5",
                    name: "Passo Giau",
                    type: "site",
                    duration: "45 min-1h",
                    distance: "34 km route",
                    description: "Spot photo tres simple avec parking direct, parfait pour garder du jus apres le gros combo Tre Cime + Cadini de la veille.",
                    lat: 46.4805,
                    lng: 12.0656,
                    groupKey: "passo-giau-recovery",
                    parking: "Parking direct au col",
                    parkingLat: 46.4805,
                    parkingLng: 12.0656,
                    difficulty: "Facile",
                    walkRoute: "Quelques minutes autour du col et des belvederes accessibles tout de suite",
                    walkDistance: "0.5-1 km",
                    walkDuration: "15-20 min"
                }
            ]
        },
        {
            id: 9,
            date: "06/09",
            title: "Jour 9 - Bivouac Lago delle Baste / Mondeval",
            accommodation: {
                name: "Bivouac Lago delle Baste",
                location: "Mondeval, départ Passo Giau",
                lat: 46.4677,
                lng: 12.0818,
                type: "Bivouac sauvage"
            },
            travelInfo: {
                from: "Camping Sass Dlacia",
                distance: "~35 km jusqu'a Passo Giau",
                duration: "~50 min de route",
                note: "Jour volontairement leger: garder de l'energie pour l'approche a pied de fin de journee."
            },
            activities: [
                {
                    id: "9-1",
                    name: "Matinee cool a San Cassiano",
                    type: "site",
                    duration: "1-2h",
                    distance: "Sur place",
                    description: "Petit-dejeuner long, courses, balade tres douce ou temps calme au camping pour rester frais avant la rando du soir.",
                    lat: 46.5534,
                    lng: 11.9706,
                    difficulty: "Facile"
                },
                {
                    id: "9-2",
                    name: "Passo Giau - pause panoramique & repérage parking",
                    type: "site",
                    duration: "45 min-1h",
                    distance: "35 km route",
                    description: "Monter tranquillement au col, reperer le parking et profiter d'un spot photo avant de partir a pied en fin d'apres-midi.",
                    lat: 46.4805,
                    lng: 12.0656,
                    parking: "Parking direct au Passo Giau",
                    parkingLat: 46.4805,
                    parkingLng: 12.0656
                },
                {
                    id: "9-3",
                    name: "Passo Giau -> Lago delle Baste",
                    type: "hike",
                    duration: "2h",
                    distance: "5-6 km marche",
                    description: "Approche de fin de journee vers le lac. C'est la vraie rando utile du jour, pensee pour rester raisonnable avant la nuit au bivouac.",
                    lat: 46.4677,
                    lng: 12.0818,
                    parking: "Parking de depart au Passo Giau",
                    parkingLat: 46.4805,
                    parkingLng: 12.0656,
                    walkRoute: "Passo Giau -> sentier vers Mondeval -> Lago delle Baste",
                    walkDistance: "5-6 km",
                    walkDuration: "2h",
                    difficulty: "Modérée"
                },
                {
                    id: "9-4",
                    name: "Installation du bivouac au lago delle Baste",
                    type: "site",
                    duration: "1h",
                    distance: "Sur place",
                    description: "Choix du spot, installation et soiree calme au bord du lac avec vue sur Mondeval. Verifier meteo, eau et reglementation locale.",
                    lat: 46.4677,
                    lng: 12.0818
                }
            ]
        },
        {
            id: 10,
            date: "07/09",
            title: "Jour 10 - Bivouac Lago delle Baste → Trieste",
            accommodation: {
                name: "Villa Bella Vista",
                location: "Trieste, Friuli-Venezia Giulia",
                lat: 45.6500,
                lng: 13.7833,
                type: "B&B"
            },
            travelInfo: {
                from: "Passo Giau (apres la descente)",
                distance: "~205 km",
                duration: "~3h30",
                note: "Compter d'abord la descente a pied jusqu'a la voiture avant la longue route vers Trieste."
            },
            activities: [
                {
                    id: "10-1",
                    name: "Lago delle Baste -> Passo Giau",
                    type: "hike",
                    duration: "2h",
                    distance: "5-6 km marche",
                    description: "Descente du bivouac jusqu'a la voiture laissee au Passo Giau. Journee simple mais a prendre au serieux avant la route.",
                    lat: 46.4805,
                    lng: 12.0656,
                    difficulty: "Facile"
                },
                {
                    id: "10-2",
                    name: "Route vers Trieste",
                    type: "site",
                    duration: "3h-4h",
                    distance: "~205 km",
                    description: "Long transfert apres la descente. Garder cette etape assez simple et faire surtout des pauses confort sur la route.",
                    lat: 45.6500,
                    lng: 13.7833
                },
                {
                    id: "10-3",
                    name: "Trieste - promenade front de mer",
                    type: "site",
                    duration: "1-2h",
                    description: "Arrivee douce a Trieste, installation puis petite marche de recuperation sur le bord de mer si l'energie est encore la.",
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
