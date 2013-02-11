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
    //var my = this;
    this.xmlDoc = xmlDoc;
    this.xpFactory = javax.xml.xpath.XPathFactory.newInstance();
    this.xpath = this.xpFactory.newXPath();
    // return node set of a specific type for a given expression
    this.get = function (expression, type) {
        var xpexpression = this.xpath.compile(expression);
        return xpexpression.evaluate(this.xmlDoc, type);
    };
}

/**************************************
 * MAIN
 **************************************/
// load document
var xmlDoc = loadXml('test.xml');

// read using xpath
var nodes = new DocumentNodes(xmlDoc);
var results = nodes.get('/company/turnover/year[@id=2012]',
                javax.xml.xpath.XPathConstants.NODESET);

// show a specific year
var i;
for (i = 0; i < results.getLength(); i += 1) {
    var node = results.item(i).getFirstChild();
    print('Year 2012 has turnover of ' + node.getTextContent());
}

// show all years
results = nodes.get('/company/turnover/*',
            javax.xml.xpath.XPathConstants.NODESET);
for (i = 0; i < results.getLength(); i += 1) {
    print(results.item(i).getTextContent());
}

// show attributes and value for each year
for (i = 0; i < results.getLength(); i += 1) {
    if (results.item(i).hasAttributes()) {
        print(results.item(i).getTextContent() + ' has attributes');
        var attribs = results.item(i).getAttributes();
        var j;
        for (j = 0; j < attribs.getLength(); j += 1) {
            var node = attribs.item(j);
            print('\t' + node.getNodeName() + ' = ' + node.getNodeValue());
        }
    }
}