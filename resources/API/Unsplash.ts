import { ImageAPI } from './ImageAPI'

import {config} from 'dotenv' //? why it can't read env?
config()


export class Unsplash implements ImageAPI{
    
    getApiUrl(): string {
        return `https://api.unsplash.com/search/photos?client_id=8bCNe1jYTVmUepCxFYPPwpdwdKEdoryskKuvM0CDi8w&query=nature&page=${random(50)}&per_page=30`
    }
    getImageURL(imgs: any[]): string {
        let imgUrl = imgs[random(imgs.length)].urls.regular
         return imgUrl
    }

    readonly options = {}

}

const random = (length: number)=> Math.floor(Math.random() * length -1)


// https://api.unsplash.com/search/photos?client_id=8bCNe1jYTVmUepCxFYPPwpdwdKEdoryskKuvM0CDi8w&query=nature&page=111&per_page=15&orientation=squarish(landscape and portratir)
