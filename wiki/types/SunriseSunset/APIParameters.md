# APIParameters
### interface
##### since -- v1.0.0
Parameters for the API

### Properties
- [`latitude`](#latitude)
- [`longitude`](#longitude)
- [`date`](#date)
- [`callback`](#callback)
- [`formatted`](#formatted)
- [`tzid`](#tzid)

# Properties
## `latitude: number`
##### since -- v1.0.0
Latitude in decimal degrees.

## `longitude: number`
##### since -- v1.0.0
Longitude in decimal degrees.

## `date?: string | Date`
##### since -- v1.0.0
Date in `YYYY-MM-DD` format. Also accepts [other date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.date) and [even relative date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative).

If not present, date defaults to current date.

## `callback?: string`
##### since -- v1.0.0
Callback function name for JSONP response.

## `formatted?: boolean`
##### since -- v1.0.0
Time values in response will be expressed following [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) and day_length will be expressed in seconds.

`true` by default.

## `tzid?: string`
##### since -- v1.0.0
A timezone identifier, like for example: `UTC`, `Africa/Lagos`, `Asia/Hong_Kong`, or `Europe/Lisbon`. The list of valid identifiers is available in this [List of Supported Timezones](https://www.php.net/manual/en/timezones.php). If provided, the times in the response will be referenced to the given Time Zone.

Unless you provide a `tzid`, all times are in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) and summer time adjustments are not included in the returned data.