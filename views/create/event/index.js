var iconSelect;

window.onload = function(){

    iconSelect = new IconSelect("my-icon-select",
        {'selectedIconWidth':48,
            'selectedIconHeight':48,
            'selectedBoxPadding':1,
            'iconsWidth':20,
            'iconsHeight':20,
            'boxIconSpace':1,
            'vectoralIconNumber':4,
            'horizontalIconNumber':4});

    var selected = document.getElementsByName('selected-icon')[0];

    document.getElementById('my-icon-select').addEventListener('changed', function(e) {
        selected.value = iconSelect.getSelectedValue();
    });

    var icons = [];
    icons.push({'iconFilePath':'../../images/read_icon.png', 'iconValue':'1'});
    icons.push({'iconFilePath':'../../images/skiing_icon.png', 'iconValue':'2'});
    icons.push({'iconFilePath':'../../images/teaching_icon.png', 'iconValue':'3'});
    icons.push({'iconFilePath':'../../images/turist_icon.png', 'iconValue':'4'});
    icons.push({'iconFilePath':'../../images/read_icon.png', 'iconValue':'5'});
    icons.push({'iconFilePath':'../../images/skiing_icon.png', 'iconValue':'6'});
    icons.push({'iconFilePath':'../../images/teaching_icon.png', 'iconValue':'7'});
    icons.push({'iconFilePath':'../../images/turist_icon.png', 'iconValue':'8'});
    icons.push({'iconFilePath':'../../images/read_icon.png', 'iconValue':'9'});
    icons.push({'iconFilePath':'../../images/skiing_icon.png', 'iconValue':'10'});
    icons.push({'iconFilePath':'../../images/teaching_icon.png', 'iconValue': '11'});
    icons.push({'iconFilePath':'../../images/turist_icon.png', 'iconValue':'12'});

    iconSelect.refresh(icons);

};

var map;
var oldMarker;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {
    if (oldMarker) {
        oldMarker.setMap(null);
    }
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    oldMarker = marker;
    var element = document.getElementById('coords');
    element.value = marker.position;
}