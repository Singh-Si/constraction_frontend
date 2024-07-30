import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React from 'react'

export const ExportTableToPdf = (tableId) => {
    const table = document.getElementById(tableId)
    html2canvas(table).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const pageHeight = 295; 
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        pdf.save('table.pdf');
      });
    };
  

