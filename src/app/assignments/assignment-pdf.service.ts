import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
    providedIn: 'root'
  })
  export class AssignmentPdfService {
    users: any;
    tasks: any;
    generatePdf(assignment: any[],
                users: any[],
                tasks: any[]): void {
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
      
      const userId = +assignment.userId;       
      const taskId = +assignment.taskId;       
      
      const user = users.find((user) => user.id === userId);       
      const task = tasks.find((task) => task.id === taskId);       

      pdf.text(`Assignment ID: ${assignment.id}`, 20, yOffset);
      pdf.text(`User ID: ${assignment.userId}`, 20, yOffset + 10);
      pdf.text(`User Name: ${user ? user.name : 'Unknown User'}`, 20, yOffset + 20);
      pdf.text(`Task ID: ${assignment.taskId}`, 20, yOffset + 30);       
      pdf.text(`Task Description: ${task ? task.description : 'Unknown Task'}`, 20, yOffset + 40);       
      pdf.text(`Timestamp: ${assignment.timestamp}`, 20, yOffset + 50);       
      pdf.text('---------------------------', 20, yOffset + 60);
     
      yOffset += 70; 
    });

    

    pdf.save('assignment_report.pdf');
    }
  }