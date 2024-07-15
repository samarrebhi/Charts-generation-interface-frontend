
import { Gouvernerat } from "./gouvernerat";

export class Personne {
  personneId!:number;
    personneNom!: string;
    personnePrenom!:string;
    personneMail?: string;
    personneGouvernerat?:Gouvernerat;
    
  }