!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){!function(a,b,c,d){var e=b.module("drive2map",["ui.router"]);e.config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(a,c,d,e){d.html5Mode({enabled:!1,requireBase:!1}),d.hashPrefix("!"),a.state("home",{url:"/",controller:["$scope","$state",function(a,b){a.driveId="",a.loadDrive=function(){b.go("home.map",{driveId:a.driveId})},a.$on("$stateChangeSuccess",function(b,c){"home.map"==c.name&&(a.isMap=!0)})}]}).state("home.map",{url:":driveId/",template:'<div id="list"><input type="text" ng-model="search" placeholder="Digite uma busca..."><list items="parsed"></list></div><map id="map" markers="parsed = ((data | dFilter:search) | parseDrive)"></map>',controller:["$scope","$filter","Data",function(a,b,c){a.search="",a.data=c.data.feed.entry}],resolve:{Data:["$stateParams","d2mService",function(a,b){return b.get(a.driveId)}]}}),c.rule(function(a,c){var d,e=c.path(),f=c.search();if("/"!==e[e.length-1])return 0===Object.keys(f).length?e+"/":(d=[],b.forEach(f,function(a,b){d.push(b+"="+a)}),e+"/?"+d.join("&"))})}]),e.factory("d2mService",["$http",function(a){return{get:function(b){return a.get("https://spreadsheets.google.com/feeds/list/"+b+"/od6/public/values?alt=json")}}}]),e.filter("dFilter",[function(){return function(b,c){return a.filter(b,function(a){return-1!==JSON.stringify(a).toLowerCase().trim().indexOf(c.toLowerCase().trim())})}}]),e.filter("parseDrive",[function(){var b="gsx$";return a.memoize(function(a){var c=[];return a&&a.length&&a.forEach(function(a){item={},Object.keys(a).forEach(function(c){if(-1!==c.indexOf(b)){var d=c.replace(b,"");item[d]=a[c].$t}}),c.push(item)}),c},function(){return JSON.stringify(arguments)})}]),e.directive("list",[function(){return{restrict:"E",templateUrl:"list.html",scope:{items:"="}}}]),e.directive("map",[function(){return{restrict:"E",scope:{markers:"="},link:function(d,e,f){function g(a){var b="<table><tbody>";for(key in a)0!=key.indexOf("$")&&"lat"!==key&&"lon"!==key&&(b+="<tr><th>"+key+"</th><td>"+a[key]+"</td></tr>");return b+="</tbody></table>"}b.element(e).append('<div id="'+f.id+'"></div>').attr("id","");var h=c.map(f.id,{center:[0,0],zoom:2,maxZoom:18});c.tileLayer("http://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18}).addTo(h);var i=c.markerClusterGroup({zIndex:100,maxClusterRadius:40,polygonOptions:{fillColor:"#000",color:"#000",opacity:.3,weight:2},spiderLegPolylineOptions:{weight:1,color:"#222",opacity:.4}});i.addTo(h);var j=[],k=c.MakiMarkers.icon({icon:"marker",color:"#666",size:"s"});d.$watch("markers",a.debounce(function(a){j.forEach(function(a){i.removeLayer(a)}),j=[],a.forEach(function(a){if(a.lat&&a.lon){var b=c.marker([a.lat,a.lon],{icon:k});b.bindPopup(g(a)).addTo(i),j.push(b)}}),j.length&&h.fitBounds(i.getBounds())},300),!0)}}}]),b.element(document).ready(function(){b.bootstrap(document,["drive2map"])})}(window._,window.angular,window.L)},{}]},{},[1]);
//# sourceMappingURL=app.js.map