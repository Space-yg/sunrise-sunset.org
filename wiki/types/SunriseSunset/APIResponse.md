# APIResponse
### interface
##### since -- v1.0.0
API response

### Type Parameters
- [`Status`](#Status)

### Properties
- [`results`](#results)
- [`status`](#status)
- [`tzid`](#tzid)

# Type Parameters
## `Status extends SunriseSunset.Status = "OK"`
##### since -- v1.0.0
The status of the response.

# Properties
## `results: Status extends "OK" ? APIResponseResults : ""`
##### since -- v1.0.0
Result of the request.

## `status: Status`
##### since -- v1.0.0
Status of the request.

## `tzid: string`
##### since -- v1.0.0
`tzid` of the results.