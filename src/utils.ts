export function snakeCase(str: string): string {
    if (!str || Number(str)) return str;

    const strSymbolsRemoved = str.replace(/-/g, " ").replace(/_/g, " ").replace(/\(/g, " ").replace(/\)/g, "");
    const strSplittedBySpace = strSymbolsRemoved.split(" ");
    const extraSpaceRemoved = strSplittedBySpace.filter(item => item !== "");

    return extraSpaceRemoved.reduce((acc, item) => (acc ? acc + "_" : "") + item.toLowerCase(), "");
}

export function getFilePathToUrlMap(array: any[], baseUrl: string) {
    return array.reduce((acc, name) => {
        const { path, fileUrl } = getPathAndFileUrlFromFile(name, baseUrl)
        acc[path] = fileUrl;
        return acc;
    }, {});
}

function getPathAndFileUrlFromFile(name: string, baseUrl: string) {
    /*-------- converting the file name to snakecase with route parent attached ----------*/
    const fileNamePathArr = name?.split("/") || [];
    const orgFileName = fileNamePathArr.pop() || "";
    const orgFileNameArr = orgFileName?.split(".");
    orgFileNameArr?.pop(); // file extension removed
    const fileNameWithoutExt = orgFileNameArr?.join("") || "";
    const snakeCasedFileName = snakeCase(fileNameWithoutExt)
    const path = fileNamePathArr.reduce((acc: string, item: string) => acc + item.toLowerCase() + "/", "") + snakeCasedFileName;
    /*-------- converting the file name to snakecase with route parent attached ----------*/

    const fileName = encodeURIComponent(orgFileName.trim()); // to replace space, & and other special characters with correct url encoding
    const location = fileNamePathArr.join("/")

    const fileUrl = `${baseUrl}?location=${location}&fileName=${fileName}&isDocument=true`;

    return { path, fileUrl };
}