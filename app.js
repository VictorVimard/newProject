let map;
let directionsRenderer;
let selectedActivities = [];
let currentDay = 1;
let currentMarkers = [];
let currentView = 'explore';
const DAILY_TIME_BUDGET_MINUTES = 8 * 60;
const STORAGE_KEY = 'roadtrip_selection_state_v1';
let daySelections = {};
let activityAssignments = {};

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
    initializePlanningState();

    loadGoogleMapsApi()
        .then(() => {
            renderDaysList();
            updateViewState();
            initMap();
            selectDay(1);
        })
        .catch(() => {
            const mapNode = document.getElementById('map');
            if (mapNode) {
                mapNode.innerHTML = '<div style="padding:16px;color:#b00020;font-weight:600;">Carte indisponible: clé API Google Maps manquante.</div>';
            }
            renderDaysList();
            updateViewState();
            selectDay(1);
        });
}

function initializePlanningState() {
    roadTripData.days.forEach((day) => {
        day.activities.forEach((activity) => {
            activity.canonicalKey = getActivityCanonicalKey(activity);
            activity.durationMinutes = getActivityDurationMinutes(activity.duration);
        });
    });

    hydratePlanningState();
    selectedActivities = getSelectedActivitiesForDay(currentDay);
}

function hydratePlanningState() {
    const defaultSelections = {};
    roadTripData.days.forEach((day) => {
        defaultSelections[day.id] = [];
    });

    daySelections = defaultSelections;
    activityAssignments = {};

    let rawState = null;
    try {
        rawState = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch {
        rawState = null;
    }

    if (rawState && rawState.daySelections) {
        Object.entries(rawState.daySelections).forEach(([dayId, activityIds]) => {
            const numericDayId = Number(dayId);
            const day = getDayById(numericDayId);
            if (!day || !Array.isArray(activityIds)) {
                return;
            }

            const validIds = [];
            activityIds.forEach((activityId) => {
                const activity = day.activities.find((candidate) => candidate.id === activityId);
                if (!activity) {
                    return;
                }

                const assignedDay = activityAssignments[activity.canonicalKey];
                if (assignedDay && assignedDay !== numericDayId) {
                    return;
                }

                activityAssignments[activity.canonicalKey] = numericDayId;
                validIds.push(activityId);
            });

            daySelections[numericDayId] = validIds;
        });
    }

    persistPlanningState();
}

function persistPlanningState() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                daySelections,
                activityAssignments
            })
        );
    } catch {
        // Ignore persistence failures (private browsing, quota, etc.).
    }
}

function getDayById(dayId) {
    return roadTripData.days.find((day) => day.id === dayId);
}

function getSelectedActivitiesForDay(dayId) {
    return [...(daySelections[dayId] || [])];
}

function normalizeText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function getActivityCanonicalKey(activity) {
    if (activity.groupKey) {
        return normalizeText(activity.groupKey);
    }

    const roundedLat = Number(activity.lat || 0).toFixed(3);
    const roundedLng = Number(activity.lng || 0).toFixed(3);
    return `${normalizeText(activity.name)}-${roundedLat}-${roundedLng}`;
}

function isActivityLockedForDay(activity, dayId) {
    const assignedDay = activityAssignments[activity.canonicalKey];
    return Boolean(assignedDay && assignedDay !== dayId);
}

function getActivityLockedDay(activity) {
    return activityAssignments[activity.canonicalKey] || null;
}

function parseHourMinuteText(text) {
    const hourMinutePattern = /(\d+)\s*h\s*(\d+)?/i;
    const minutePattern = /(\d+)\s*min/i;

    const hourMatch = text.match(hourMinutePattern);
    const minuteMatch = text.match(minutePattern);

    let total = 0;
    if (hourMatch) {
        total += Number(hourMatch[1]) * 60;
        if (hourMatch[2]) {
            total += Number(hourMatch[2]);
        }
    }

    if (!hourMatch && minuteMatch) {
        total += Number(minuteMatch[1]);
    }

    return total;
}

function getActivityDurationMinutes(durationLabel) {
    const text = String(durationLabel || '').toLowerCase();
    if (!text) {
        return 90;
    }

    if (text.includes('-')) {
        const parts = text.split('-').map((part) => part.trim());
        const minPart = parseHourMinuteText(parts[0]);
        const maxPart = parseHourMinuteText(parts[1]);
        if (minPart > 0 && maxPart > 0) {
            return Math.round((minPart + maxPart) / 2);
        }
    }

    const parsedValue = parseHourMinuteText(text);
    if (parsedValue > 0) {
        return parsedValue;
    }

    return 90;
}

function haversineDistanceKm(origin, destination) {
    const toRad = (angle) => (angle * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const latDiff = toRad(destination.lat - origin.lat);
    const lngDiff = toRad(destination.lng - origin.lng);

    const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(toRad(origin.lat)) * Math.cos(toRad(destination.lat)) *
        Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

function estimateDriveMinutes(origin, destination) {
    const distanceKm = haversineDistanceKm(origin, destination);
    const averageRoadSpeedKmPerHour = 55;
    const baseMinutes = (distanceKm / averageRoadSpeedKmPerHour) * 60;
    const fixedOverhead = 8;
    return Math.max(5, Math.round(baseMinutes + fixedOverhead));
}

function formatMinutes(totalMinutes) {
    const rounded = Math.max(0, Math.round(totalMinutes));
    const hours = Math.floor(rounded / 60);
    const minutes = rounded % 60;

    if (hours === 0) {
        return `${minutes} min`;
    }
    if (minutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h${String(minutes).padStart(2, '0')}`;
}

function renderDaysList() {
    const daysList = document.getElementById('daysList');
    daysList.innerHTML = '';

    roadTripData.days.forEach((day) => {
        const selectedCount = getSelectedActivitiesForDay(day.id).length;
        const dayItem = document.createElement('div');
        dayItem.className = 'day-item';
        if (day.id === currentDay) dayItem.classList.add('active');

        dayItem.innerHTML = `
            <div class="day-title">Jour ${day.id}</div>
            <div class="day-title">${day.date}</div>
            <div class="accommodation-name">${day.accommodation.name}</div>
            <div class="accommodation-name">Planifiees: ${selectedCount}</div>
        `;

        dayItem.addEventListener('click', () => selectDay(day.id));
        daysList.appendChild(dayItem);
    });
}

function selectDay(dayId) {
    currentDay = dayId;
    selectedActivities = getSelectedActivitiesForDay(dayId);

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
    renderChains();
    renderPlanningView();
    updateViewState();
}

function setView(viewName) {
    currentView = viewName === 'planning' ? 'planning' : 'explore';
    updateViewState();

    if (currentView === 'planning') {
        renderPlanningView();
    }
}

function updateViewState() {
    const exploreTab = document.getElementById('exploreTab');
    const planningTab = document.getElementById('planningTab');
    const exploreView = document.getElementById('exploreView');
    const planningView = document.getElementById('planningView');

    if (exploreTab) {
        exploreTab.classList.toggle('active', currentView === 'explore');
    }
    if (planningTab) {
        planningTab.classList.toggle('active', currentView === 'planning');
    }
    if (exploreView) {
        exploreView.classList.toggle('active', currentView === 'explore');
    }
    if (planningView) {
        planningView.classList.toggle('active', currentView === 'planning');
    }
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
    } else if (day.previousAccommodation) {
        const distanceText = day.previousAccommodation.distance || 'Distance a confirmer';
        const durationText = day.previousAccommodation.duration || 'Duree a confirmer';
        html = `
            <div class="travel-info">
                <strong>Info Trajet:</strong><br/>
                ${day.previousAccommodation.name} -> ${day.accommodation.location}<br/>
                Distance: ${distanceText} | Duree: <strong>${durationText}</strong><br/>
                <em>Jour de transition entre deux logements.</em>
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

    // Fallback: on transition days with travel info, start from the previous day's accommodation.
    const dayIndex = roadTripData.days.findIndex((d) => d.id === day.id);
    if (day.travelInfo && dayIndex > 0) {
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

    const dayStart = getDayStartLocation(day);

    day.activities.forEach((activity) => {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'activity';
        activityDiv.id = `activity-${activity.id}`;
        const isLocked = isActivityLockedForDay(activity, day.id);
        const lockedDay = getActivityLockedDay(activity);

        if (selectedActivities.includes(activity.id)) {
            activityDiv.classList.add('selected');
        }
        if (isLocked) {
            activityDiv.classList.add('unavailable');
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
        if (activity.bookingUrl) {
            extraInfo.push(`<div><strong>Reservation en ligne:</strong> lien disponible</div>`);
        }
        if (Array.isArray(activity.bookingLinks) && activity.bookingLinks.length) {
            extraInfo.push(`<div><strong>Reservations:</strong> ${activity.bookingLinks.length} lien(s) disponible(s)</div>`);
        }

        const driveEstimateMinutes = estimateDriveMinutes(dayStart, { lat: activity.lat, lng: activity.lng });
        const totalEstimateMinutes = driveEstimateMinutes + activity.durationMinutes;

        if (isLocked) {
            extraInfo.push(`<div><strong>Indisponible:</strong> deja planifiee au jour ${lockedDay}.</div>`);
        }

        const extraInfoHtml = extraInfo.length
            ? `<div class="activity-extra">${extraInfo.join('')}</div>`
            : '';

        const walkButtonHtml = (activity.parkingLat && activity.parkingLng)
            ? `<button class="btn btn-info" onclick="openWalkRoute('${activity.id}')">Itineraire a pied</button>`
            : '';

        const reservationButtonHtml = (activity.reservation || activity.bookingUrl || (Array.isArray(activity.bookingLinks) && activity.bookingLinks.length))
            ? `<button class="btn btn-chain" onclick="openBookingLinks('${activity.id}')">Reservation</button>`
            : '';

        activityDiv.innerHTML = `
            <div class="activity-name">${activity.name}</div>
            <span class="activity-type ${typeClass}">${typeLabel}</span>
            ${badges}
            <div class="activity-duration">Duree: ${activity.duration} | Distance: ${activity.distance}</div>
            <div class="activity-distance">Trajet estime: ${formatMinutes(driveEstimateMinutes)} | Temps total estime: ${formatMinutes(totalEstimateMinutes)}</div>
            <div class="activity-description">${activity.description}</div>
            ${extraInfoHtml}
            <div class="activity-buttons">
                <button class="btn btn-info" onclick="showActivityOnMap('${activity.id}')">Voir dans la carte</button>
                <button class="btn btn-maps" onclick="openInGoogleMaps('${activity.id}')">Ouvrir Google Maps</button>
                ${walkButtonHtml}
                ${reservationButtonHtml}
            </div>
        `;

        activityDiv.addEventListener('click', (e) => {
            if (!e.target.closest('.btn')) {
                if (isLocked && !selectedActivities.includes(activity.id)) {
                    showActivityOnMap(activity.id);
                    return;
                }
                toggleActivitySelection(activity.id);
            }
        });

        activitiesList.appendChild(activityDiv);
    });
}

function toggleActivitySelection(activityId) {
    const day = getDayById(currentDay);
    const activity = day.activities.find((candidate) => candidate.id === activityId);
    if (!activity) {
        return;
    }

    const currentSelections = getSelectedActivitiesForDay(currentDay);
    const isSelected = currentSelections.includes(activityId);

    if (isSelected) {
        daySelections[currentDay] = currentSelections.filter((id) => id !== activityId);
        if (activityAssignments[activity.canonicalKey] === currentDay) {
            delete activityAssignments[activity.canonicalKey];
        }
    } else {
        const lockedDay = activityAssignments[activity.canonicalKey];
        if (lockedDay && lockedDay !== currentDay) {
            return;
        }

        daySelections[currentDay] = [...currentSelections, activityId];
        activityAssignments[activity.canonicalKey] = currentDay;
    }

    selectedActivities = getSelectedActivitiesForDay(currentDay);
    persistPlanningState();
    renderDaysList();
    renderActivities(day);
    renderChains();
    renderPlanningView();

    if (isSelected) {
        resetMapToDayStart(day);
    } else {
        showActivityOnMap(activityId);
    }
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

function resetMapToDayStart(day) {
    if (!map || !day) return;

    const dayStart = getDayStartLocation(day);
    const startLocation = { lat: dayStart.lat, lng: dayStart.lng };

    if (directionsRenderer) {
        directionsRenderer.setDirections({ routes: [] });
    }

    clearMapMarkers();
    map.setZoom(11);
    map.panTo(startLocation);

    currentMarkers.push(new google.maps.Marker({
        position: startLocation,
        map,
        title: dayStart.name,
        icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    }));
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

function openBookingLinks(activityId) {
    const day = roadTripData.days[currentDay - 1];
    const activity = day.activities.find((a) => a.id === activityId);
    if (!activity) return;

    if (activity.bookingUrl) {
        window.open(activity.bookingUrl, '_blank');
        return;
    }

    if (Array.isArray(activity.bookingLinks) && activity.bookingLinks.length) {
        const firstLink = activity.bookingLinks[0];
        if (typeof firstLink === 'string') {
            window.open(firstLink, '_blank');
            return;
        }
        if (firstLink && firstLink.url) {
            window.open(firstLink.url, '_blank');
            return;
        }
    }

    const searchQuery = `reservation ${activity.name} ${day.accommodation.location}`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
}

function getOrderedSelectedActivities(day) {
    return getSelectedActivitiesForDay(day.id)
        .map((id) => day.activities.find((activity) => activity.id === id))
        .filter(Boolean);
}

function calculateDayPlanMetrics(day, orderedActivities) {
    const start = getDayStartLocation(day);
    const end = {
        lat: day.accommodation.lat,
        lng: day.accommodation.lng
    };

    const legs = [];
    let travelMinutes = 0;
    let activityMinutes = 0;

    let previousPoint = {
        lat: start.lat,
        lng: start.lng,
        label: `Depart: ${start.name}`
    };

    orderedActivities.forEach((activity, index) => {
        const currentPoint = {
            lat: activity.lat,
            lng: activity.lng,
            label: `${index + 1}. ${activity.name}`
        };

        const legMinutes = estimateDriveMinutes(previousPoint, currentPoint);
        travelMinutes += legMinutes;
        activityMinutes += activity.durationMinutes;

        legs.push({
            from: previousPoint.label,
            to: currentPoint.label,
            minutes: legMinutes
        });

        previousPoint = currentPoint;
    });

    const returnMinutes = estimateDriveMinutes(previousPoint, {
        lat: end.lat,
        lng: end.lng,
        label: `Arrivee: ${day.accommodation.name}`
    });

    travelMinutes += returnMinutes;
    legs.push({
        from: previousPoint.label,
        to: `Arrivee: ${day.accommodation.name}`,
        minutes: returnMinutes
    });

    return {
        travelMinutes,
        activityMinutes,
        totalMinutes: travelMinutes + activityMinutes,
        budgetMinutes: DAILY_TIME_BUDGET_MINUTES,
        legs
    };
}

function optimizeSelectedActivitiesOrder() {
    const day = roadTripData.days[currentDay - 1];
    const activities = getOrderedSelectedActivities(day);

    if (activities.length < 2) {
        return;
    }

    const start = getDayStartLocation(day);
    const remaining = [...activities];
    const optimized = [];
    let currentPoint = { lat: start.lat, lng: start.lng };

    while (remaining.length) {
        let bestIndex = 0;
        let bestMinutes = Infinity;

        remaining.forEach((activity, index) => {
            const minutes = estimateDriveMinutes(currentPoint, {
                lat: activity.lat,
                lng: activity.lng
            });

            if (minutes < bestMinutes) {
                bestMinutes = minutes;
                bestIndex = index;
            }
        });

        const [bestActivity] = remaining.splice(bestIndex, 1);
        optimized.push(bestActivity);
        currentPoint = { lat: bestActivity.lat, lng: bestActivity.lng };
    }

    daySelections[currentDay] = optimized.map((activity) => activity.id);
    selectedActivities = getSelectedActivitiesForDay(currentDay);
    persistPlanningState();
    renderActivities(day);
    renderChains();
    renderPlanningView();
    showChainRouteOnMap();
}

function renderChains() {
    const day = roadTripData.days[currentDay - 1];
    const chainsSection = document.getElementById('chainsSection');

    if (selectedActivities.length === 0) {
        chainsSection.innerHTML = '';
        return;
    }

    const activities = getOrderedSelectedActivities(day);
    const metrics = calculateDayPlanMetrics(day, activities);
    const deltaBudget = metrics.budgetMinutes - metrics.totalMinutes;
    const budgetOk = deltaBudget >= 0;

    const dayStart = getDayStartLocation(day);
    const stepLines = [
        `0. Depart: ${dayStart.name}`,
        ...activities.map((a, i) => `${i + 1}. ${a.name}`),
        `${activities.length + 1}. Arrivee: ${day.accommodation.name}`
    ];

    const legLines = metrics.legs
        .map((leg) => `${leg.from} -> ${leg.to}: ${formatMinutes(leg.minutes)}`)
        .join('<br/>');

    const mapButtons = activities.length >= 2
        ? `
            <button class="btn btn-info" style="margin-top: 8px;" onclick="showChainRouteOnMap()">Afficher la boucle sur la carte</button>
            <button class="btn btn-maps" style="margin-top: 8px;" onclick="showChainRoute()">Ouvrir la boucle dans Google Maps</button>
        `
        : '';

    chainsSection.innerHTML = `
        <div class="chains-section">
            <h4>Plan de journee</h4>
            <div class="chain-option">
                <strong>Activites selectionnees: ${activities.length}</strong><br/>
                ${activities.map((a, i) => `${i + 1}. ${a.name}`).join(' -> ') || 'Selectionnez une activite'}<br/>
                <div class="chain-steps">${stepLines.join('<br/>')}</div>
                <div class="planner-summary">
                    <div><strong>Temps activites:</strong> ${formatMinutes(metrics.activityMinutes)}</div>
                    <div><strong>Temps trajet estime:</strong> ${formatMinutes(metrics.travelMinutes)}</div>
                    <div><strong>Total estime:</strong> ${formatMinutes(metrics.totalMinutes)} (budget ${formatMinutes(metrics.budgetMinutes)})</div>
                    <div class="planner-status ${budgetOk ? 'ok' : 'over'}">
                        ${budgetOk ? `Faisable, marge ${formatMinutes(deltaBudget)}` : `Depassement de ${formatMinutes(Math.abs(deltaBudget))}`}
                    </div>
                    <div class="chain-steps" style="margin-top: 8px;">${legLines}</div>
                </div>
                <button class="btn btn-info" style="margin-top: 8px;" onclick="optimizeSelectedActivitiesOrder()">Optimiser l'ordre</button>
                ${mapButtons}
            </div>
        </div>
    `;
}

function getPlanningTravelSummary(day) {
    if (day.travelInfo) {
        return `${day.travelInfo.from} -> ${day.accommodation.location} | ${day.travelInfo.distance} | ${day.travelInfo.duration}`;
    }

    const dayStart = getDayStartLocation(day);
    if (dayStart.name !== day.accommodation.name) {
        return `${dayStart.name} -> ${day.accommodation.name}`;
    }

    return `Journee basee a ${day.accommodation.location}`;
}

function renderPlanningView() {
    const planningView = document.getElementById('planningView');
    if (!planningView) {
        return;
    }

    if (!roadTripData.days || roadTripData.days.length === 0) {
        planningView.innerHTML = '<div class="planning-empty">Aucun jour disponible dans le planning.</div>';
        return;
    }

    const cardsHtml = roadTripData.days.map((day) => {
        const selectedCount = getSelectedActivitiesForDay(day.id).length;
        const totalActivities = Array.isArray(day.activities) ? day.activities.length : 0;
        const travelSummary = getPlanningTravelSummary(day);
        const dayStart = getDayStartLocation(day);

        const travelCard = day.travelInfo
            ? `
                <div class="planning-item travel">
                    <div class="planning-item-title">Trajet du jour</div>
                    <div class="planning-item-meta">${day.travelInfo.distance} | ${day.travelInfo.duration}</div>
                    <div class="planning-item-desc">${day.travelInfo.from} -> ${day.accommodation.location}. ${day.travelInfo.note || ''}</div>
                </div>
            `
            : '';

        const activitiesHtml = totalActivities
            ? day.activities.map((activity, index) => {
                const metaParts = [activity.duration, activity.distance].filter(Boolean);
                if (activity.difficulty) {
                    metaParts.push(activity.difficulty);
                }

                return `
                    <div class="planning-item">
                        <div class="planning-item-title">${index + 1}. ${activity.name}</div>
                        <div class="planning-item-meta">${metaParts.join(' | ')}</div>
                        <div class="planning-item-desc">${activity.description}</div>
                    </div>
                `;
            }).join('')
            : '<div class="planning-item"><div class="planning-item-desc">Aucune activite renseignee.</div></div>';

        return `
            <article class="planning-day ${day.id === currentDay ? 'active' : ''}">
                <div class="planning-day-header">
                    <div>
                        <div class="planning-day-date">${day.date}</div>
                        <div class="planning-day-title">Jour ${day.id}</div>
                        <div class="planning-day-subtitle">${day.title}</div>
                    </div>
                </div>
                <div class="planning-summary-row">
                    <span class="planning-pill">Depart: ${dayStart.name}</span>
                    <span class="planning-pill">Nuit: ${day.accommodation.name}</span>
                    <span class="planning-pill">Activites: ${totalActivities}</span>
                    <span class="planning-pill">Planifiees: ${selectedCount}</span>
                </div>
                <div class="planning-route">${travelSummary}</div>
                <div class="planning-day-body">
                    ${travelCard}
                    ${activitiesHtml}
                </div>
                <button class="btn btn-info planning-open-btn" onclick="openPlanningDay(${day.id})">Ouvrir ce jour</button>
            </article>
        `;
    }).join('');

    planningView.innerHTML = `<div class="planning-grid">${cardsHtml}</div>`;
}

function openPlanningDay(dayId) {
    selectDay(dayId);
    setView('explore');
}

function showChainRouteOnMap() {
    const day = roadTripData.days[currentDay - 1];
    const activities = getOrderedSelectedActivities(day);

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
    const activities = getOrderedSelectedActivities(day);

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
