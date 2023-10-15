import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  studentId: string;
  studentDetails: Student; // Assurez-vous d'avoir un modèle Student approprié
  studentForm: FormGroup;
    @Input() student: Student;

          
  constructor(private route: ActivatedRoute) {
  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
    this.studentId = id;
    // Vous pouvez maintenant utiliser this.studentId en toute sécurité.
  } else {
    // Gérez le cas où id est null, par exemple en redirigeant l'utilisateur ou en affichant un message d'erreur.
  }
}

  ngOnInit() {
    this.student = { id: '',firstName: '', lastName: '' }; // Initialisez student avec des valeurs par défaut

  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
    this.studentId = id;
    // Maintenant, vous pouvez utiliser this.studentId en toute sécurité.
  } else {
    // Gérez le cas où id est null (par exemple, redirigez l'utilisateur ou affichez un message d'erreur)
  }
}


      
  

  
updateStudent() {
     if (this.studentForm.valid) {
      const updatedStudent: Student = this.studentForm.value;
      // Utilisez ce code pour mettre à jour l'étudiant avec les valeurs de updatedStudent
      // Assurez-vous d'avoir une méthode de mise à jour dans votre service
    }
  
  }
  

}
