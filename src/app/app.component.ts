import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from './services.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms';

  userForm: FormGroup;
  students: any[] = [];
  alldata: any;
  ids: any;
  updatedData: any;
  selectedStudentId: any;
  isEditMode: boolean = false;
  subject: any;
  message: any;
  filteredStudents: any[] = [];
  searchControl = this.fb.control('');
  isLoading: boolean=false;

  constructor( private fb: FormBuilder, private http: HttpClient, private service: ServicesService,) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      searchname: ['']
    });
  }
 

  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditMode && this.ids) {

        this.service.updateData(this.ids, this.userForm.value).subscribe((data: any) => {
          alert('Data updated successfully');
          this.getData()
          this.resetForm();


        });
      } else {
        this.service.postData(this.userForm.value).subscribe((data: any) => {
          alert('data saved successfully')
          // this.toastr.success('Data saved successfully!', 'Success');
          console.log(data)
          this.getData()
          this.userForm.reset();
        })
      }
    }

  }

  // getData() {
  //   this.isLoading = true;
  //   this.service.getData().subscribe((student: any) => {
  //     this.students = student?.data

  //   })
  // }

  getData() {
    this.isLoading = true; // Show loader
    setTimeout(() => {
      this.service.getData().subscribe((student: any) => {
        this.students = student?.data;
        this.isLoading = false; // Hide loader after data is fetched
      });
    }, 1000); // Simulate 1 second delay
  }


  deleteData(id: any) {
    this.service.deleteData(id).subscribe((data) => {
      alert("record deleted successfully")
      this.getData()

    })
  }

  updateData(id: any, student: any) {
    this.isEditMode = true;
    this.ids = id;
    console.log(id)
    this.userForm.patchValue({
      name: student.name,
      email: student.email,
      password: student.password,
    });

  }

  resetForm() {
    this.userForm.reset();
    this.ids = null; // Clear the selected student ID
    this.isEditMode = false; // Switch back to save mode
    this.getData(); // Refresh the student list
  }

 
  searchNow() {
    const name = this.userForm.get('searchname')?.value;
    if (name) {
      this.service.searchNow(name).subscribe((data) => {
        this.students = data?.data;
      },
      (error) => {
        console.error('Error fetching student data', error);
      });
    } else {
      // If no search query, fetch all students
      this.getData();
    }
  }
sendMail() {

  this.service.sendMail(this.userForm.value).subscribe({
      next: (response) => {
        console.log('Email sent successfully', response);
      },
      error: (error) => {
        console.error('Error sending email', error);
      }
    });
    alert("Email send secessfull")
}

}

