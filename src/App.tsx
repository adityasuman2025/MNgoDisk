import { MNgoSecurePDFViewer } from 'react-secure-pdf-viewer-mngo';
import resume from './aditya_suman_sde2_iitp_resume.pdf';

function App() {
    return (
        <>
            <MNgoSecurePDFViewer
                securityOptions={{
                    blockDownload: false,
                    blockUserSelection: false,
                    blockPrint: false,
                    blockRightClick: false,
                }}
                pdfUrl={resume}
                compHeight={"calc(100vh - 42px)"}
            />
        </>
    )
}

export default App;