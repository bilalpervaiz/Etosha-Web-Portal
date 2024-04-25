	var minZoom=14;
	var maxZoom=18;
	
	
	let mapSwitch = L.map('switch', {
	zoomControl: false,
	attributionControl: false,
	minZoom: minZoom - 3,
	maxZoom: maxZoom - 3,
}).setView([49.595, 17.256], minZoom - 3);

mapSwitch.dragging.disable();
mapSwitch.touchZoom.disable();
mapSwitch.doubleClickZoom.disable();
mapSwitch.scrollWheelZoom.disable();

baseSatellite.addTo(mapSwitch);

/* prepinani podkladovych vystev */
$('#switch').on('click', function(){
	let switchValue = $("#switch").attr("value");
	switch(switchValue){
		case "1":
			map.removeLayer(baseCartoLight);
			mapSwitch.removeLayer(baseSatellite);
			map.addLayer(baseSatellite);
			mapSwitch.addLayer(baseMapy);
			$('#switch').attr('value', '2');
			break;
		case "2":
			map.removeLayer(baseSatellite);
			mapSwitch.removeLayer(baseMapy);
			map.addLayer(baseMapy);
			mapSwitch.addLayer(baseCartoLight);
			$('#switch').attr('value', '0');
			break;
		case "0":
			map.removeLayer(baseMapy);
			mapSwitch.removeLayer(baseCartoLight);
			map.addLayer(baseCartoLight);
			mapSwitch.addLayer(baseSatellite);
			$('#switch').attr('value', '1');
			break;
	}

});
/* konec prepinani podkladovych vystev */

/* prostorova synchronizace podkladove mapy a switche */
map.on('moveend', function(e) {
	let mapCenter = map.getCenter();
	let mapZoom = map.getZoom();
	mapSwitch.setView(mapCenter, mapZoom - 3);
    highlight();
});
/* konec prostorova synchronizace podkladove mapy a switche */

map.on('zoomend', function(){
    highlight();
});
