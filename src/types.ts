/**
 * Here are all the types.
 */

/** `sunrise-sunset.org`'s API */
export namespace SunriseSunset {
	////////////////////
	//// Parameters ////
	////////////////////

	/** API parameters */
	export interface APIParameters {
		/** Latitude in decimal degrees. */
		latitude: number
		/** Longitude in decimal degrees. */
		longitude: number
		/**
		 * Date in `YYYY-MM-DD` format. Also accepts [other date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.date) and [even relative date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative).
		 * 
		 * If not present, date defaults to current date.
		 */
		date?: string
		/** Callback function name for JSONP response. */
		callback?: string
		/**
		 * Time values in response will be expressed following [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) and day_length will be expressed in seconds.
		 * 
		 * `true` by default.
		 */
		formatted?: boolean
		/**
		 * A timezone identifier, like for example: `UTC`, `Africa/Lagos`, `Asia/Hong_Kong`, or `Europe/Lisbon`. The list of valid identifiers is available in this [List of Supported Timezones](https://www.php.net/manual/en/timezones.php). If provided, the times in the response will be referenced to the given Time Zone.
		 * 
		 * Unless you provide a `tzid`, all times are in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) and summer time adjustments are not included in the returned data.
		 */
		tzid?: string
	}

	///////////////////
	//// Responses ////
	///////////////////

	/** Status of the request */
	export type Status = "OK" | "INVALID_REQUEST" | "INVALID_DATE" | "UNKNOWN_ERROR" | "INVALID_TZID"

	/** API results from response */
	export interface APIResponseResults {
		/** The beginning of an [Astronomical Twilight](https://sunrise-sunset.org/glossary#AstronomicalTwilight). */
		astronomical_twilight_begin: string
		/** The end of an [Astronomical Twilight](https://sunrise-sunset.org/glossary#AstronomicalTwilight). */
		astronomical_twilight_end: string
		/** The beginning of an [Civil Twilight](https://sunrise-sunset.org/glossary#CivilTwilight). */
		civil_twilight_begin: string
		/** The end of an [Civil Twilight](https://sunrise-sunset.org/glossary#CivilTwilight). */
		civil_twilight_end: string
		/** The duration of time the Sun is above the horizon in a given day. It varies throughout the year due to the tilt of the Earth's axis. */
		day_length: number | string
		/** The beginning of an [Nautical Twilight](https://sunrise-sunset.org/glossary#NauticalTwilight). */
		nautical_twilight_begin: string
		/** The end of an [Nautical Twilight](https://sunrise-sunset.org/glossary#NauticalTwilight). */
		nautical_twilight_end: string
		/** The time when the Sun is at its highest point in the sky for a specific location. It does not always coincide with 12:00 noon on the clock due to the variation in time zones and the equation of time. */
		solar_noon: string
		/** The time of the sunrise */
		sunrise: string
		/** The time of the sunset */
		sunset: string
	}

	/** API response */
	export interface APIResponse {
		/** Result of the request. */
		results: APIResponseResults | ""
		/** Status of the request. */
		status: Status
		/** `tzid` of the results. */
		tzid: string
	}

	/** API response that is in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and `day_length` is repented as seconds. */
	export interface APIResponseNotFormatted extends APIResponse {
		results: APIResponseResults & {
			day_length: number
		}
		status: "OK"
	}
	
	/** API response that is in relative format to `tzid`, and `day_length` is repented as time (e.g. `10:24:04`). */
	export interface APIResponseFormatted extends APIResponse {
		results: APIResponseResults & {
			day_length: string
		}
		status: "OK"
	}

	////////////////
	//// Errors ////
	////////////////
	
	/** Invalid API request. Indicates that either lat or lng parameters are missing or invalid. */
	export interface APIResponseInvalidRequest extends APIResponse {
		results: ""
		status: "INVALID_REQUEST"
	}

	/** Invalid API request date. Indicates that date parameter is invalid. */
	export interface APIResponseInvalidDate extends APIResponse {
		results: ""
		status: "INVALID_DATE"
	}

	/** Unknown API request error. Indicates that the request could not be processed due to a server error. */
	export interface APIResponseUnknownError extends APIResponse {
		results: ""
		status: "UNKNOWN_ERROR"
	}

	/** Invalid API request tzid. Indicates that tzid parameter value provided is invalid, response is valid but times are in UTC. */
	export interface APIResponseInvalidTzid extends APIResponse {
		results: ""
		status: "INVALID_TZID"
	}
}

export default SunriseSunset