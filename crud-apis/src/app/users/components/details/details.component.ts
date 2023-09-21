import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommuncationService } from 'src/app/shared/serivces/communcation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selectedUser!: User;
  isOpen: boolean = false;
  constructor(private communicate: CommuncationService) { }

  ngOnInit(): void {
    this.communicate.getListener().subscribe(
      (res) => {
        this.selectedUser = res;
      }
    )
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
