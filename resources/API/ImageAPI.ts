
export interface ImageAPI{
    getApiUrl(): string
    getImageURL(imgs: any[]): string;
    options: {} // authorization
}