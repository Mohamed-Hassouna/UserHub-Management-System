import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  userId: string;
  subscription: Subscription;
  isEdit: boolean = false;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) { }

  userForm: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getById(+this.userId).subscribe(
        (res) => {
          this.userForm.patchValue(res);
          this.isEdit = true;
        }
      )
    }
  }

  initializeForm() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['', Validators.required]
    })
  }
  onSubmit(): void {
    if (this.isEdit) {
      const userFormData = this.userForm.value;
      this.userService.update(userFormData).subscribe(
        (res) => {
          console.log('selectedUser', res);
          this.router.navigate(['users/list']);
        },
        (error) => {
          console.error('error', error);
        }
      )
    } else {
      const userFormData = this.userForm.value;
      this.userService.create(userFormData).subscribe(
        (res) => {
          console.log('sucess', res);
          this.router.navigate(['users/list']);

        },
        (error) => {
          console.error('error', error);
        }
      )
    }
  }

  back(): void {
    this.router.navigate(['users/list']);
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }


}