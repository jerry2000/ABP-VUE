import Entity from './entity'

export default class Dept extends Entity<number>{
    DeptId:number;
    DeptCode:string;
    DeptName:string;
}