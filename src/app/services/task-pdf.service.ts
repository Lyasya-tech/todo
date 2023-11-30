import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class TaskPdfService {
  generatePdf(tasks: any[]): void {
    const pdf = new jsPDF();
    const pageHeight = 280;
    const imageURL = 'assets/images/logo.png'
    ;

    // console.log(pdf.getFontList());

    // Set document properties
    pdf.setProperties({
      title: 'Task Report',
      subject: 'List of Tasks',
      // author: 'Your Name',
    });

    // Set font
    pdf.setFont('Courier', '');

    // Add content to the PDF
    pdf.text('Task Report', 20, 10);
    pdf.setFontSize(12);
    pdf.addImage(imageURL, 'PNG', 180, 5, 15, 15);

    // Iterate over tasks and add them to the PDF
    let yOffset = 20;
    tasks.forEach((task) => {
      if (yOffset + 50 > pageHeight) {
        pdf.addPage();
        yOffset = 20;
      }
      pdf.text(`Task ID: ${task.id}`, 20, yOffset);
      pdf.text(`Description: ${task.description}`, 20, yOffset + 10);
      pdf.text(`Due Date: ${task.dueDate}`, 20, yOffset + 20);
      pdf.text(`Status: ${task.status}`, 20, yOffset + 30);
      pdf.text('---------------------------', 20, yOffset + 40);

      yOffset += 50;
    });

    // Save the PDF
    pdf.save('task_report.pdf');
  }

}
