import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  collapsed = true;

  onTasks(){
    console.log('on Tasks');
  }

  onUsers(){
    console.log('on Users');
  }
}
