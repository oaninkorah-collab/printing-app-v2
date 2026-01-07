import html2pdf from "html2pdf.js";

export function downloadReceiptPdf() {
  const element = document.getElementById("receipt");
  if (!element) return;

  const opt = {
    margin: 0,
    filename: "receipt.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
}
