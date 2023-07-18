import { ImageAPI } from './ImageAPI'

export class Pexels implements ImageAPI{

  
    getApiUrl(): string {
        return "https://api.pexels.com/v1/search?query=nature&page=5&per_page=80"
    }
    getImageURL(imgs: any[]): string {
        
       return imgs[Math.floor(Math.random() * imgs.length -1)].src.large
    }

    readonly options = {
        headers: {
          Authorization: "563492ad6f91700001000001d2f3589ba9a24087958dca13d287c722"
        }
    }

    
}

// key = 563492ad6f91700001000001d2f3589ba9a24087958dca13d287c722

