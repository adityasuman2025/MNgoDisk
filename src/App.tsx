import { useState, useEffect } from "react";
import Loader from "mngo-project-tools/comps/Loader";
import { sendRequestToAPI } from "mngo-project-tools/utils";
import { getCacheRegular, setCacheRegular } from "mngo-project-tools/cachingUtil";
import RenderFile from "./RenderFile";
import { getFilePathToUrlMap } from "./utils";

const API_BASE_URL = "https://apis.mngo.in"; // 'http://localhost:3000' //
const API_DISK_HREF = "/api/disk";
const API_FILE_HREF = "/api/get-file";
const RESUME_FILE_PATH = "?location=&fileName=aditya_suman_sde2_iitp.pdf&isDocument=true";

const LOCAL_STORAGE_FB_FILES_KEY = "filesJSON";
const LOCAL_STORAGE_FB_FILES = getCacheRegular(LOCAL_STORAGE_FB_FILES_KEY);

const pathName = (window.location.pathname).substring(1) || "";

export default function App() {
    const [files, setFiles] = useState<{ [key: string]: any }>(LOCAL_STORAGE_FB_FILES);
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        const fileExists = checkIfFileExists(files);

        (async function () {
            try {
                const items = (await sendRequestToAPI(API_BASE_URL, API_DISK_HREF))?.data || [];

                const apiUrl = API_BASE_URL + API_FILE_HREF;
                const firebaseFiles: { [key: string]: any } = {
                    ...getFilePathToUrlMap(items, apiUrl),
                    "/": `${apiUrl}${RESUME_FILE_PATH}`, "": `${apiUrl}${RESUME_FILE_PATH}`, "resume": `${apiUrl}${RESUME_FILE_PATH}`,
                };

                setFiles(firebaseFiles);
                setCacheRegular(LOCAL_STORAGE_FB_FILES_KEY, firebaseFiles);

                if (!fileExists) checkIfFileExists(firebaseFiles, true);
            } catch { }
        })();
    }, [pathName]);

    function checkIfFileExists(files: { [key: string]: any }, isFinalCheck = false) {
        if (files && Object.keys(files).length) {
            const filePaths = Object.keys(files);

            if (filePaths.includes(pathName)) {
                setFileUrl(files[pathName]);
                return true;
            } else {
                if (isFinalCheck) setFileUrl("no");
            }
        }

        return false;
    }

    return (
        <div className="fileContainer">
            {
                (!fileUrl) ? (
                    <Loader loading styles={{ loaderClassName: "loaderClassName" }} />
                ) : (fileUrl === "no") ? (
                    <div className="loader">
                        <div>File not found</div>
                        <Loader loading styles={{ loaderClassName: "loaderClassName" }} />
                    </div>
                ) : (
                    <RenderFile fileUrl={fileUrl} />
                )
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