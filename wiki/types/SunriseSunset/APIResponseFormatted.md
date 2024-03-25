# APIResponseFormatted
### interface
#### extends [`APIResponse`](./APIResponse.html)`<"OK">`
##### since -- v1.0.0
API response that is either formatted or not.

### Type Parameters
- [`Formatted`](#Formatted)

# Type Parameters
## `Formatted extends Boolean = true`
##### since -- v1.1.0
Whether the response is formatted or not.

If `true`, API response is in relative format to [`tzid`](./APIParameters.html#tzid), and [`day_length`](./APIParameters.html#day_length) is repented as time (e.g. `10:24:04`).
Otherwise API response that is in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and [`day_length`](./APIParameters.html#day_length) is repented as seconds.

If you do not know is the response is formatted or not, then use [`APIResponse`](./APIResponse.html).