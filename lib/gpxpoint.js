var GpxObject = require('./gpxobject'),
    helpers = require('./helpers');

var GpxPoint = (function () {
    "use strict";

    var GpxPoint = function (properties) {
        GpxPoint.super.call(this, properties);
    };

    helpers.extends(GpxPoint, GpxObject);

    GpxPoint.prototype.name = null;
    GpxPoint.prototype.elevation = null;
    GpxPoint.prototype.latitude = null;
    GpxPoint.prototype.longitude = null;

    GpxPoint.prototype.setName = function (name) {
        this.name = name;
    };

    GpxPoint.prototype.setElevation = function (elevation) {
        this.elevation = helpers.toFloat(elevation, false);
    };

    GpxPoint.prototype.setLatitude = function (latitude) {
        this.latitude = helpers.toFloat(latitude, false);
    };

    GpxPoint.prototype.setLongitude = function (longitude) {
        this.longitude = helpers.toFloat(longitude, true);
    };

    GpxPoint.prototype.getXml = function (tagname) {
        var xml = [],
            enc = helpers.encodeXml;

        tagname = tagname || 'wpt';

        xml.push('<' + tagname + ' lon="' + enc(this.longitude) + '" lat="' + enc(this.latitude) + '">');

        if (this.elevation !== null) {
            xml.push(this.getXmlElement('ele', this.elevation));
        }

        if (this.name !== null) {
            xml.push(this.getXmlElement('name', this.name));
        }

        xml.push('</' + tagname + '>');

        return xml.join('\n');
    };

    return GpxPoint;
}());

module.exports = GpxPoint;
