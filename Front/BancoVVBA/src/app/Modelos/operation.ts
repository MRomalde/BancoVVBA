import { Account } from './account';

export class Operation{
    operationId:number;
    date:Date;
    concept:string;
    message:string;
    amount:number;
    accountId:number;
    account:Account;
}