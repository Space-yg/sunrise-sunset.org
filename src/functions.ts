/**
 * Here are some useful functions.
 * @since v1.0.0
 */

import type SunriseSunset from "./types"

/**
 * Get raw sunrise sunset data
 * @param parameters Parameter options
 * @returns Raw sunrise sunset data
 * @since v1.0.0
 */
export async function getSunriseSunset<Formatted extends boolean = true>(
	parameters: SunriseSunset.APIParameters & {
		formatted?: Formatted | boolean
	},
): Promise<SunriseSunset.APIResponseFormatted<Formatted>>
/**
 * Get raw sunrise sunset data
 * @param latitude Latitude in decimal degrees.
 * @param longitude Longitude in decimal degrees.
 * @param date Date in YYYY-MM-DD format. Also accepts [other date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.date) and [even relative date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative).
 * 
 * If not present, date defaults to current date.
 * @param callback Callback function name for JSONP response.
 * @param formatted Time values in response will be expressed following [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) and day_length will be expressed in seconds.
 * 
 * `true` by default.
 * @param tzid A timezone identifier, like for example: _UTC_, _Africa/Lagos_, _Asia/Hong_Kong_, or _Europe/Lisbon_. The list of valid identifiers is available in this [List of Supported Timezones](https://www.php.net/manual/en/timezones.php). If provided, the times in the response will be referenced to the given Time Zone.
 * 
 * Unless you provide a `tzid`, all times are in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) and summer time adjustments are not included in the returned data.
 * @returns Raw sunrise sunset data
 * @since v1.0.0
 */
export async function getSunriseSunset<Formatted extends boolean = true>(
	latitude: number,
	longitude: number,
	date?: string | Date,
	callback?: string,
	formatted?: Formatted | boolean,
	tzid?: string,
): Promise<SunriseSunset.APIResponseFormatted<Formatted>>
/**
 * Get raw sunrise sunset data
 * @param latitudeOrParameters Latitude in decimal degrees OR Parameter options.
 * @param longitude Longitude in decimal degrees.
 * @param date Date in YYYY-MM-DD format. Also accepts [other date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.date) and [even relative date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative).
 * 
 * If not present, date defaults to current date.
 * @param callback Callback function name for JSONP response.
 * @param formatted Time values in response will be expressed following [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) and day_length will be expressed in seconds.
 * 
 * `true` by default.
 * @param tzid A timezone identifier, like for example: _UTC_, _Africa/Lagos_, _Asia/Hong_Kong_, or _Europe/Lisbon_. The list of valid identifiers is available in this [List of Supported Timezones](https://www.php.net/manual/en/timezones.php). If provided, the times in the response will be referenced to the given Time Zone.
 * 
 * Unless you provide a `tzid`, all times are in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) and summer time adjustments are not included in the returned data.
 * @returns Raw sunrise sunset data
 * @since v1.0.0
 */
export async function getSunriseSunset(
	latitudeOrParameters: number | SunriseSunset.APIParameters,
	longitude?: number,
	date?: string | Date,
	callback?: string,
	formatted?: boolean,
	tzid?: string,
) {
	// Parameters
	if (typeof latitudeOrParameters === "object") {
		var request = `https://api.sunrise-sunset.org/json?lat=${latitudeOrParameters.latitude}&lng=${latitudeOrParameters.longitude}`
		if (typeof latitudeOrParameters.date !== "undefined") request += `&date=${latitudeOrParameters.date instanceof Date ? latitudeOrParameters.date.toISOString() : latitudeOrParameters.date}`
		if (typeof latitudeOrParameters.callback !== "undefined") request += `&callback=${latitudeOrParameters.callback}`
		if (typeof latitudeOrParameters.formatted !== "undefined") request += `&formatted=${latitudeOrParameters.formatted ? 1 : 0}`
		if (typeof latitudeOrParameters.tzid !== "undefined") request += `&tzid=${latitudeOrParameters.tzid}`
		return await (await fetch(request)).json()
	}
	// Number
	else {
		var request = `https://api.sunrise-sunset.org/json?lat=${latitudeOrParameters}&lng=${longitude}`
		if (typeof date !== "undefined") request += `&date=${date instanceof Date ? date.toISOString() : date}`
		if (typeof callback !== "undefined") request += `&callback=${callback}`
		if (typeof formatted !== "undefined") request += `&formatted=${formatted ? 1 : 0}`
		if (typeof tzid !== "undefined") request += `&tzid=${tzid}`
		return await (await fetch(request)).json()
	}
}