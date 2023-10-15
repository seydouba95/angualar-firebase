import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  studentsList: Student[] = [];
  studentForm: FormGroup;
  p: number = 1;

  isEditing = false;
  constructor(private data: DataService, private fb: FormBuilder,
  private router: Router) { 
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['',Validators.required]

    });
  }

  ngOnInit(): void {
    //this.getStudents();
    this.getAllStudents();
  }

  //ajout etudiant
  onSubmit() {
    
    if (this.studentForm.valid) {

      const newStudent = this.studentForm.value;
      
      this.data.addStudent(newStudent).then(() => {
        console.log('Student added Successfully');

      // Réinitialisez les champs du formulaire et l'URL de l'image
        this.studentForm.reset();

      }).catch((error) => {
        console.error('Error adding student', error);
      });

      
    }
  }

  // List of Students valuechange
  getStudents() {
    this.data.getAllStudents().subscribe((data) => {
      this.studentsList = data;
    }, (err) => {
      console.log('Error while fetching student data');
    });
  }

  //get all students snapshotchanges
  getAllStudents() {
    this.data.getStudents().subscribe((data) => {
      this.studentsList = data.map((item : any) => {
        const student = item.payload.doc.data() as Student;
        console.log(item.payload.doc);
      student.id = item.payload.doc.id; // Ajoutez l'ID du document
      return student;
    });
    }, (err) => {
      console.log('Error while fetching student data');
    });
  }

  //delete student
  deleteStudent(student: Student) {
  if (window.confirm('Are you sure you want to delete ' + student.firstName + ' ' + student.lastName + ' ?')) {
    this.data.deleteStudent(student);
  }
  }
  
  //delete student 2
  deleteStudentother(studentId: string, student: Student) {
  
    if (window.confirm('Are you sure you want to delete ' + student.firstName + ' ' + student.lastName + ' ?')) {
      this.data.deletestudentother(studentId).then(() => {
        console.log('Student deleted Successfully');
      }).catch((error) => {
        console.error('Error deleting student', error);
      });
    }
  }


  //update student 
  updateStudent(student: Student) {
    const studentId = student.id;
    this.router.navigate(['/update-student', studentId]);
  }

}
