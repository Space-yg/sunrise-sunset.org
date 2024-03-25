/**
 * Convert heading to ID
 * @param heading The heading to convert
 * @returns The ID of the heading
 */
export function headingToAnchor(heading: string): string {
	return encodeURI(heading.split(":")[0].split(" ")[0].replace("?", ""))
}