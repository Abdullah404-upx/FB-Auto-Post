
import { getRecoveryCodes } from "../other functions/getRecoveryCode";
import { connectDB } from "./connectDB";

(() => {
   
     connectDB().then(()=>{
        getRecoveryCodes()
     })   
}
)()
