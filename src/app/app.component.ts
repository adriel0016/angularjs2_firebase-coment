import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

import 'material-design-lite/material.min';
import '../../public/css/styles.css';
import '../../public/css/material.green-amber.min.css';
import '../../public/css/freelancer.css';
import '../../public/css/section.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: FirebaseListObservable<any[]>;
  user: any;

  constructor(private af: AngularFire) {}
  // constructor() {
  //    require.ensure(['path/to/your/module'], require => {
  //       let yourModule = require('path/to/your/module');
  //       yourModule.someFunction();
  //    });
  // }

  ngOnInit() {
    this.items = this.af.database.list('/courses', {
      query: {
        orderByChild: 'date_coment'
      }
    }).map(items => {
      items.sort((a: any, b: any) => {
        return a.date_coment > b.date_coment;
      });
      return items.reverse();
    }) as FirebaseListObservable<any[]>;

    this.af.auth.subscribe(user => {
      this.user = user;
    });
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
  }

  create(e: any, value: string, id: string) {
    e.preventDefault();
    let data = {
      discussao: id,
      desc: value,
      autor: this.user.auth.displayName,
      email: this.user.auth.email,
      photoURL: this.user.auth.photoURL,
      date_coment: Date.now(),
      votes: 0
    };
    this.items.push(data);
  }

  update(key :string) {
    let obj = this.af.database.object('/courses/' + key);
    obj.$ref.transaction(item => {
      let emails = item.users || [];
      if (emails.indexOf(this.user.auth.email) >= 0) {
        return;
      }

      let total: number = item.votes || 0;
      total ++;
      emails.push(this.user.auth.email);
      this.items.update(key, {votes: total, users_votes: emails})
    })
  }

  remove(key :string) {
      this.items.remove(key);
  }
}
