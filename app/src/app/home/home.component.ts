import { Component, OnInit } from '@angular/core';
import {Parse} from "../app.parse";
import { Title } from '@angular/platform-browser';
import {OrderBy} from '../_helpers/parseOrderBy';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  title = 'Home';
  parse;
  public landmarks = [];
  public landmarksArray = [];

  public selectOrderField = 'order';
  public selectOrderDirection = '';

  public showModal: boolean;
  public modalUrl: string;


  constructor(parse: Parse, title: Title) {
    this.parse = parse.parse;
    title.setTitle('Home');
  }

  ngOnInit(): void {
    const Landmark = this.parse.Object.extend("dubailandmarks");
    const query = new this.parse.Query(Landmark);
    query.find().then(
        (results) => {
          console.log(results);
          this.landmarks = results;
          /*for (let i = 0; i < results.length; i++) {
            let object = results[i];
            console.log(object.id + ' - ' + object.get('title'));
          }*/
        },
        (failure) => {
          console.log(failure);
        }
    );
  }

  //Show image modal
  show(modalUrl) {
    this.showModal = true;
    this.modalUrl = modalUrl;
  }

  //Close image modal
  hide() {
    this.showModal = false;
  }
}
