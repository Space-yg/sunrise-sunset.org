# getSunriseSunset
### function
##### since -- v1.0.0
Get raw sunrise sunset data

### Overloads
- [`Object`](#Object)
- [`Parameters`](#Parameters)

# Overloads
## `Object`
##### since -- v1.0.0
Type Parameters:
1. `Formatted extends boolean = true`

	Whether the response is formatted or not.

	If `true`, API response is in relative format to `tzid`, and `day_length` is repented as time (e.g. `10:24:04`). Otherwise API response is in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and `day_length` is repented as seconds.

Parameters:
1. `parameters: SunriseSunset.APIParameters & { formatted?: Formatted | boolean }`

	Parameter options

Returns:

`Promise<`[`SunriseSunset`](../types/SunriseSunset.html)`.`[`APIResponseFormatted`](../types/SunriseSunset/APIResponseFormatted.html)`<Formatted>>`

## `Parameters`
##### since -- v1.0.0
Type Parameters:
1. `Formatted extends boolean = true`

	Whether the response is formatted or not.

	If `true`, API response is in relative format to `tzid`, and `day_length` is repented as time (e.g. `10:24:04`). Otherwise API response is in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and `day_length` is repented as seconds.

Parameters:
1. `latitude: number`

	Latitude in decimal degrees.

2. `longitude: number`

	Longitude in decimal degrees.

3. `date?: string | Date`

	Date in YYYY-MM-DD format. Also accepts [other date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.date) and [even relative date formats](https://www.php.net/manual/en/datetime.formats.php#datetime.formats.relative).

	If not present, date defaults to current date.

4. `callback?: string`

	Callback function name for JSONP response.

5. `formatted?: Formatted | boolean`

	Time values in response will be expressed following [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) and day_length will be expressed in seconds.

	`true` by default.

6. `tzid?: string`

	A timezone identifier, like for example: _UTC_, _Africa/Lagos_, _Asia/Hong_Kong_, or _Europe/Lisbon_. The list of valid identifiers is available in this [List of Supported Timezones](https://www.php.net/manual/en/timezones.php). If provided, the times in the response will be referenced to the given Time Zone.

	Unless you provide a `tzid`, all times are in [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) and summer time adjustments are not included in the returned data.

Returns:

`Promise<`[`SunriseSunset`](../types/SunriseSunset.html)`.`[`APIResponseFormatted`](../types/SunriseSunset/APIResponseFormatted.html)`<Formatted>>`