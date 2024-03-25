export function headingToAnchor(heading) {
    return encodeURI(heading.split(":")[0].split(" ")[0].replace("?", ""));
}
