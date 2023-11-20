import { memo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function Routes({
    routes,
}: {
    routes: any[],
}) {
    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
}

export default memo(Routes);