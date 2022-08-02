import { state } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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
    private userService: UserService,
    private router: Router) { }

  @ViewChild(MatSidenav) sidenav: MatSidenav | undefined;

  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 720px)']).subscribe((state: BreakpointState) => {
      this.isScreenSmall = state.matches;
    });

    this.users = this.userService.users;
    this.userService.loadAll();

  //   this.users.subscribe(data => {
  //     if(data.length > 0) {
  //       this.router.navigate(['/contactmanager', data[0].id]);
  //     }
  // });

  this.router.events.subscribe(() => {
    if(this.isScreenSmall){
      this.breakpointObserver.observe(['(min-width: 720px)']).subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
    }
  });
}
}
