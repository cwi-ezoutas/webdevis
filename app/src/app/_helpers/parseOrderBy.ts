import {Pipe, PipeTransform} from '@angular/core';


//Activate live inform on change
@Pipe({name: 'orderBy', pure: true})

export class OrderBy implements PipeTransform {
    transform(array: any, field: string): any[] {
        //Check if array
        if (!Array.isArray(array)) {
            return;
        }
        //Check if we go for asc or desc
        let asc = true;
        if(field.substring(0,1)==='-'){
            asc = false;
            //remove first char
            field = field.substr(1);
        }

        if(asc){
            array.sort((a: any, b: any) => {
                if (a.get(field) < b.get(field)) {
                    return -1;
                } else if (a.get(field) > b.get(field)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }else{
            array.sort((a: any, b: any) => {
                if (a.get(field) < b.get(field)) {
                    return 1;
                } else if (a.get(field) > b.get(field)) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }

        return array;
    }


}
