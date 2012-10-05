
    //function calculateDistance(lat1, lon1, lat2, lon2) {
    function calculateDistance(x1, y1, x2, y2) {
        var distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        return distance;
        var R = 6371; // km
        var dLat = toRad(lat2-lat1);
        var dLon = toRad(lon2-lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    function toRad(deg) {
        return deg * Math.PI / 180;
    }

    var findClustersByDistance = function(list, distance) {
        var clusterCounter = 0;
        var clusteredItems = [];
        var clusters = {};

        var iter = 0;
        var text = "";
        for (var i = 0, ii = list.length; i < ii; i++) {
            var item = list[i];
            var found = false;
            for (var j = 0, jj = clusteredItems.length; j < jj; j++) {
                var matchingItem = clusteredItems[j];
                var pointsDist = calculateDistance(item.x, item.y, matchingItem.x, matchingItem.y);
                if (pointsDist <= distance) {
                    item.clusterIndex = matchingItem.clusterIndex;
                    clusters[item.clusterIndex].items.push(item);
                    clusteredItems.push(item);
                    found = true;
                    break;
                }
                iter++;
            }
            if (!found) {
                item.clusterIndex = clusterCounter;
                clusteredItems.push(item);
                clusters[clusterCounter] = {items:[item], id: clusterCounter};
                clusterCounter++;
            }
        }

        var clusterList = [];
        for(var index in clusters) {
            var cluster = clusters[index];
            var avgLat = 0, avgLong = 0;
            for (var i = 0, ii = cluster.items.length; i < ii; i++) {
                var item = cluster.items[i];
                avgLat += item.x;
                avgLong += item.y;
            }
            cluster.x = Math.round(avgLat / cluster.items.length * 1000000) / 1000000;
            cluster.y = Math.round(avgLong / cluster.items.length * 1000000) / 1000000;

            for (var i = 0, ii = cluster.items.length; i < ii; i++) {
                var item = cluster.items[i];
                item.x = cluster.x;
                item.y = cluster.y;
            }
             clusterList.push(cluster);
        }

        console.log("found " + clusterCounter + " clusters", "from " + list.length + " items", " after " + iter + " iterations");
        return clusterList;


    }


exports.findClustersByDistance = findClustersByDistance;


