import { Component, OnInit } from '@angular/core';
import {Parse} from "../app.parse";
import {Router} from "@angular/router";
import {OrderBy} from '../_helpers/parseOrderBy';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})
export class AdminlistComponent implements OnInit {
  parse;
  router;
  landmarks=[];
  public selectOrderField = 'order';
  public selectOrderDirection = '';


  constructor(parse: Parse, router: Router, title: Title) {
    this.router = router;
    this.parse = parse.parse;
    title.setTitle('Choose Landmark for edit');
  }

  ngOnInit(): void {
    const Landmark = this.parse.Object.extend("dubailandmarks");
    const query = new this.parse.Query(Landmark);
    query.find().then(
        (results)=>{
          this.landmarks=results;
          /*for (let i = 0; i < results.length; i++) {
            let object = results[i];
            console.log(object.id + ' - ' + object.get('title'));
          }*/
        },
        (failure)=>{
          console.log(failure);
        }

    );
  }
  getMeToThis(land){
    this.router.navigate(['/admin/edit/'+land.id+'/'+land.get('title')]);
  }


}
