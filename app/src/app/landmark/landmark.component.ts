import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Title }     from '@angular/platform-browser';
import {Parse} from "../app.parse";
import {AgmMap} from "@agm/core";

@Component({
  selector: 'app-landmark',
  templateUrl: './landmark.component.html',
  styleUrls: ['./landmark.component.css']
})
export class LandmarkComponent implements OnInit {
    @ViewChild(AgmMap) agmMap: AgmMap;
  //url params
  landmarkId: String;
  landmarkTitle: String;
  //Parse and data related
  private parse;
  public landmark;
  public title: string;
  public short_info: string;
  public description: string;
  public urls: string;
  public location = [0,0];
  public createdAt;
  public lastUpdate;
  public photoUrl;
  public thumbnailUrl;
  //google maps related
    // google maps zoom level
    zoom: number = 8;

  constructor(private route: ActivatedRoute, title: Title, parse: Parse) {
    this.parse = parse.parse;
    title.setTitle('Landmark '+this.route.snapshot.paramMap.get("landmarkTitle"));
    this.landmarkId = this.route.snapshot.paramMap.get("landmarkId");
    this.landmarkTitle = this.route.snapshot.paramMap.get("landmarkTitle");
      this.fetchLandmark().then(
          (success)=>{this.agmMap.triggerResize(true);}
      );

  }

  ngOnInit(): void {


  }

  private async fetchLandmark(){
    const Landmark = this.parse.Object.extend("dubailandmarks");
    const query = new this.parse.Query(Landmark);

    query.equalTo("objectId",this.route.snapshot.paramMap.get("landmarkId"));
    await query.first().then(
        (result)=>{
          this.landmark=result;
          this.title=result.get('title');
          this.short_info=result.get('short_info');
          this.description=result.get('description');
          this.urls=result.get('url');
          this.location=result.get('location');
          this.createdAt = result.get('createdAt');
          this.lastUpdate = result.get('updatedAt');
          if(result.get('photo')){
            this.photoUrl=result.get('photo').url();
          } else {
            this.photoUrl = 'http://localhost:4200/assets/noimage240.png';
          }
          if(result.get('photo_thumb')){
            this.thumbnailUrl=result.get('photo_thumb').url();
          }else{
            this.thumbnailUrl = 'http://localhost:4200/assets/noimage240.png';
          }
        },
        (failure)=>{
          console.log(failure);
        }

    ).catch((error)=>{console.log(error)});
  }
}
