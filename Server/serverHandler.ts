
import { Request, Response, NextFunction } from 'express'
import { Code } from '../resources/Code'
import { getRecoveryCodes } from '../other functions/getRecoveryCode'
import { postAyah, Ayah } from '../Poster';
import { replaceImage } from '../other functions/replaceImage';



// const Hanlder = (fn: Function) =>{
//     return (req: Request, res: Response)=> {fn()}
// }


export  const HomePageRespnse = (req: Request, res: Response) =>  res.send("Auto-poster is on..."); 

export const postVerse =  (req: Request, res: Response) => {
    postAyah();
    res.json({ ok: "posting......." });
};


export const backupVerses = (req: Request, res: Response) =>{
     Ayah.saveAyats(); 
     res.json(Ayah.getAllAyats()); 
}

export const getCodes = async (req: Request, res: Response)=>{
    res.json({ data: await Code.find() }) 
}

export const getRecoveryCode = (req: Request, res: Response)=>{
    getRecoveryCodes();
    res.json({ OK: 'recovering codes...' }) 
}


export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.xpx != process.env.XPX) return res.json("unauthorized");
    next();
};

export const _replaceImage = (req: Request, res: Response)=>{

    const postUrl = req.query.postURL as string;
    //console.log(postUrl);
    replaceImage(postUrl)
    res.json({ OK: 'replacing images....' }) 
}


