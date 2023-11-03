import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
            path: "*",
            element: <RenderFile fileUrl={`${FIREBASE_BASE_URL}/aditya_suman_sde2_iitp.pdf?alt=media`} />,
        }
    ]);

    return <RouterProvider router={router} />
}