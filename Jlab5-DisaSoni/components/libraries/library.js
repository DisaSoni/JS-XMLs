const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
const library = "http://www.opengis.net/kml/2.2";

async function loadLibrary() {
    if (xml == undefined) {
        let response = await fetch(
            "http://www.torontopubliclibrary.ca/data/library-data.kml", { method: "get", headers: { "Content-Type": "application/xml" } }
        );
        ldata = new JSDOM(await response.text(), { contentType: "application/xml" });
        console.log(`Data: ${ldata}`);
        xml = ldata.window.document;
    }
    return xml;
}

async function loadLocations() {
    xml = await loadLibrary();
    return xml.querySelectorAll("Placemark");
}

async function getLibraryById(id) {
    xml = await loadLibrary();
    console.log(`ID: ${id}`);
    return xml.querySelector(`Placemark[id='${id}']`);
}

module.exports = {
    loadLibrary,
    loadLocations,
    getLibraryById,
};