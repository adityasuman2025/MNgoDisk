import { useState, memo } from "react";
import LoadingAnimation from "mngo-project-tools/comps/LoadingAnimation";

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
                    <LoadingAnimation loading styles={{ loaderClassName: "loaderClassName" }} />
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