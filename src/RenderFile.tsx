import { useState } from "react";
import LoadingAnimation from "mngo-project-tools/comps/LoadingAnimation";

export default function RenderFile({
    fileUrl
}: {
    fileUrl?: string
}) {
    const [loading, setLoading] = useState(true);

    return (
        <div className="fileContainer">
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
        </div>
    )
}