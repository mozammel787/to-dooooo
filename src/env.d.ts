
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_apiKey:string
      REACT_APP_authDomain:string
      REACT_APP_projectId:string
      REACT_APP_storageBucket:string
      REACT_APP_messagingSenderId:string
      REACT_APP_appId:string
      REACT_APP_imgbb_Key:string;
      HOST: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
export {};
