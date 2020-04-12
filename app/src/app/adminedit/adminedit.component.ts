import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Parse } from "../app.parse";

@Component({
  selector: 'app-adminedit',
  templateUrl: './adminedit.component.html',
  styleUrls: ['./adminedit.component.css']
})
export class AdmineditComponent implements OnInit {
  parse;
  landmark;
  public title: string;
  public short_info: string;
  public description: string;
  public urls: string;
  public location = [0,0];
  public file;
  public bigFile = false;
  private photo;
  public photoUrl;
  private thumbnail;
  public thumbnailUrl;
  public saveSuccessClosed = true;
  @ViewChild('photoform') photoform: ElementRef;



    constructor(private route: ActivatedRoute, title: Title, parse: Parse) {
    this.parse = parse.parse;
    title.setTitle('Edit '+this.route.snapshot.paramMap.get("landmarkTitle")+' landmark');

  }

  ngOnInit(): void {
    console.log('Admin edit started');
    this.fetchLandmark().then(
        (success)=>{console.log('fetched');}
    );
  }

  private saveSuccess(){
      this.saveSuccessClosed = false;
      setTimeout(() => this.saveSuccessClosed = true, 10000);
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
            if(result.get('photo')) this.photoUrl=result.get('photo').url();
          if(result.get('photo_thumb')) this.thumbnailUrl=result.get('photo_thumb').url();
          console.log(this.thumbnailUrl, this.photoUrl);
          //try{this.thumbnailUrl=result.get('thumbnail').url();}catch(e){}


        },
        (failure)=>{
          console.log(failure);
        }

    ).catch((error)=>{console.log(error)});
  }

  public async onSubmit(){
    console.log('save');

    //Save file
    if(typeof this.file!=='undefined'){
        if(this.file.length>0){
            console.log('we have a file!!');
            this.photo = new this.parse.File(this.file[0].name.replace(/[^a-zA-Z0-9-_]/g, ''), this.file[0]);
            console.log(this.photo);
        }
    }

    if(this.landmark.get('title') !== this.title){
         this.landmark.set('title',this.title);
    }
    if(this.landmark.get('description') !== this.description){
        this.landmark.set('description',this.description);
    }
    if(this.landmark.get('short_info') !== this.short_info){
      this.landmark.set('short_info',this.short_info);
    }
    if(this.landmark.get('url') !== this.urls){
      this.landmark.set('url',this.urls);
    }
    if(this.landmark.get('location') !== this.location){
      this.landmark.set('location',this.location);
    }

    if(this.photo){
        this.landmark.set('photo',this.photo);
    }
    this.landmark.save().then(
        (landmark)=>{
          console.log('Save successful.',landmark);
          this.saveSuccess();
        },
        (failure)=>{
          console.log('Save failed',failure);
        }
    ).catch((e)=>{console.log(e);})

  }

  handleFileInput(f){
        console.log(f);
      if(f[0].size >= 5242880){
          this.file = '';
          this.photoform.nativeElement.value = '';
          this.bigFile=true;
      }else{
          this.file = f;
      }

  }

}
