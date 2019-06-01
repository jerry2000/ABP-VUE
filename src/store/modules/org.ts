import Vue from  'vue'
import {Store,Module,ActionContext} from 'vuex'
import Ajax from '../../lib/ajax'
import ListState from './list-state';
import TreeNode from '../entities/TreeNode';
import ListMutations from './list-mutations';
import ListModule from './list-module';
import User from '../entities/user';
import Role from '../entities/role';

interface TreeNodeState{
    list:Array<TreeNode>;
}
interface UsersState{
    list:Array<User>;
}

class OrgModule implements Module<TreeNodeState,any>{
    namespaced=true;
    state={
        list:new Array<TreeNode>(),
    }
    actions={
        async getOrgTreeData(context:ActionContext<TreeNodeState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/OrganizationUnit/GetOrganizationUnitsTree');
            let result=reponse.data.result;
            context.state.list=result.items;
        },
    };
    mutations={
        
    }
}
const orgModule=new OrgModule();
export default orgModule;