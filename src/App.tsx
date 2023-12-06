import { useState, useEffect } from "react";
import Loader from "mngo-project-tools/comps/Loader";
import { sendRequestToAPI } from "mngo-project-tools/utils";
import Routes from "./Routes";
import RenderFile from "./RenderFile";
import { getFilePathToUrlMap } from "./utils";

const API_BASE_URL = "https://apis.mngo.in"; // 'http://localhost:3000' //
const API_DISK_HREF = "/api/disk";
const API_FILE_HREF = "/api/get-file";
const RESUME_FILE_PATH = "?location=&fileName=aditya_suman_sde2_iitp.pdf&isDocument=true";

const LOCAL_STORAGE_FB_FILES_KEY = "filesJSON";
const LOCAL_STORAGE_FB_FILES = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FB_FILES_KEY) || "[]");

function getRoutes2(array: any[]): any[] {
    return array.map(({ path, fileUrl }) => ({ path, exact: true, element: <RenderFile fileUrl={fileUrl} /> }));
}

export default function App() {
    const [routes, setRoutes] = useState<any[]>(getRoutes2(LOCAL_STORAGE_FB_FILES));

    useEffect(() => {
        (async function () {
            try {
                const items = (await sendRequestToAPI(API_BASE_URL, API_DISK_HREF))?.data || [];

                const apiUrl = API_BASE_URL + API_FILE_HREF;
                const firebaseFiles: any[] = [
                    ...getFilePathToUrlMap(items, apiUrl),
                    { path: "/", fileUrl: `${apiUrl}${RESUME_FILE_PATH}` },
                    { path: "resume", fileUrl: `${apiUrl}${RESUME_FILE_PATH}` },
                    { path: "*", fileUrl: "" },
                ];

                setRoutes(getRoutes2(firebaseFiles));
                localStorage.setItem(LOCAL_STORAGE_FB_FILES_KEY, JSON.stringify(firebaseFiles));
            } catch { }
        })();
    }, []);

    return (
        <div className="fileContainer">
            {
                routes.length ? <Routes routes={routes} />
                    : <Loader loading styles={{ loaderClassName: "loaderClassName" }} />
            }
        </div>
    )
}

/*
    vercel.json file needed to be added in the root directory of the project, with the below code, to make the routing work on vercel.
    {
       "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }

    and for local
    -s is used with serve to serve the index.html file for all the routes
    i.e, serve dist -s
*/