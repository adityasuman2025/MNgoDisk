import { useState, memo } from "react";
import LoadingAnimation from "mngo-project-tools/comps/LoadingAnimation";

function RenderFile({
    fileUrl
}: {
    fileUrl?: string
}) {
    console.log("fileUrl", fileUrl)
    const [loading, setLoading] = useState(true);

    return (
        <>
            {
                loading &&
                <div className="loader">
                    {!fileUrl ? <div>File not found</div> : null}
                    <LoadingAnimation loading loaderClassName="loaderClassName" />
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