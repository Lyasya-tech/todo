import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
    providedIn: 'root'
  })
  export class AssignmentPdfService {
    generatePdf(assignment: any[]): void {
      const pdf = new jsPDF();
      const pageHeight = 280;

    pdf.setProperties({
    title: 'Assignment Report',
    subject: 'List of Assignments',
        
    });

    pdf.setFont('Arial', 'normal');

    pdf.text('Assignment Report', 20, 10);
    pdf.setFontSize(12);

    
    let yOffset = 20;
    assignment.forEach((assignment) => {
      if (yOffset + 50 > pageHeight) {
        pdf.addPage();
        yOffset = 20;
      }
      
      pdf.text(`Assignment ID: ${assignment.id}`, 20, yOffset);
      pdf.text(`User ID: ${assignment.userId}`, 20, yOffset + 10);
      pdf.text(`Task ID: ${assignment.taskId}`, 20, yOffset + 20);
      pdf.text(`Timestamp: ${assignment.timestamp}`, 20, yOffset + 30);
      pdf.text('---------------------------', 20, yOffset + 40);

      yOffset += 50; 
    });

    
    pdf.save('assignment_report.pdf');
    }
  }