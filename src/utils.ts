function snakeCase(str: string): string {
    if (!str || Number(str)) return str;

    const strSymbolsRemoved = str.replace(/-/g, " ").replace(/_/g, " ").replace(/\(/g, " ").replace(/\)/g, "");
    const strSplittedBySpace = strSymbolsRemoved.split(" ");
    const extraSpaceRemoved = strSplittedBySpace.filter(item => item !== "");

    return extraSpaceRemoved.reduce((acc, item) => (acc ? acc + "_" : "") + item.toLowerCase(), "");
}

async function apiCall(url: string, method = "get", body = {}) {
    try {
        const resp = await fetch(url, {
            method: method || "get",
            ...(method !== "get" ? { body: JSON.stringify(body || {}) } : {})
        });
        const jsonResp = resp.json();

        return jsonResp;
    } catch (e: any) {
        throw Error(e)
    }
}

function getFilePathToUrlMap(array: any[], baseUrl: string) {
    return array.map(({ name, }) => {
        /*-------- converting the file name to snakecase with route parent attached ----------*/
        const fileNamePathArr = name?.split("/") || [];
        const orgFileName = fileNamePathArr.pop();
        const orgFileNameArr = orgFileName?.split(".");
        orgFileNameArr?.pop(); // file extension removed
        const fileNameWithoutExt = orgFileNameArr?.join("");
        const snakeCasedFileName = snakeCase(fileNameWithoutExt)
        const path = fileNamePathArr.reduce((acc: string, item: string) => acc + item.toLowerCase() + "/", "") + snakeCasedFileName;
        /*-------- converting the file name to snakecase with route parent attached ----------*/

        // https://firebasestorage.googleapis.com/v0/b/documents-b4b54.appspot.com/o/Achievement/Appreciation%20for%20Key%20Issue%20App.png?alt=media
        // https://firebasestorage.googleapis.com/v0/b/documents-b4b54.appspot.com/o/Achievement%2FAppreciation%20for%20Key%20Issue%20App.png?alt=media
        const pathUrl = name.split("/").reduce((acc: string, item: string, idx: number) => (idx === 0 ? acc + item : acc + "%2F" + item), "");
        const fileUrl = `${baseUrl}/${pathUrl}?alt=media`;

        return { path, fileUrl };
    });
}

export { snakeCase, apiCall, getFilePathToUrlMap };