import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  _courseList:course[] = [];
  _student:student = {"id": 0, "name": '', "courseid":'', "coursename":''};
  _studentlist:student[] = [];
  uniquekey:number = 0;


  constructor() { }

  ngOnInit(): void {
    this.getcourses();
    this._student = new student();
  }

  onchange(){
    console.log(this._courseList);
  }
  onsubmit(){
    this._student.courseid = this._courseList.filter(x => x.isselected == true).map(x=>x.id).join(',').toString();
    this._student.coursename = this._courseList.filter(x=>x.isselected == true).map(x => x.name).join(',').toString();
    this.uniquekey = this.uniquekey + 1;
    this._student.id = this.uniquekey;
    this._studentlist.push(this._student);
    
    this._student = new student();
    this.getcourses();
  
  } 
  getcourses(){
    this._courseList =[
      {id:1, name: "C#", isselected:false},
      {id:2, name: "ASP.NET", isselected:false},
      {id:3, name: "SQL", isselected:false},
      {id:4, name: "MVC", isselected:false},
      {id:5, name: "JQUERY", isselected:false},
      {id:6, name: "ANGULAR", isselected:false}
    ]
  }

}
class course{
  id: number = 0;
  name: string = '';
  isselected: boolean = false;
}

class student{
   id: number = 0;
   name: string = '';
   courseid: string = '';
   coursename: string = '';

}
