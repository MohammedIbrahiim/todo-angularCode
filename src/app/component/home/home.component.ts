import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from './../../interface/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  tasks:Task[]=[]
  updatedid :number = 0 
  isEdit:boolean = false // for making toggle button name (add or update)

  ngOnInit(): void {
    // to display my tasks when iam doing refresh
    if(localStorage.getItem('tasks') == null){
      this.tasks.map((item)=>{
        return item.iscompleted = false
      })
        this.tasks
    }else{
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    }
  }

  todo:FormGroup = new FormGroup ({
    todos:new FormControl(null)
  })

  //add tasks
  add(tasks:FormGroup){
    if(this.todo.get('todos')?.value !=null && this.todo.get('todos')?.value != '') {
      this.tasks.push(tasks.value)
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
        alert('please insert yout tasks')
    }
  this.todo.reset()
}

//delete tasks
  delete(id:number){
    this.tasks.splice(id,1)
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  //edit task
  edit(id:number){
    this.todo.get('todos')?.setValue(this.tasks[id].todos)
    this.isEdit = true
    this.updatedid = id
  }

  //updated task
  update(){
    this.tasks[this.updatedid].todos = this.todo.value.todos
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.todo.reset()
    this.isEdit = false
  }

  //after completed task when click style where change
  isDone(id:number){
    this.tasks[id].iscompleted = !this.tasks[id].iscompleted
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
