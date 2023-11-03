import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RenderFile from "./RenderFile";
import { apiCall, getFilePathToUrlMap } from "./utils";


const FIREBASE_BASE_URL = "https://firebasestorage.googleapis.com/v0/b/documents-b4b54.appspot.com/o";
const LOCAL_STORAGE_FB_FILES_KEY = "filesJSON";
const LOCAL_STORAGE_FB_FILES = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FB_FILES_KEY) || "[]");

// function getRoutes2(array: any[]): any[] {
//     return array.map(({ path, fileUrl }) => ({ path, element: <RenderFile fileUrl={fileUrl} /> }));
// }
function getRoutes(array: any[]): any[] {
    const routes = array.map(({ path, fileUrl }) => {
        return <Route key={path} path={path} element={<RenderFile fileUrl={fileUrl} />} />
    });

    routes.push(<Route key={"*"} path={"*"} element={<RenderFile fileUrl={`${FIREBASE_BASE_URL}/aditya_suman_sde2_iitp.pdf?alt=media`} />} />);

    return routes;
}

export default function App() {
    const [routes, setRoutes] = useState<any[]>(getRoutes(LOCAL_STORAGE_FB_FILES));
    console.log("routes", routes)

    useEffect(() => {
        (async function () {
            try {
                const items = (await apiCall(FIREBASE_BASE_URL))?.items || [];
                const firebaseFiles: any[] = getFilePathToUrlMap(items, FIREBASE_BASE_URL);

                setRoutes(getRoutes(firebaseFiles));
                localStorage.setItem(LOCAL_STORAGE_FB_FILES_KEY, JSON.stringify(firebaseFiles));
            } catch { }
        })();
    }, []);

    return (
        <BrowserRouter >
            <Routes>
                {routes}
            </Routes>
        </BrowserRouter>
    );

    // const router = createBrowserRouter([
    //     ...routes,
    //     {
    //         path: "*",
    //         element: <RenderFile fileUrl={`${FIREBASE_BASE_URL}/aditya_suman_sde2_iitp.pdf?alt=media`} />,
    //     }
    // ]);

    // return <RouterProvider router={router} />
}