
import { createWriteStream, unlink } from 'fs'
//import {join} from 'path'
import axios from 'axios'
import { ImageAPI } from './API/ImageAPI'
import { Pixabay } from './API/Pixabay'
import { Pexels } from './API/Pexels'
import { Unsplash } from './API/Unsplash'


export class Image {


    private APIs: ImageAPI[] = [new Pixabay(), new Unsplash(), new Pexels()]
    private apiINDEX: number;
    private results: any[];
    imagePath: string = 'nature.jpg'

    constructor() {
        this.apiINDEX = 0 //Math.floor(Math.random() * this.APIs.length -1)
        this.requestImages()
    }


    async downloadRandomImage() {
        const imgURL = this.APIs[this.apiINDEX].getImageURL(this.results)
        const response = await axios({
            url: imgURL,
            method: 'GET',
            responseType: 'stream'
        });

        // Property 'pipe' does not exist on type 'never'
        (response.data as any).pipe(createWriteStream(this.imagePath)) // fix:..?
    }

    deleteImage() {
        unlink(this.imagePath, () => { console.log('imaged deleted'); })
    }

    requestImages() {
        let apiURL = this.APIs[this.apiINDEX].getApiUrl()
        let options = this.APIs[this.apiINDEX].options

        axios(apiURL, options).
            then(res => { this.results = res.data; this.extractArr() })
            .catch(err => {
                console.log(err.message, 'heloo...');
            })
    }

    private extractArr() {
        // the results retured from an api could be an arry or object..if object, it just has the real imags array in it..so you extract this 
        //return this.results = (this.results as any).hits;

        let x = (this.results as any)
        let temp;
        if (!Array.isArray(this.results)) {
            if (x.hits) temp = x.hits
            else if (x.results) temp = x.results
            else if (x.photos) temp = x.photos
            else temp = this.results;


            return this.results = temp;
        }

    }

}





