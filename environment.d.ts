// declaration merging..
declare global{

namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      EMAIL: string;
      PASS: string;
      dbURI: string;
      XPX: string;
      PEXAKEY: string;
    }
  }

}
//   EMAIL =abdullah404z@outlook.com
// PASS = {%De[eP7!0N!}@
// XPX = AGSJIaPOJASGOPJAOGS$%@211
// DB = mongodb+srv://noda:noda1234@cluster0.5axsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// PEXAKEY =23635729-3403b9fa35da1f5692c1144ce
