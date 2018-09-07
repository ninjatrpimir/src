import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  //Execute while opening
  ngOnInit() {
    function initMap() {

        var options = {
            center: {
                lat: 45.813013,
                lng: 15.977431
            },
            zoom: 18,
            disableDefaultUI: false,
            sccrollwheel: true,
            draggable: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        }

        element = document.getElementById('map');

        var map = new google.maps.Map(element, options);

        setMarkers(map);
    }

    // Data for the markers consisting of a name, a LatLng and a zIndex for the
    // order in which these markers should display on top of each other.
    var stands = [
        ['Trg bana Jelačića 1', 45.813057, 15.977005,4],
        ['Trg bana Jelačića 2', 45.813033, 15.976987, 5],
        ['Cronulla Beach', 45.813005, 15.977145, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    function setMarkers(map) {
        // Adds markers to the map.

        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.

        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        var image = {
            url: '../img/shop.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(20, 32),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };


        var infowindow = new google.maps.InfoWindow();

        for (var i = 0; i < stands.length; i++) {
            var stand = stands[i];
            var marker = new google.maps.Marker({
                position: {lat: stand[1], lng: stand[2]},
                map: map,
                icon: image,
                shape: shape,
                title: stand[0],
                zIndex: stand[3]
            });

            // infowindow
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(stands[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }


    // DISTANCE MATRIX

    var origin1 = new google.maps.LatLng(45.810224, 15.978291);
    var origin2 = 'Trg Nikole Šubić Zrinski 1';
    var destinationA = 'Arheološki muzej 3';
    var destinationB = new google.maps.LatLng(45.811129, 15.976843);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin1, origin2],
            destinations: [destinationA, destinationB],
            travelMode: 'WALKING',
            transitOptions: TransitOptions,
            drivingOptions: DrivingOptions,
            unitSystem: UnitSystem,
            avoidHighways: Boolean,
            avoidTolls: Boolean,
        }, callback);

    function callback(response, status) {
        // See Parsing the Results for
        // the basics of a callback function.
    }
	
	initMap();
  }

}
