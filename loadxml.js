/*jslint indent: 4, maxlen: 80, rhino: true */
/*global java, javax, org*/

// returns a semi-random digit between 0 and 9
function loadXml(fileName) {
    'use strict';
    var dbFactory = javax.xml.parsers.DocumentBuilderFactory.newInstance(),
        dBuilder = dbFactory.newDocumentBuilder(),
        xmlFile = java.io.File(fileName),
        xmlDoc = dBuilder.parse(xmlFile);
    xmlDoc.normalizeDocument();
    return xmlDoc;
}

// constructor
function DocumentNodes(xmlDoc) {
    'use strict';
    this.xmlDoc = xmlDoc;
    this.xpFactory = javax.xml.xpath.XPathFactory.newInstance();
    this.xpath = this.xpFactory.newXPath();
    // function to return node set of a specific type for a given expression
    this.get = function (expression, type) {
        var xpexpression = this.xpath.compile(expression);
        return xpexpression.evaluate(this.xmlDoc, type);
    };
}

// show an objects properties
function listProperties(obj) {
    'use strict';
    var result = [];
    Object.keys(obj).forEach(function(i) {
        result.push(obj[i]);
    });
    return result;
}

// *****************************************************************
// * MAIN
// *****************************************************************

// load document
var xmlDoc = loadXml('test.xml');

// read using xpath
var nodes = new DocumentNodes(xmlDoc);
var results = nodes.get('/company/turnover/year[@id=2012]',
                javax.xml.xpath.XPathConstants.NODESET);

print('\n(1) show a specific year\n');
var i, node;
for (i = 0; i < results.getLength(); i += 1) {
    node = results.item(i).getFirstChild();
    print('\tYear 2012 has turnover of ' + node.getTextContent());
}

print('\n(2) show all years using expression /company/turnover\n');
results = nodes.get('/company/turnover/*',
            javax.xml.xpath.XPathConstants.NODESET);
for (i = 0; i < results.getLength(); i += 1) {
    print('\t' + results.item(i).getTextContent());
}

print('\n(3) show attributes and value for each year\n');
var j, attribs, node;
for (i = 0; i < results.getLength(); i += 1) {
    if (results.item(i).hasAttributes()) {
        print('\t' + results.item(i).getTextContent() + ' has attributes');
        attribs = results.item(i).getAttributes();
        for (j = 0; j < attribs.getLength(); j += 1) {
            node = attribs.item(j);
            print('\t\t' + node.getNodeName() + ' = ' + node.getNodeValue());
        }
    }
}

print('\n(4) show node object properties\n');
results = listProperties(nodes);
for (i = 0; i < results.length; i += 1) {
    print('\t' + results[i].toString());
}
