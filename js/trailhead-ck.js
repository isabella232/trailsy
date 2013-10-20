function startup(){"use strict";function rt(){}function it(){console.log("initialSetup");ht(function(){mt(O,function(){St(function(){Ot(x);c&&Nt(function(){S.getZoom()>=o&&!S.hasLayer(F)&&S.addLayer(F)})})})})}function st(){ct();mt(M,function(){Ot(x)})}function ot(e){var t=S.getCenter(),n=S.latLngToContainerPoint(t),r=E,i=n.add(r.divideBy(2)),s=S.containerPointToLatLng(i);$(e.target).hasClass("offsetZoomIn")?S.setZoomAround(s,S.getZoom()+1):$(e.target).hasClass("offsetZoomOut")&&S.setZoomAround(s,S.getZoom()-1)}function ut(e,t){var n=$.extend(!0,{},t);$.each(t,function(t,r){if(e.activityFilter)for(var i=0;i<e.activityFilter.length;i++){var s=e.activityFilter[i];r.properties[s]&&r.properties[s].toLowerCase().charAt(0)!=="y"&&delete n[t]}if(e.lengthFilter){var o=!1;e.lengthFilter.length===0&&(o=!0);for(var l=0;l<e.lengthFilter.length;l++){var c=e.lengthFilter[l],h=r.properties.length;if(c.toLowerCase()=="short"&&h<=u||c.toLowerCase()=="medium"&&h>u&&h<=a||c.toLowerCase()=="long"&&h>a&&h<=f||c.toLowerCase()=="verylong"&&h>f){o=!0;break}}o||delete n[t]}if(e.searchFilter){var p=r.properties.name.toLowerCase().indexOf(e.searchFilter.toLowerCase());p==-1&&delete n[t]}});Ot(n)}function at(e){var t=$(e.currentTarget),n=t.attr("data-filter"),r=t.val();console.log(r);lt(n,r)}function ft(e){var t=$(e.currentTarget),n="searchFilter",r=t.val();console.log(t);console.log(r);if(t.hasClass("search-key")){console.log("search key");lt(n,r)}if(t.hasClass("search-submit")&&t.val()!==""){console.log("search submit");lt(n,r)}}function lt(e,t){console.log(t);var n=0;if(e=="activityFilter"){var r=D.activityFilter.length;for(var i=0;i<D.activityFilter.length;i++){var s=D.activityFilter[i];if(s===t){D.activityFilter.splice(i,1);n=1;break}}n===0&&D.activityFilter.push(t)}if(e=="lengthFilter"){console.log("length");console.log(D.lengthFilter.length);var r=D.lengthFilter.length;for(var o=0;o<r;o++){console.log("j");console.log(o);var u=D.lengthFilter[o];if(u==t){console.log("match");D.lengthFilter.splice(o,1);n=1;break}}n===0&&D.lengthFilter.push(t)}if(e=="searchFilter"){console.log("searchFilter");D.searchFilter=t}console.log(D);ut(D,x)}function ct(){M=S.getCenter()}function ht(e){console.log("setupGeolocation");if(navigator.geolocation){var n={enableHighAccuracy:!0,timeout:5e3,maximumAge:3e4};V=navigator.geolocation.watchPosition(function(t){pt(t,e)},function(t){dt(t,e)})}else{O=t;dt("no geolocation",e)}}function pt(e,n){O=new L.LatLng(e.coords.latitude,e.coords.longitude);var r=O.distanceTo(t)/1e3;if(!S){var i,s;if(r<w){M=O;i=O;s=13}else{M=t;i=t;s=11}S=vt(i,s)}j||(j=L.userMarker(O,{smallIcon:!0,pulsing:!0,accuracy:0}).addTo(S));console.log(O);j.setLatLng(O);typeof n=="function"&&n()}function dt(e,n){console.log("handleGeoError");console.log(e);if(!S){console.log("making map anyway");S=vt(t,11)}if(S&&j&&e.code===3){S.removeLayer(j);j=null}typeof n=="function"&&n()}function vt(t,n){console.log("createMap");var r=L.map("trailMap",{zoomControl:!1,scrollWheelZoom:!1});L.tileLayer.provider("MapBox."+e).addTo(r);r.setView(t,n);r.fitBounds(r.getBounds(),{paddingTopLeft:E});r.on("zoomend",function(e){console.log("zoomend");if(l&&F){if(r.getZoom()>=o&&!r.hasLayer(F)){r.addLayer(F);F.bringToBack()}if(r.getZoom()<o&&r.hasLayer(F)){z&&r.removeLayer(z);r.removeLayer(F)}}});r.on("popupclose",Et);return r}function mt(e,t){console.log("getOrderedTrailheads");var n={loc:e.lat+","+e.lng,type:"GET",path:"/trailheads.json?loc="+e.lat+","+e.lng};on(n,function(e){yt(e);typeof t=="function"&&t()})}function gt(e,t){console.log("getOrderedTrailheads");var n="select trailheads.*, ST_Distance_Sphere(ST_WKTToSQL('POINT("+e.lng+" "+e.lat+")'), the_geom) distance "+"from "+et+" as trailheads "+"ORDER BY distance "+"";un(n,function(e){yt(e);typeof t=="function"&&t()})}function yt(e){console.log("populateTrailheadArray");console.log(e);T=[];for(var t=0;t<e.features.length;t++){var n=e.features[t],r=new L.LatLng(n.geometry.coordinates[1],n.geometry.coordinates[0]),i=(new L.CircleMarker(r,{color:"#00adef",fillOpacity:.5,opacity:.8})).setRadius(4),s={properties:n.properties,geometry:n.geometry,marker:i,trails:[],popupContent:""};bt(s);T.push(s)}}function bt(e){e.marker.on("click",function(e){return function(){wt(e)}}(e.properties.id))}function wt(e){console.log("trailheadMarkerClick");Qt(e,0);var t=$t(e);Bt(x[t.trails[0]],t)}function Et(e){z=null}function St(e){console.log("getTrailData");var t={type:"GET",path:"/trails.json"};on(t,function(t){Tt(t);typeof e=="function"&&e()})}function xt(e){console.log("getTrailData");var t="select * from "+nt+" order by name";un(t,function(t){Tt(t);typeof e=="function"&&e()})}function Tt(e){for(var t=0;t<e.features.length;t++)x[e.features[t].properties.id]=e.features[t]}function Nt(e){console.log("getTrailSegments");var t={type:"GET",path:"/trailsegments.json"};on(t,function(t){N=t;F=Lt(t);typeof e=="function"&&e()})}function Ct(e){var t=!1;$.each(x,function(n,r){if(x[n].properties.name==e){t=n;return!1}});return t}function kt(e){for(var t=0;t<=6;t++){var n="trail"+t;if(Ct(e.properties[n])){console.log("segment match");return!0}}console.log("segment non-match");return!1}function Lt(e){var t=[],n=[],r=new L.FeatureGroup,i=L.geoJson(e,{style:function(){return{color:h,weight:p,opacity:1,clickable:!1}},onEachFeature:function(e,n){t.push(n)}}),s=L.geoJson(e,{style:function(){return{opacity:0,weight:20,clickable:!0}},onEachFeature:function(e,t){n.push(t);var r=$("<div class='trail-popup'>");for(var i=1;i<=6;i++){var s="trail"+i;if(e.properties[s]){var o;Ct(e.properties[s])?o=$("<div class='trail-popup-line trail-popup-line-named'>").attr("data-steward",e.properties.steward).attr("data-source",e.properties.source).attr("data-trailname",e.properties[s]).html(e.properties[s]).css("color","black"):o=$("<div class='trail-popup-line trail-popup-line-unnamed'>").html(e.properties[s]);r.append(o)}}f=(new L.Popup({},t)).setContent(r.outerHTML());e.properties.popup=f;e.properties.popupHTML=r.outerHTML()}});for(var o=0;o<n.length;o++){var u=n[o],a=new L.FeatureGroup([n[o],t[o]]),f=(new L.Popup).setContent(u.feature.properties.popupHTML);a.addEventListener("mouseover",function(e,t){return function(n){if(I){clearTimeout(I);I=null}if(q){clearTimeout(q);q=null}q=setTimeout(function(n,r){return function(){r.setStyle({weight:v,color:d});r!=U&&U&&U.setStyle({weight:p,color:h});U=r;if(e!=R||!z){z=t.feature.properties.popup.setLatLng(n.latlng).openOn(S);R=e}}}(n,n.target),250)}}(a,u));a.addEventListener("mouseout",function(e,t){return function(e){var n=t.feature.properties.popup;if(I){clearTimeout(I);I=null}if(q){clearTimeout(q);q=null}I=setTimeout(function(e){return function(){e.target.setStyle({weight:3});R=null}}(e),1250)}}(a,u));r.addLayer(a)}return r}function At(e){console.log("trailPopupLineClick");var t=$(e.target).attr("data-trailname"),n=$(e.target).attr("data-source"),r=[];for(var i=0;i<T.length;i++){var s=T[i];s.properties.source==n&&(s.properties.trail1==t||s.properties.trail2==t||s.properties.trail3==t||s.properties.trail4==t||s.properties.trail5==t||s.properties.trail6)&&r.push(s)}var o=z._latlng,u=Infinity,a=null;for(var f=0;f<r.length;f++){var l=r[f],c=l.marker.getLatLng(),h=o.distanceTo(c);if(h<u){a=l;u=h}}var p=0,d=null;for(var v=0;v<a.trails.length;v++){var m=a.trails[v];if(x[m].properties.name==t){d=x[m];p=v}}Qt(a.properties.id,p);Bt(d,a)}function Ot(e){console.log("addTrailDataToTrailheads");console.log(x);for(var t=0;t<T.length;t++){var n=T[t];n.trails=[];for(var r=1;r<=3;r++){var i="trail"+r;if(n.properties[i]==="")continue;var s=n.properties[i];$.each(e,function(e,t){n.properties[i]==t.properties.name&&n.trails.push(e)})}}Mt(T);_t(T);Dt(T);Pt(T)}function Mt(e){console.log("fixDuplicateTrailNames");for(var t=0;t<e.length;t++){var n=e[t],r={};for(var i=0;i<n.trails.length;i++){var s=x[n.trails[i]].properties.name;r[s]=r[s]||[];var o={source:x[n.trails[i]].properties.source,trailID:x[n.trails[i]].properties.id};r[s].push(o)}for(var u in r)if(r.hasOwnProperty(u)&&r[u].length>1)for(var a=0;a<r[u].length;a++){var f=r[u][a];if(f.source!=n.properties.source){var l=f.trailID,c=$.inArray(l.toString(),n.trails);n.trails.splice(c,1)}}}}function _t(e){for(var t=0;t<e.length;t++){var n=e[t],r=$("<div>").addClass("trailhead-popup"),i=$("<div>").addClass("trailhead-box").html($("<div class='popupTrailheadNames'>"+n.properties.name+"</div>")).appendTo(r);i.append($("<img>").addClass("calloutTrailheadIcon").attr({src:"img/icon_trailhead_active.png"}));for(var s=0;s<n.trails.length;s++){var o=x[n.trails[s]],u=$("<div>").addClass("trailhead-trailname trail"+(s+1)).attr("data-trailname",o.properties.name).attr("data-trailid",o.properties.id).attr("data-trailheadname",n.properties.name).attr("data-trailheadid",n.properties.id).attr("data-index",s);console.log(o.properties.status);var a="";o.properties.status==1&&u.append($("<img>").addClass("status").attr({src:"img/icon_alert_yellow.png",title:"alert"}));o.properties.status==2&&u.append($("<img>").addClass("status").attr({src:"img/icon_alert_yellow.png",title:"alert"}));u.append("<div class='popupTrailNames'>"+o.properties.name+"</div>");u.append("<b>").appendTo(i)}n.popupContent=r.outerHTML()}}function Dt(e){console.log("mapActiveTrailheads");var t=[];for(var n=0;n<e.length;n++)e[n].trails.length&&t.push(e[n].marker);if(_){console.log("remove");S.removeLayer(_)}_=L.layerGroup(t);S.addLayer(_);_.eachLayer(function(e){console.log("bringToBack");e.bringToBack()})}function Pt(e){console.log("makeTrailDivs");P=[];var t=0;$("#trailList").html("");$.each(e,function(e,n){var r=n.properties.name,i=n.properties.id,s=n.trails;if(s.length===0)return!0;var o=n.properties.source,u=Ht(n.properties.distance),a;for(var f=0;f<s.length;f++){var l=s[f],c=x[l],h=x[l].properties.name,p=x[l].properties.length,d=X;t++;a=$("<div>").addClass("trail-box").attr("data-source","list").attr("data-trailid",l).attr("data-trailname",h).attr("data-trail-length",p).attr("data-trailheadName",r).attr("data-trailheadid",i).attr("data-index",f).appendTo("#trailList").click(Xt).click(function(e,t){return function(n){Bt(e,t)}}(c,n));var v=$("<div>").addClass("trailInfo").appendTo(a),m=$("<div>").addClass("trailheadInfo").appendTo(a);$("<div class='trailSource' id='"+o+"'>"+o+"</div>").appendTo(a);$("<div class='trailCurrentIndex' >"+d+"</div>").appendTo(v);$("<div class='trail' >"+h+"</div>").appendTo(v);var g=p==1?"mile":"miles";$("<div class='trailLength' >"+p+" "+g+" long"+"</div>").appendTo(v);$("<img class='trailheadIcon' src='img/icon_trailhead_active.png'/>").appendTo(m);$("<div class='trailheadName' >"+r+" Trailhead"+"</div>").appendTo(m);$("<div class='trailheadDistance' >"+u+" miles away"+"</div>").appendTo(m);$("<div class='trailIndex' >"+t+"</div>").appendTo(m);var y={trailID:l,trailheadID:i,index:f};P.push(y)}if(s.length===0){a=$("<div class='trail-box'>").appendTo("#trailList");$("<span class='trail' id='list|"+r+"'>"+r+" - NO TRAILS ("+[val.properties.trail1,val.properties.trail2,val.properties.trail3].join(", ")+")</span>").appendTo(a);$("<span class='trailSource'>"+o+"</span>").appendTo(a)}});console.log(P)}function Ht(e){return(e*r).toFixed(1)}function Bt(e,t){console.log("showTrailDetails");if($(".detailPanel").is(":hidden")){Ut(e,t);jt();H=e;B=t}else if(H==e&&B==t){H=null;B=null;Ft()}else{Ut(e,t);H=e;B=t}}function jt(){console.log("openDetailPanel");$(".detailPanel").show();$(".accordion").hide();$(".trailhead-trailname.selected").addClass("detail-open")}function Ft(){console.log("closeDetailPanel");$(".detailPanel").hide();$(".accordion").show();$(".trailhead-trailname.selected").removeClass("detail-open")}function It(){console.log("toggleDetailPanelControls");$(".detailPanelControls").toggle()}function qt(e){console.log("changeDetailPanel");var t=B.properties.id,n=String(H.properties.id);console.log(n);var r;for(var i=0;i<P.length;i++)P[i].trailID==n&&P[i].trailheadID==t&&(X=i);var s=!1;if($(e.target).hasClass("controlRight")){X+=1;s=!0}if($(e.target).hasClass("controlLeft")&&X>0){X-=1;s=!0}if(s){var o=P[X];t=o.trailheadID;var u=o.index;for(var a=0;a<T.length;a++)T[a].properties.id==t&&(r=T[a]);Rt();Qt(t,u);Bt(x[r.trails[u]],r)}}function Rt(){X==0?$(".controlLeft").removeClass("enabled").addClass("disabled"):$(".controlLeft").removeClass("disabled").addClass("enabled");X==P.length-1?$(".controlRight").removeClass("enabled").addClass("disabled"):$(".controlRight").removeClass("disabled").addClass("enabled");return X}function Ut(e,t){console.log(X);for(var r=0;r<P.length;r++)P[r].trailID==e.properties.id&&P[r].trailheadID==t.properties.id&&(X=r);Rt();$(".detailPanel .detailPanelBanner .trailName").html(e.properties.name+" ("+(X+1)+" of "+P.length+" trails)");$(".detailPanel .detailPanelBanner .trailIndex").html(X+1+" of "+P.length);$(".detailPanel .detailPanelBanner .trailName").html(e.properties.name);$(".detailPanel .detailTrailheadName").html(t.properties.name);e.properties.medium_photo_url&&$(".detailPanel .detailPanelPicture").attr("src",e.properties.medium_photo_url);if(e.properties.hike=="y"){console.log("hike icon replaced");$(".detailPanel .detailTopRow#right #hike").html("<img class='activity-icons' src='img/icon_hike_green.png'>")}if(e.properties.roadbike=="y"){console.log("cycle icon replaced");$(".detailPanel .detailTopRow#right #cycle").html("<img class='activity-icons' src='img/icon_cycle_green.png'>")}if(e.properties.accessible=="y"){console.log("handicap icon replaced");$(".detailPanel .detailTopRow#right #handicap").html("<img class='activity-icons' src='img/icon_handicap_green.png'>")}if(e.properties.equestrian=="y"){console.log("horse icon replaced");$(".detailPanel .detailTopRow#right #horse").html("<img class='activity-icons' src='img/icon_horse_green.png'>")}if(e.properties.xcntryski=="y"){console.log("xcntryski icon replaced");$(".detailPanel .detailTopRow#right #xcountryski").html("<img class='activity-icons' src='img/icon_xcountryski_green.png'>")}if(t.properties.parking=="yes"){console.log("parking icon added");$(".detailPanel .detailBottomRow .detailTrailheadAmenities .detailTrailheadIcons").html("<img class='amenity-icons' src='img/icon_parking_green.png'>")}$(".detailPanel .detailSource").html(t.properties.source);$(".detailPanel .detailTrailheadDistance").html(Ht(t.properties.distance)+" miles away");var i=e.properties.length=="1"?"mile":"miles";$(".detailPanel .detailLength").html(e.properties.length+" "+i);$(".detailPanel .detailDifficulty").html(e.properties.difficulty);$(".detailPanel .detailDescription").html(e.properties.description);if(e.properties.map_url){$(".detailPanel .detailPrintMap a").attr("href",e.properties.map_url).attr("target","_blank");$(".detailPanel .detailPrintMap").show()}else $(".detailPanel .detailPrintMap").hide();var s="http://maps.google.com?saddr="+O.lat+","+O.lng+"&daddr="+t.geometry.coordinates[1]+","+t.geometry.coordinates[0];$(".detailPanel .detailDirections a").attr("href",s).attr("target","_blank");$(".detailPanel .detailBottomRow .detailTrailheadAmenities .detailTrailheadIcons");e.properties.steward_logo_url&&e.properties.steward_logo_url.indexOf("missing.png")==-1&&$(".detailPanel .detailStewardLogo").attr("src",n+e.properties.steward_logo_url);$(".detailPanel .detailFooter .detailSource").html(e.properties.steward_fullname).attr("href",e.properties.steward_url);$(".detailPanel .detailFooter .detailSourcePhone").html(e.properties.steward_phone)}function zt(e){console.log("trailnameClick");Vt(e)}function Wt(e){console.log(e);var t=e.data("trailheadid"),n=e.data("index")||0,r=e.data("trailid"),i={trailheadID:t,highlightedTrailIndex:n,trailID:r};return i}function Xt(e){console.log("populateTrailsForTrailheadDiv");var t;e.target!==this?t=$(this):t=$(e.target);var n=Wt(t);Qt(n.trailheadID,n.highlightedTrailIndex)}function Vt(e){console.log($(e.target).data("trailheadid"));var t;$(e.target).data("trailheadid")?t=$(e.target):t=$(e.target.parentNode);var n=Wt(t);console.log(n);var r=$t(n.trailheadID);Qt(n.trailheadID,n.highlightedTrailIndex);var i=x[n.trailID];Bt(i,r)}function $t(e){var t;for(var n=0;n<T.length;n++)if(T[n].properties.id==e){t=T[n];break}return t}function Jt(e,t){var n=$(e.popupContent);n.find(".trailhead-trailname").removeClass("selected").addClass("not-selected");if(t!=-1){var r=e.trails[t],i='[data-trailid="'+r+'"]',s=n.find(i);s.addClass("selected").removeClass("not-selected")}e.popupContent=n.outerHTML();$(".detailPanel").is(":visible")&&$(".trailhead-trailname.selected").addClass("detail-open")}function Qt(e,t){console.log("highlightTrailhead");t=t||0;var n=null;n=$t(e);$(".detailPanel").is(":visible")&&$(".trailhead-trailname.selected").removeClass("detail-open");if(W){S.removeLayer(W.marker);W.marker=(new L.CircleMarker(W.marker.getLatLng(),{color:"#00adef",fillOpacity:.5,opacity:.8,zIndexOffset:100})).setRadius(4).addTo(S);bt(W)}$(".detailPanel").is(":visible")&&$(".trailhead-trailname.selected").addClass("detail-open");W=n;S.removeLayer(W.marker);W.marker=(new L.Marker(W.marker.getLatLng(),{icon:G})).addTo(S);bt(W);Gt(n,t);Jt(n,t);var r=(new L.Popup({offset:[0,-12],autoPanPadding:[100,100]})).setContent(n.popupContent).setLatLng(n.marker.getLatLng()).openOn(S)}function Gt(e,t){console.log("getAllTrailPathsForTrailhead");N.type=="FeatureCollection"&&c?Zt(e,t):Yt(e,t)}function Yt(e,t){console.log("getAllTrailPathsForTrailheadRemote");var n=[],r=[];for(var i=0;i<e.trails.length;i++){var s=e.trails[i],o=x[s].properties.name,u="select st_collect(the_geom) the_geom, '"+o+"' trailname from "+tt+" segments where "+"(segments.trail1 = '"+o+"' or "+"segments.trail2 = '"+o+"' or "+"segments.trail3 = '"+o+"' or "+"segments.trail4 = '"+o+"' or "+"segments.trail5 = '"+o+"' or "+"segments.trail6 = '"+o+"' or "+"segments.trail1 = '"+o+" Trail' or "+"segments.trail2 = '"+o+" Trail' or "+"segments.trail3 = '"+o+" Trail' or "+"segments.trail4 = '"+o+" Trail' or "+"segments.trail5 = '"+o+" Trail' or "+"segments.trail6 = '"+o+" Trail') and "+"(source = '"+x[s].properties.source+"' or "+(o=="Ohio & Erie Canal Towpath Trail")+")",a=function(e,t){return function(e){var r={type:"GET",path:"/trailsegments.json"};on(r,function(r){n[t]=r;e(null,s)})}}(u,i);r.push(a)}async.parallel(r,function(e,r){n=en(n);tn(n);rn(t)})}function Zt(e,t){console.log("getAllTrailPathsForTrailheadLocal");var n=[],r=[];for(var i=0;i<e.trails.length;i++){var s=e.trails[i],o=x[s],u=o.properties.source,a=o.properties.name,f={type:"FeatureCollection",features:[{geometry:{geometries:[],type:"GeometryCollection"},type:"Feature"}]},l=0;for(var c=0;c<N.features.length;c++){var h=$.extend(!0,{},N.features[c]);if((h.properties.trail1==a||h.properties.trail1+" Trail"==a||h.properties.trail2==a||h.properties.trail2+" Trail"==a||h.properties.trail3==a||h.properties.trail3+" Trail"==a||h.properties.trail4==a||h.properties.trail4+" Trail"==a||h.properties.trail5==a||h.properties.trail5+" Trail"==a||h.properties.trail6==a||h.properties.trail6+" Trail"==a)&&(h.properties.source==u||a=="Ohio & Erie Canal Towpath Trail")){f.features[0].properties={trailname:a};l=1;f.features[0].geometry.geometries.push(h.geometry)}}l&&r.push(f)}console.log(r);n=en(r);tn(n);rn(t)}function en(e){console.log("mergeResponses");var t=$.extend(!0,{},e[0]);if(t.features){t.features[0].properties.order=0;for(var n=1;n<e.length;n++){t.features=t.features.concat(e[n].features);t.features[n].properties.order=n}}else console.log("ERROR: missing segment data for trail.");return t}function tn(e){console.log("drawMultiTrailLayer");if(C){S.removeLayer(C);k=[]}e.features[0].geometry===null&&alert("No trail segment data found.");C=L.geoJson(e,{style:function(e){var t;if(e.properties.order===0||!e.properties.order)return{weight:p,color:h,opacity:1,clickable:!1};if(e.properties.order===1)return{weight:p,color:h,opacity:1,clickable:!1};if(e.properties.order===2)return{weight:p,color:h,opacity:1,clickable:!1}},onEachFeature:function(e,t){k.push(t)}}).addTo(S).bringToFront();sn(C)}function nn(e){var t=$("<div class='"+e+"'>").hide().appendTo("body"),n=t.css("background-color");console.log(n);t.remove();return n}function rn(e){console.log("setCurrentTrail");A&&typeof A.setStyle=="Function"&&A.setStyle({weight:p,color:h});k[e]?A=k[e]:console.log("ERROR: trail layer missing");A.setStyle({weight:g,color:m})}function sn(e){console.log("zoomToLayer");var t=S.getBoundsZoom(e.getBounds());console.log(e.getLayers().length);console.log(["layerBoundsZoom:",t]);if(t<=i&&t>=s)S.fitBounds(e.getBounds(),{paddingTopLeft:E});else{var n=t>i?i:t;n=n<s?s:n;console.log("setview newZoom:");console.log(n);S.setView(W.marker.getLatLng(),n)}}function on(e,t){console.log("makeAPICall");$.isEmptyObject(e.data)||(e.data=JSON.stringify(e.data));var r=n+e.path;console.log(r);var i=$.ajax({type:e.type,url:r,dataType:"json",contentType:"application/json; charset=utf-8",data:e.data}).fail(function(e,t,n){console.log("error! "+n+" "+t);console.log(e.status);$("#results").text("error: "+JSON.stringify(n))}).done(function(e,n,r){if(typeof t=="function"){console.log("calling doneCallback");t.call(this,e)}console.log(e)})}function un(e,t,n){console.log("makeSQLQuery");var r={q:e,format:"geoJSON"},i=$.ajax({dataType:"json",url:endpoint,data:r}).done(function(e,n,r){t(e)}).error(function(t,r,i){if(typeof n=="function")n(t);else{console.log("ERROR:");console.log(e);console.log(i)}})}console.log("trailhead.js");var e="codeforamerica.map-j35lxf9d",t={lat:41.1,lng:-81.5},n="http://trailsyserver-dev.herokuapp.com";if(window.location.hostname.split(".")[0]=="trailsy-dev")n="http://trailsyserver-dev.herokuapp.com";else if(window.location.hostname.split(".")[0]=="trailsy"||window.location.hostname=="www.tothetrails.com")n="http://trailsyserver-prod.herokuapp.com";var r=62137e-8,i=17,s=14,o=13,u=2,a=5,f=10,l=1,c=1,h="#678729",p=3,d="#678729",v=6,m="#445617",g=9,y="#FF0000",b=3,w=100,E=new L.Point(450,0),S,x={},T=[],N=[],C={},k=[],A={},O={},M={},_,D={lengthFilter:[],activityFilter:[],searchFilter:""},P=[],H=null,B=null,j=null,F=null,I=null,q=null,R=null,U=null,z=null,W=null,X,V=null,J=null,K={iconSize:[15.6,19.8],iconAnchor:[7.8,19.8],popupAnchor:[0,-3]},Q=$.extend(K,{iconUrl:"img/icon_trailhead_active.png"}),G=L.icon(Q),Y=$.extend(K,{iconUrl:"img/icon_trailhead_active.png"}),Z=L.icon(Y),et="summit_trailheads",tt="summit_trailsegments",nt="summit_traildata";$("#redoSearch").click(st);$(document).on("click",".trailhead-trailname",zt);$(document).on("click",".closeDetail",Ft);$(document).on("click",".detailPanelControls",qt);$(document).on("change",".filter",at);$(document).on("mouseout",".leaflet-popup",function(){R&&R.fireEvent("mouseout")});$(document).on("click",".trail-popup-line-named",At);$(".search-key").keyup(function(e){ft(e)});$(".offsetZoomControl").click(ot);$(".search-submit").click(ft);$(".detailPanel").hover(It,It);it();var Kt;jQuery.fn.outerHTML=function(e){return e?this.before(e).remove():jQuery("<p>").append(this.eq(0).clone()).html()}}console.log("start");$(document).ready(startup);