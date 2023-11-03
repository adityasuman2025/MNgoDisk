import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingAnimation from "mngo-project-tools/comps/LoadingAnimation";
import RenderFile from "./RenderFile";
import { apiCall, getFilePathToUrlMap } from "./utils";

const FIREBASE_BASE_URL = "https://firebasestorage.googleapis.com/v0/b/documents-b4b54.appspot.com/o";
const LOCAL_STORAGE_FB_FILES_KEY = "filesJSON";
const LOCAL_STORAGE_FB_FILES = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FB_FILES_KEY) || "[]");

function getRoutes2(array: any[]): any[] {
    return array.map(({ path, fileUrl }) => ({ path, element: <RenderFile fileUrl={fileUrl} /> }));
}

export default function App() {
    const [routes, setRoutes] = useState<any[]>(getRoutes2(LOCAL_STORAGE_FB_FILES));

    useEffect(() => {
        (async function () {
            try {
                const items = (await apiCall(FIREBASE_BASE_URL))?.items || [];
                const firebaseFiles: any[] = getFilePathToUrlMap(items, FIREBASE_BASE_URL);

                setRoutes(getRoutes2(firebaseFiles));
                localStorage.setItem(LOCAL_STORAGE_FB_FILES_KEY, JSON.stringify(firebaseFiles));
            } catch { }
        })();
    }, []);

    const router = createBrowserRouter([
        ...routes,
        {
            path: "/",
            element: <RenderFile fileUrl={`${FIREBASE_BASE_URL}/aditya_suman_sde2_iitp.pdf?alt=media`} />,
        },
        {
            path: "resume",
            element: <RenderFile fileUrl={`${FIREBASE_BASE_URL}/aditya_suman_sde2_iitp.pdf?alt=media`} />,
        },
        {
            path: "*",
            element: <RenderFile />,
        }
    ]);

    return (
        <div className="fileContainer">
            {
                routes.length ?
                    <RouterProvider router={router} />
                    : <LoadingAnimation loading loaderClassName="loaderClassName" />
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