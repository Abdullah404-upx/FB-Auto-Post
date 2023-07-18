
import { ImageAPI } from './ImageAPI'

import {config} from 'dotenv' //? why it can't read env?
config()


export class Pixabay implements ImageAPI {



    getApiUrl(): string {
        return `https://pixabay.com/api/?key=${process.env.PEXAKEY}&q=landscape&image_type=photo&per_page=100&page=${randomPage(1, 7)}`
    }

    getImageURL(results: any[]): string {
        
        let img: { webformatURL: string; webformatWidth: number; webformatHeight: number; tags: string };
        

        do {

            img = results[Math.floor(Math.random() * results.length -1)]
            console.log('test')
        } while (!(img.webformatWidth >= 600 && img.webformatHeight >= 359 && !unfilteredTags(img.tags.split(', '))))

        console.log(img.tags) // temp: watch tags for more filter
        return img.webformatURL;

    }
    
    readonly options = {}
}



const unfilteredTags = (tags: string[]): boolean => {
    let toBeFiltered = [ 'vechile', 'person', 'bird','woman', 'couples', 'couple', 'young', 'people', 'sport', 'buildings', 'man', 'girl', 'city', 'together', 'boy', 'france', 'italy', 'trekking', 'juggler', 'meditate']
    return tags.some(el => toBeFiltered.includes(el))
}

function randomPage(min: number, max: number): number { // api pagination
    return Math.floor(Math.random() * (max - min) + min);
}




// const randomElelment = (arr: [])=> { return arr[Math.floor(Math.random() * arr.length - 1)] }

// `https://pixabay.com/api/?key=${process.env.PEXAKEY}&q=landscape&image_type=photo&per_page=100&page=${randomPage(1, 7)}`