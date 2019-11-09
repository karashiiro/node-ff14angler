const request = require("request-promise");

const AREA    = require("./area");

/**
 * options:
 *     offset<number>: The number of comments to skip over in the response.
 *     limit<number>: The number of comments to retrieve.
 *     type<unknown>: Something? Removes the link if a non-zero integer.
 *     item<number>: The location ID to filter for. There's no list of location IDs.
 * returns: Array<Object>
 */
module.exports.getComments = async (options) => {
    let queryParams = options ? "?" : "";
    if (options) {
        for (const opt of Object.getOwnPropertyNames(options)) {
            if (queryParams.length !== 1) {
                queryParams += "&";
            }
            queryParams += `${opt}=${options[opt].toString()}`;
        }
    }

    const res = await request(`https://ff14angler.com/comment.php${queryParams}`);
    return res.comment;
};

/**
 * options:
 *     rid<number>: A request ID. Doesn't seem to do anything.
 *     name<number>: If truthy, returns a <span> of class "weather_name" in the html field.
 * returns: Array<Object>
 */
module.exports.getWeather = async (options) => {
    let queryParams = options ? "?" : "";
    if (options) {
        for (const opt of Object.getOwnPropertyNames(options)) {
            if (queryParams.length !== 1) {
                queryParams += "&";
            }
            queryParams += `${opt}=${options[opt].toString()}`;
        }
    }

    const res = await request(`https://ff14angler.com/weather.php${queryParams}`);
    res.data.forEach((locale) => {
        locale.areaName = AREA[parseInt(locale.area)];
        locale.weatherIcon = `/img/w/0602${locale.weather.length === 1 ? "0" + locale.weather : locale.weather}.png`;
    });
    return res;
};
