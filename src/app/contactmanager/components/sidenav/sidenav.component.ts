import { state } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean = false;

  users: Observable<User[]> | undefined;

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 720px)']).subscribe((state: BreakpointState) => {
      this.isScreenSmall = state.matches;
    });

    this.users = this.userService.users;
    this.userService.loadAll();

    this.users.subscribe(data => {
      console.log(data);
  });
}
}
