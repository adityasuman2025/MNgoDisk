import { memo } from "react";
import Loader from "mngo-project-tools/comps/Loader";

function RenderFile({
    fileUrl
}: {
    fileUrl?: string
}) {
    return (
        <>
            <div className="loader">
                {!fileUrl ? <div>File not found</div> : null}
                <Loader loading styles={{ loaderClassName: "loaderClassName" }} />
            </div>

            {
                fileUrl &&
                <iframe
                    className="iframe"
                    src={fileUrl}
                    onLoad={(e) => {
                        try {
                            e.currentTarget.style.background = "#242424";
                        } catch { }
                    }}
                />
            }
        </>
    )
}

export default memo(RenderFile);