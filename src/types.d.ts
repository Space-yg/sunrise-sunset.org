/**
 * Here are all the types.
 * @since v1.0.0
 */

/**
 * `sunrise-sunset.org`'s API
 * @since v1.0.0
 */
export namespace SunriseSunset {
	////////////////////
	//// Parameters ////
	////////////////////

	/**
	 * API parameters
	 * @since v1.0.0
	 */
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
		date?: string | Date
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

	/**
	 * Status of the request
	 * @since v1.0.0
	 */
	export type Status = "OK" | "INVALID_REQUEST" | "INVALID_DATE" | "UNKNOWN_ERROR" | "INVALID_TZID"

	/**
	 * API results from response
	 * @since v1.0.0
	 */
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

	/**
	 * API response
	 * @since v1.0.0
	 */
	export interface APIResponse<Status extends SunriseSunset.Status = "OK"> {
		/** Result of the request. */
		results: Status extends "OK" ? APIResponseResults : ""
		/** Status of the request. */
		status: Status
		/** `tzid` of the results. */
		tzid: string
	}
	
	/**
	 * API response that is either formatted or not.
	 * 
	 * If `Formatted` is `true`, API response is in relative format to `tzid`, and `day_length` is repented as time (e.g. `10:24:04`).
	 * 
	 * If `Formatted` is `false`, API response that is in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and `day_length` is repented as seconds.
	 * 
	 * If you do not know is the response is formatted or not, then use {@link APIResponse}.
	 * 
	 * @since v1.0.0
	 */
	export interface APIResponseFormatted<Formatted extends Boolean = true> extends APIResponse<"OK"> {
		results: APIResponseResults & (Formatted extends true ? {
			day_length: string
		} : {
			day_length: number
		})
	}

	/**
	 * @deprecated Since v1.1.0. Use {@link APIResponseFormatted `APIResponseFormatted<false>`} instead
	 * @since v1.0.0
	 */
	export type APIResponseNotFormatted = APIResponseFormatted<false>

	////////////////
	//// Errors ////
	////////////////
	
	/**
	 * Invalid API request. Indicates that either lat or lng parameters are missing or invalid.
	 * @since v1.0.0
	 */
	export type APIResponseInvalidRequest = APIResponse<"INVALID_REQUEST">

	/**
	 * Invalid API request date. Indicates that date parameter is invalid.
	 * @since v1.0.0
	 */
	export type APIResponseInvalidDate = APIResponse<"INVALID_DATE">

	/**
	 * Invalid API request tzid. Indicates that tzid parameter value provided is invalid, response is valid but times are in UTC.
	 * @since v1.0.0
	 */
	export type APIResponseInvalidTzid = APIResponse<"INVALID_TZID">
	
	/**
	 * Unknown API request error. Indicates that the request could not be processed due to a server error.
	 * @since v1.0.0
	 */
	export type APIResponseUnknownError = APIResponse<"UNKNOWN_ERROR">
}

export default SunriseSunset