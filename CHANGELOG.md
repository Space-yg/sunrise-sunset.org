# v1.2.0
### Added
- [Wiki](space-yg.github.io/sunrise-sunset.org/wiki/index.html)!
- `@since` to each property in each interface.
- `@default` to properties with default value.
- `@template` for type parameters.
- Description to `SunriseSunset.APIResponseNotFormatted`.

### Edited
- `SunriseSunset` description.
- `SunriseSunset.APIParameters` description.

# v1.1.0
### Added
- Added this CHANGELOG.md.
- `SunriseSunset.APIParameters.date` can now take a `Date`.
- `SunriseSunset.APIResponse` can take a type parameter which is a status, or status of the response.
- `SunriseSunset.APIResponseFormatted` can now take a type parameter which is boolean for whether the response is formatted or not.
- `getSunriseSunset` function now accepts a `Date` type in the `date` parameter.

### Edited
- Replaced `SunriseSunset.APIResponseNotFormatted` with `SunriseSunset.APIResponseFormatted<false>`.
- Changed `APIResponseInvalidRequest`, `APIResponseInvalidDate`, `APIResponseInvalidTzid`, and `APIResponseUnknownError` to type instead of interface.
- Renamed `types.ts` to `types.d.ts`.

# v1.0.0
### Added
- Added namespace `SunriseSunset`.
- Added function `getSunriseSunset`.