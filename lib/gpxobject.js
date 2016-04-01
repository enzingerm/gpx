var helpers = require('./helpers');

var GpxObject = (function () {
    "use strict";

    var enc = helpers.encodeXml;

    var GpxObject = function (properties) {
        if (properties) {
            this.setProperties(properties);
        }

        this.contents = [];
    };

    GpxObject.prototype.contents = null;

    GpxObject.prototype.add = function (content, properties) {
        if (typeof content === 'function') {
            content = new content(properties);
        }

        if (typeof content.getXml !== 'function') {
            throw new Error('arguments must be an object with a getXml method');
        }

        this.contents.push(content);

        return content;
    };

    GpxObject.prototype.setProperty = function (property, value) {
        if(typeof property !== 'string' || property.length === 0) {
            throw new Error('No valid property name given');
        }
        //from property name e.g. 'dateTime' to setter function 'setDateTime'
        var setterName = 'set' + property.substr(0,1).toUpperCase() + property.substr(1);
        if(typeof this[setterName] !== 'function') {
            throw new Error('No setter exists for property ' + property);
        }
        this[setterName](value);
    };

    GpxObject.prototype.setProperties = function (properties) {
        for(var prop in properties) {
            if(properties.hasOwnProperty(prop)) {
                try {
                    this.setProperty(prop, properties[prop]);
                } catch(e) {
                    //Nothing to do, just an invalid property found
                }
            }
        }
    };

    GpxObject.prototype.getXml = function (tagname) {};

    GpxObject.prototype.getXmlElement = function (tagname, value) {
        return '<' + tagname + '>' + enc(value) + '</' + tagname + '>';
    };

    return GpxObject;
}());

module.exports = GpxObject;
