import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class UserPdfService {
  generatePdf(users: any[]): void {
    const pdf = new jsPDF();
    const pageHeight = 280;

    // Set document properties
    pdf.setProperties({
      title: 'User Report',
      subject: 'List of Users',
      // author: 'Your Name',
    });

    // Set font
    pdf.setFont('Arial', 'normal');

    // Add content to the PDF
    pdf.text('User Report', 20, 10);
    pdf.setFontSize(12);

    // Iterate over users and add them to the PDF
    let yOffset = 20;
    users.forEach((user) => {
      if (yOffset + 50 > pageHeight) {
        pdf.addPage();
        yOffset = 20;
      }
      pdf.text(`User ID: ${user.id}`, 20, yOffset);
      pdf.text(`Name: ${user.name}`, 20, yOffset + 10);
      pdf.text(`eMail: ${user.email}`, 20, yOffset + 20);
      pdf.text(`Role: ${user.role}`, 20, yOffset + 30);
      pdf.text('---------------------------', 20, yOffset + 40);

      yOffset += 50; // Adjust the vertical offset
    });

    // Save the PDF
    pdf.save('user_report.pdf');
  }

}
