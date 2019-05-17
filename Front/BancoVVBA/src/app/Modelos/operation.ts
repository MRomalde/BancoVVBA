import { Account } from './account';

export class Operation{
    OperationId:number;
    Date:Date;
    Concept:string;
    Message:string;
    Amount:number;
    AccountId:number;
    Account:Account;
}