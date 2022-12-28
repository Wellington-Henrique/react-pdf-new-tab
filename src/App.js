import { useEffect, useState } from 'react';
import './App.css';
import { pdf } from './base64pdf.js';

function App() {
  const [file, setFile] = useState(null);

  const handleChooseFile = (e) => {
    const { files } = e.target;
    setFile(files[0]);
  }

  const handlePrint = (e) => {
    e.preventDefault();

    //openBySelectedFile();
    //openByBase64ToBlobFile();
    openByImportedFile();
  }

  const openBySelectedFile = () => {
    const blob = new Blob([file], { type: "application/pdf" });
    openInNewTab(blob);
  }
  
  const openByBase64ToBlobFile = () => {
    const blob = b64toBlob(pdf, 'application/pdf');
    openInNewTab(blob);
  }

  const openByImportedFile = () => {
    file.arrayBuffer().then((arrayBuffer) => {
      const blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
      openInNewTab(blob);
    });
  }

  const openInNewTab = (blob) => {
    const blobUrl = URL.createObjectURL(blob);
    const pdfWindow = window.open();
    pdfWindow.location.href = blobUrl;  
  }

  const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  return (
    <div className="App">
      <input type="file" onChange={(e) => handleChooseFile(e)}/>
      <button onClick={(e) => handlePrint(e)}>Open</button>
    </div>
  );
}

export default App;
