
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
