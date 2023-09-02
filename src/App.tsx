import { MNgoSecurePDFViewer } from 'react-secure-pdf-viewer-mngo';
import resume from './aditya_suman_sde2_iitp_resume.pdf';

function App() {
    return (
        <>
            <div className='downloadBtnCont'><a className={"downloadBtn"} href={resume} download target='_blank'>Download</a></div>
            <MNgoSecurePDFViewer
                pdfUrl={resume}
                compHeight={"calc(100vh - 42px)"}
            />
        </>
    )
}

export default App
