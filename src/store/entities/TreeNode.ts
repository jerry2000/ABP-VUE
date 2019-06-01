interface ITreeNode {
    title:String,
    expand:boolean,//是否展开直子节点
    disabled:boolean,//禁掉响应
    disableCheckbox:boolean,//是否展开直子节点
    selected:boolean,//是否展开直子节点
    checked:boolean,//是否展开直子节点
    children:ITreeNode,//是否展开直子节点
    render:Function,
    key:string,
    code:string
}
export default class TreeNode implements ITreeNode{
    title:String;
    expand:boolean;
    disabled:boolean;
    disableCheckbox:boolean;
    selected:boolean;
    checked:boolean;
    children:ITreeNode;
    render:Function;
    key:string;
    code:string;
}