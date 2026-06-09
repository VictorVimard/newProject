let map;
let directionsRenderer;
let selectedActivities = [];
let currentDay = 1;
let currentMarkers = [];

function loadGoogleMapsApi() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const apiKey = window.GOOGLE_MAPS_API_KEY;
        if (!apiKey || apiKey === '__GOOGLE_MAPS_API_KEY__') {
            reject(new Error('Google Maps API key is missing.'));
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Maps API.'));
        document.head.appendChild(script);
    });
}

function init() {
    loadGoogleMapsApi()
        .then(() => {
            renderDaysList();
            initMap();
            selectDay(1);
        })
        .catch(() => {
            const mapNode = document.getElementById('map');
            if (mapNode) {
                mapNode.innerHTML = '<div style="padding:16px;color:#b00020;font-weight:600;">Carte indisponible: clé API Google Maps manquante.</div>';
            }
            renderDaysList();
            selectDay(1);
        });
}

function renderDaysList() {
    const daysList = document.getElementById('daysList');
    daysList.innerHTML = '';

    roadTripData.days.forEach((day) => {
        const dayItem = document.createElement('div');
        dayItem.className = 'day-item';
        if (day.id === currentDay) dayItem.classList.add('active');

        dayItem.innerHTML = `
            <div class="day-title">Jour ${day.id}</div>
            <div class="day-title">${day.date}</div>
            <div class="accommodation-name">${day.accommodation.name}</div>
        `;

        dayItem.addEventListener('click', () => selectDay(day.id));
        daysList.appendChild(dayItem);
    });
}

function selectDay(dayId) {
    currentDay = dayId;
    selectedActivities = [];

    document.querySelectorAll('.day-item').forEach((item, idx) => {
        item.classList.toggle('active', idx + 1 === dayId);
    });

    const day = roadTripData.days[dayId - 1];
    document.getElementById('dayTitle').textContent = `Jour ${dayId} - ${day.date}`;
    document.getElementById('daySubtitle').textContent = day.title;

    renderAccommodationInfo(day);
    renderTravelInfo(day);
    renderActivities(day);

    clearMap();
    document.getElementById('chainsSection').innerHTML = '';
}

function renderAccommodationInfo(day) {
    let html = `
        <div class="accommodation-section">
            <h3>Logement - ${day.date}</h3>
            <p><strong>${day.accommodation.name}</strong></p>
            <p>${day.accommodation.location}</p>
            <p><em>${day.accommodation.type}</em></p>
    `;

    if (day.previousAccommodation && day.id > 1) {
        html += `
            <p style="margin-top: 15px; color: #666; font-size: 12px;">
                <strong>Provenance:</strong> ${day.previousAccommodation.duration} de route (${day.previousAccommodation.distance})
            </p>
        `;
    }

    html += '</div>';
    document.getElementById('accommodationInfo').innerHTML = html;
}

function renderTravelInfo(day) {
    let html = '';

    if (day.travelInfo) {
        html = `
            <div class="travel-info">
                <strong>Info Trajet:</strong><br/>
                ${day.travelInfo.from} -> ${day.accommodation.location}<br/>
                Distance: ${day.travelInfo.distance} | Duree: <strong>${day.travelInfo.duration}</strong><br/>
                <em>${day.travelInfo.note}</em>
            </div>
        `;
    }

    const dayStart = getDayStartLocation(day);
    if (dayStart && dayStart.name !== day.accommodation.name) {
        html += `
            <div class="start-origin">
                <strong>Depart de la journee:</strong> ${dayStart.name}
            </div>
        `;
    }

    document.getElementById('travelInfo').innerHTML = html;
}

function getDayStartLocation(day) {
    if (day.previousAccommodation && day.previousAccommodation.lat && day.previousAccommodation.lng) {
        return {
            name: day.previousAccommodation.name,
            lat: day.previousAccommodation.lat,
            lng: day.previousAccommodation.lng
        };
    }

    // Fallback: on transition days, start from the previous day's accommodation.
    const dayIndex = roadTripData.days.findIndex((d) => d.id === day.id);
    if (dayIndex > 0) {
        const prevDay = roadTripData.days[dayIndex - 1];
        if (prevDay && prevDay.accommodation && prevDay.accommodation.lat && prevDay.accommodation.lng) {
            return {
                name: prevDay.accommodation.name,
                lat: prevDay.accommodation.lat,
                lng: prevDay.accommodation.lng
            };
        }
    }

    return {
        name: day.accommodation.name,
        lat: day.accommodation.lat,
        lng: day.accommodation.lng
    };
}

function renderActivities(day) {
    const activitiesList = document.getElementById('activitiesList');
    activitiesList.innerHTML = '';

    if (!day.activities || day.activities.length === 0) {
        activitiesList.innerHTML = '<div class="no-content">Pas d\'activites programmees.</div>';
        return;
    }

    day.activities.forEach((activity) => {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'activity';
        activityDiv.id = `activity-${activity.id}`;

        if (selectedActivities.includes(activity.id)) {
            activityDiv.classList.add('selected');
        }

        const typeClass = activity.type === 'hike' ? 'hike' : 'site';
        const typeLabel = activity.type === 'hike' ? 'Randonnee' : 'Site';

        let badges = '';
        if (activity.difficulty) {
            badges += `<span class="activity-type">${activity.difficulty}</span>`;
        }
        if (activity.reservation) {
            badges += '<span class="activity-type" style="background: #ff6b6b;">Reservation</span>';
        }

        const extraInfo = [];
        if (activity.parking) {
            extraInfo.push(`<div><strong>Parking conseille:</strong> ${activity.parking}</div>`);
        }
        if (activity.walkRoute) {
            const walkMeta = [];
            if (activity.walkDistance) walkMeta.push(activity.walkDistance);
            if (activity.walkDuration) walkMeta.push(activity.walkDuration);
            const walkMetaText = walkMeta.length ? ` (${walkMeta.join(' | ')})` : '';
            extraInfo.push(`<div><strong>Itineraire pedestre:</strong> ${activity.walkRoute}${walkMetaText}</div>`);
        }
        if (activity.reservation) {
            const reservationNote = activity.reservationDetails
                ? activity.reservationDetails
                : 'Reservation recommandee (parking/cable car/visite selon la saison).';
            extraInfo.push(`<div><strong>Reservation:</strong> ${reservationNote}</div>`);
        }
        const extraInfoHtml = extraInfo.length
            ? `<div class="activity-extra">${extraInfo.join('')}</div>`
            : '';

        const walkButtonHtml = (activity.parkingLat && activity.parkingLng)
            ? `<button class="btn btn-info" onclick="openWalkRoute('${activity.id}')">Itineraire a pied</button>`
            : '';

        activityDiv.innerHTML = `
            <div class="activity-name">${activity.name}</div>
            <span class="activity-type ${typeClass}">${typeLabel}</span>
            ${badges}
            <div class="activity-duration">Duree: ${activity.duration} | Distance: ${activity.distance}</div>
            <div class="activity-description">${activity.description}</div>
            ${extraInfoHtml}
            <div class="activity-buttons">
                <button class="btn btn-info" onclick="showActivityOnMap('${activity.id}')">Voir dans la carte</button>
                <button class="btn btn-maps" onclick="openInGoogleMaps('${activity.id}')">Ouvrir Google Maps</button>
                ${walkButtonHtml}
            </div>
        `;

        activityDiv.addEventListener('click', (e) => {
            if (!e.target.closest('.btn')) {
                toggleActivitySelection(activity.id, activityDiv);
                showActivityOnMap(activity.id);
            }
        });

        activitiesList.appendChild(activityDiv);
    });
}

function toggleActivitySelection(activityId, element) {
    if (selectedActivities.includes(activityId)) {
        selectedActivities = selectedActivities.filter((id) => id !== activityId);
        element.classList.remove('selected');
    } else {
        selectedActivities.push(activityId);
        element.classList.add('selected');
    }

    renderChains();
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 46.0, lng: 11.5 }
    });

    directionsRenderer = new google.maps.DirectionsRenderer({
        map,
        polylineOptions: { strokeColor: '#667eea', strokeWeight: 4 },
        suppressMarkers: true
    });
}

function clearMap() {
    if (!map) return;

    map.setZoom(10);
    map.panTo({ lat: 46.0, lng: 11.5 });
    clearMapMarkers();

    if (directionsRenderer) {
        directionsRenderer.setDirections({ routes: [] });
    }
}

function showActivityOnMap(activityId) {
    const day = roadTripData.days[currentDay - 1];
    const activity = day.activities.find((a) => a.id === activityId);
    if (!activity) return;

    const dayStart = getDayStartLocation(day);
    const accommodationLoc = { lat: dayStart.lat, lng: dayStart.lng };
    const activityLoc = { lat: activity.lat, lng: activity.lng };

    clearMapMarkers();

    currentMarkers.push(new google.maps.Marker({
        position: accommodationLoc,
        map,
        title: dayStart.name,
        icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    }));

    currentMarkers.push(new google.maps.Marker({
        position: activityLoc,
        map,
        title: activity.name,
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    }));

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
        {
            origin: accommodationLoc,
            destination: activityLoc,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            }
        }
    );
}

function openInGoogleMaps(activityId) {
    const day = roadTripData.days[currentDay - 1];
    const activity = day.activities.find((a) => a.id === activityId);
    if (!activity) return;

    const dayStart = getDayStartLocation(day);
    const origin = `${dayStart.lat},${dayStart.lng}`;
    const destination = `${activity.lat},${activity.lng}`;
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`, '_blank');
}

function openWalkRoute(activityId) {
    const day = roadTripData.days[currentDay - 1];
    const activity = day.activities.find((a) => a.id === activityId);
    if (!activity || !activity.parkingLat || !activity.parkingLng) return;

    const origin = `${activity.parkingLat},${activity.parkingLng}`;
    const destination = `${activity.lat},${activity.lng}`;
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`, '_blank');
}

function getActivityInfo(activityId) {
    const day = roadTripData.days[currentDay - 1];
    const activity = day.activities.find((a) => a.id === activityId);
    if (!activity) return;

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(activity.name + ' ' + day.accommodation.location)}`;
    window.open(searchUrl, '_blank');
}

function renderChains() {
    const day = roadTripData.days[currentDay - 1];
    const chainsSection = document.getElementById('chainsSection');

    if (selectedActivities.length < 2) {
        chainsSection.innerHTML = '';
        return;
    }

    const activities = selectedActivities
        .map((id) => day.activities.find((a) => a.id === id))
        .filter(Boolean);

    const dayStart = getDayStartLocation(day);
    const stepLines = [
        `0. Depart: ${dayStart.name}`,
        ...activities.map((a, i) => `${i + 1}. ${a.name}`),
        `${activities.length + 1}. Arrivee: ${day.accommodation.name}`
    ];

    chainsSection.innerHTML = `
        <div class="chains-section">
            <h4>Combiner les activites</h4>
            <div class="chain-option">
                <strong>Boucle complete (${activities.length} sites)</strong><br/>
                ${activities.map((a, i) => `${i + 1}. ${a.name}`).join(' -> ')}<br/>
                <div class="chain-steps">${stepLines.join('<br/>')}</div>
                <button class="btn btn-info" style="margin-top: 8px;" onclick="showChainRouteOnMap()">Afficher la boucle sur la carte</button>
                <button class="btn btn-maps" style="margin-top: 8px;" onclick="showChainRoute()">Ouvrir la boucle dans Google Maps</button>
            </div>
        </div>
    `;
}

function showChainRouteOnMap() {
    const day = roadTripData.days[currentDay - 1];
    const activities = selectedActivities
        .map((id) => day.activities.find((a) => a.id === id))
        .filter(Boolean);

    if (activities.length < 2) return;

    const dayStart = getDayStartLocation(day);
    const origin = { lat: dayStart.lat, lng: dayStart.lng };
    const destination = { lat: day.accommodation.lat, lng: day.accommodation.lng };
    const waypoints = activities.map((a) => ({
        location: { lat: a.lat, lng: a.lng },
        stopover: true
    }));

    clearMapMarkers();
    currentMarkers.push(new google.maps.Marker({
        position: origin,
        map,
        title: `Depart: ${dayStart.name}`,
        icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    }));

    activities.forEach((a, i) => {
        currentMarkers.push(new google.maps.Marker({
            position: { lat: a.lat, lng: a.lng },
            map,
            label: `${i + 1}`,
            title: a.name
        }));
    });

    currentMarkers.push(new google.maps.Marker({
        position: destination,
        map,
        title: `Arrivee: ${day.accommodation.name}`,
        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
    }));

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
        {
            origin,
            destination,
            waypoints,
            optimizeWaypoints: false,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            }
        }
    );
}

function showChainRoute() {
    const day = roadTripData.days[currentDay - 1];
    const activities = selectedActivities
        .map((id) => day.activities.find((a) => a.id === id))
        .filter(Boolean);

    if (activities.length < 2) return;

    const dayStart = getDayStartLocation(day);
    const origin = `${dayStart.lat},${dayStart.lng}`;
    const destination = `${day.accommodation.lat},${day.accommodation.lng}`;
    const waypoints = activities
        .map((a) => `${a.lat},${a.lng}`)
        .join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${encodeURIComponent(waypoints)}&travelmode=driving`;
    window.open(url, '_blank');
}

function clearMapMarkers() {
    currentMarkers.forEach((marker) => marker.setMap(null));
    currentMarkers = [];
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentDay < roadTripData.days.length) {
        selectDay(currentDay + 1);
    } else if (e.key === 'ArrowLeft' && currentDay > 1) {
        selectDay(currentDay - 1);
    }
});

window.addEventListener('load', init);
