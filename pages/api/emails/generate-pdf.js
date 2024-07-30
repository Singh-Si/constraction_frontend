import { NextResponse } from "next/server";
import { PDFDocument , rgb } from "pdf-lib";


export async function POST(req){

const data = await req.json();
const {products} = data 

const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([600, 400]);
const { width, height } = page.getSize();

page.drawText('PO ID', { x: 50, y: height - 50, size: 12, color: rgb(0, 0, 1) });
page.drawText('Indent ID', { x: 150, y: height - 50, size: 12, color: rgb(0, 0, 1) });
page.drawText('Site', { x: 250, y: height - 50, size: 12, color: rgb(0, 0, 1) });
page.drawText('Vendor', { x: 350, y: height - 50, size: 12, color: rgb(0, 0, 1) });
page.drawText('Created On', { x: 450, y: height - 50, size: 12, color: rgb(0, 0, 1) });
page.drawText('Created By', { x: 550, y: height - 50, size: 12, color: rgb(0, 0, 1) });
page.drawText('Expected Delivery Date', { x: 650, y: height - 50, size: 12, color: rgb(0, 0, 1) })

products.forEach(product => {
    page.drawText(product.poId, { x: 50, y: yPosition, size: 10 });
    page.drawText(product.indentId, { x: 150, y: yPosition, size: 10 });
    page.drawText(product.site, { x: 250, y: yPosition, size: 10 });
    page.drawText(product.vendor, { x: 350, y: yPosition, size: 10 });
    page.drawText(product.createdOn, { x: 450, y: yPosition, size: 10 });
    page.drawText(product.createdBy, { x: 550, y: yPosition, size: 10 });
    page.drawText(product.deliveryDate, { x: 650, y: yPosition, size: 10 });
    yPosition -= 20;
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="table.pdf"',
    },
  });
}
