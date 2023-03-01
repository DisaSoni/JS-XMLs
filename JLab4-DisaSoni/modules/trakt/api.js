const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */

//shows

async function getPopularShows() {
    let reqUrl = `${trakt}/shows/popular?page=1&limit=15`;
    let response = await fetch(
        reqUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": process.env.TRAKT_CLIENT_ID
            }
        }
    );
    return await response.json();
}
module.exports = {
    getPopularShows,
    getTrendingMovie
};


//movies

async function getTrendingMovie() {
    let reqUrl = `${trakt}/movies/trending`;
    let response = await fetch(
        reqUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": process.env.TRAKT_CLIENT_ID
            }
        }
    );
    return await response.json();
}