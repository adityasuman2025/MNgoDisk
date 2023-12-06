import { useState, memo } from "react";
import Loader from "mngo-project-tools/comps/Loader";

function RenderFile({
    fileUrl
}: {
    fileUrl?: string
}) {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {
                loading &&
                <div className="loader">
                    {!fileUrl ? <div>File not found</div> : null}
                    <Loader loading styles={{ loaderClassName: "loaderClassName" }} />
                </div>
            }

            {
                fileUrl &&
                <iframe
                    className="iframe"
                    src={fileUrl} onLoad={() => setLoading(false)}
                />
            }
        </>
    )
}

export default memo(RenderFile);