export async function getSunriseSunset(latitudeOrParameters, longitude, date, callback, formatted, tzid) {
    if (typeof latitudeOrParameters === "object") {
        var request = `https://api.sunrise-sunset.org/json?lat=${latitudeOrParameters.latitude}&lng=${latitudeOrParameters.longitude}`;
        if (typeof latitudeOrParameters.date !== "undefined")
            request += `&date=${latitudeOrParameters.date}`;
        if (typeof latitudeOrParameters.callback !== "undefined")
            request += `&callback=${latitudeOrParameters.callback}`;
        if (typeof latitudeOrParameters.formatted !== "undefined")
            request += `&formatted=${latitudeOrParameters.formatted ? 1 : 0}`;
        if (typeof latitudeOrParameters.tzid !== "undefined")
            request += `&tzid=${latitudeOrParameters.tzid}`;
        return await (await fetch(request)).json();
    }
    else {
        var request = `https://api.sunrise-sunset.org/json?lat=${latitudeOrParameters}&lng=${longitude}`;
        if (typeof date !== "undefined")
            request += `&date=${date}`;
        if (typeof callback !== "undefined")
            request += `&callback=${callback}`;
        if (typeof formatted !== "undefined")
            request += `&formatted=${formatted ? 1 : 0}`;
        if (typeof tzid !== "undefined")
            request += `&tzid=${tzid}`;
        return await (await fetch(request)).json();
    }
}
