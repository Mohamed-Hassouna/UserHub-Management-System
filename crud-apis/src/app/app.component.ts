import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-apis';
  constructor(private router: Router) {}

  ngOnInit() {
    // Programmatically navigate to the 'list' route within the UsersModule
    this.router.navigate(['/users/list']);

  }
}
