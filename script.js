


    // ---------------- ZIP to PDF -----------------
    async function convertZipToPdf() {
      const fileInput = document.getElementById('zipFile').files[0];
      if (!fileInput) { alert("Please upload a ZIP file"); return; }

      const jszip = new JSZip();
      const arrayBuffer = await fileInput.arrayBuffer();
      const zip = await jszip.loadAsync(arrayBuffer);
      const pdfDoc = await PDFLib.PDFDocument.create();

      for (let filename in zip.files) {
        const file = zip.files[filename];
        if (!file.dir) {
          const content = await file.async("string");
          const page = pdfDoc.addPage();
          page.drawText(`${filename}\n\n${content}`, { x: 50, y: 700, size: 12 });
        }
      }

      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "converted.zip.pdf");
    }

    // ---------------- PDF to PPT -----------------
    async function convertPdfToPpt() {
      const fileInput = document.getElementById('pdfToPptFile').files[0];
      if (!fileInput) { alert("Please upload a PDF"); return; }

      const arrayBuffer = await fileInput.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      const pptx = new PptxGenJS();

      const pages = pdfDoc.getPages();
      pages.forEach((page, i) => {
        let slide = pptx.addSlide();
        slide.addText(`Page ${i+1} from PDF`, { x:1, y:1, fontSize:18 });
      });

      pptx.writeFile("converted.pdf.pptx");
    }

    // ---------------- PPT to PDF -----------------
    async function convertPptToPdf() {
      const fileInput = document.getElementById('pptToPdfFile').files[0];
      if (!fileInput) { alert("Please upload a PPT/PPTX file"); return; }

      const pdfDoc = await PDFLib.PDFDocument.create();
      const page = pdfDoc.addPage();
      page.drawText(`Converted PPT File:\n${fileInput.name}`, { x: 50, y: 700, size: 16 });

      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "converted.ppt.pdf");
    }

    // ---------------- Word to PDF -----------------
    async function convertWordToPdf() {
      const fileInput = document.getElementById('wordToPdfFile').files[0];
      if (!fileInput) { alert("Please upload a DOC/DOCX file"); return; }

      const pdfDoc = await PDFLib.PDFDocument.create();
      const page = pdfDoc.addPage();
      page.drawText(`Converted Word File:\n${fileInput.name}`, { x: 50, y: 700, size: 16 });

      const pdfBytes = await pdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "converted.doc.pdf");
    }


// PNG → JPEG
function convertPngToJpeg() {
  const fileInput = document.getElementById("pngFile");
  if (!fileInput.files.length) return alert("Please select a PNG file.");

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        blob => saveAs(blob, file.name.replace(/\.png$/i, ".jpg")),
        "image/jpeg",
        0.9
      );
    };
    img.src = e.target.result; // Base64 ensures no CORS
  };
  reader.readAsDataURL(file);
}

// JPEG → PNG
function convertJpegToPng() {
  const fileInput = document.getElementById("jpegFile");
  if (!fileInput.files.length) return alert("Please select a JPEG file.");

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        blob => saveAs(blob, file.name.replace(/\.(jpg|jpeg)$/i, ".png")),
        "image/png"
      );
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
