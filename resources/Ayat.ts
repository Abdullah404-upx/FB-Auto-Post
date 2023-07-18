import fs from 'fs'

import ayats from "../data/aayats.json"

interface AyahType {
    surah: string;
    ayah_number: number;
    content: string;
}

class Ayat {

    private INDEX: number;
    private ayah: AyahType;
    private ayats: object[];

    constructor() {
        this.INDEX = -1
        this.ayats = ayats;
    }

    getAyah() {

        do {
            this.ayah = this.ayats[this.getIndex()] as AyahType
            this.dropAyah()
        } while (!(this.ayah.content.length > 5))

        return this.ayahFromatted();
    };
    saveAyats() {
        fs.writeFileSync(`${__dirname}/../data/ayas.json`, JSON.stringify(this.ayats))
    }
    getAllAyats() { return this.ayats; }



    private ayahFromatted(ayah = this.ayah) {
        return `${ayah.content} \n\n ------\n📖${ayah.surah} ( ${ayah.ayah_number} )`
    }
    private getIndex() {
        return (this.INDEX = Math.floor(Math.random() * this.ayats.length - 1));
    };

    private dropAyah = () => this.ayats = ayats.filter((el: object, index: number) => index != this.INDEX);


}

export { Ayat }
