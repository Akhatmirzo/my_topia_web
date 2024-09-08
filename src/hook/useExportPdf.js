import { useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function useExportPdf() {
  const handleExport = useCallback((orderRef) => {
    console.log("hello");
    const input = orderRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",   // Portret (tik) yo'nalishi
        unit: "mm",         // Millimetr o'lchovi
        format: [80, canvas.height * 80 / canvas.width], // 58mm kenglik, uzunlikni cheksiz qiling (2000mm yoki kerakli qiymat)
      });

      // const imgWidth = 80; // PDFning kengligi millimetrda
      // const pageHeight = 300; // PDFning balandligi millimetrda
      // const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // let heightLeft = imgHeight;
      // let position = 0;
      // pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

      // heightLeft -= pageHeight;

      // while (heightLeft >= 0) {
      //   position = heightLeft - imgHeight;
      //   pdf.addPage();
      //   pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      //   heightLeft -= pageHeight;
      // }
      pdf.addImage(imgData, "PNG", 0, 0, 80, (canvas.height * 80) / canvas.width);
      pdf.save("order.pdf");
    });
  }, []);

  return handleExport;
}
