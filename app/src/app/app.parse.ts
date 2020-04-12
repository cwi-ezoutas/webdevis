import {Injectable} from '@angular/core';
let ParseLibrary = require('parse');

@Injectable()
export class Parse {
    parse;

    constructor(){
        this.parse = ParseLibrary;
    }

    init() {
        return this.parse;
    }
}
