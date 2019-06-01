<template>
<Layout>
    <Sider hide-trigger :style="{background: '#fff'}">
        <Tree ref="tree" :data="OrgData" @on-select-change="selectNode" show-checkbox check-strictly></Tree>
    </Sider>
    <Divider type="vertical" style="margin:1px"/>
    <Content style="background: #fff;padding:10px">
        <Form ref="formInline" :model="DeptForm" :label-width="80" inline>
            <FormItem label="部门名称" prop="DeptName">
                <Input type="text" v-model="DeptForm.DeptName" placeholder="部门名称"></Input>
            </FormItem>
            <FormItem label="部门编码" prop="DeptCode">
                <Input type="text" v-model="DeptForm.DeptCode" placeholder="部门编码"></Input>
            </FormItem>
        </Form>
        <tree-select
                v-model="treeSelected"
                :data="Depts"
                check-strictly
              ></tree-select>
        <Tabs value="user">
        <TabPane label="用 户" name="user">
            <Users :value="DeptForm"></Users>
        </TabPane>
    </Tabs>
    </Content>
</Layout>
</template>
<script lang="ts">
import {Component,Vue,Inject,Prop,Watch} from 'vue-property-decorator';
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import Dept from "@/store/entities/Dept";
import TreeNode from '@/store/entities/TreeNode';
import TreeSelect from '@/components/tree-select'
import { Tree } from 'iview';

import Users from '../user/user.vue' ;
@Component({
components:{Users,TreeSelect}
})
export default class Org extends AbpBase {
    loading=false;
    DeptForm:Dept=new Dept();
    //TreeSelect
    checkstrictly:boolean=false;
    handleTreeSelectChange(){}
    handleTreeSelectExpand(){}
    handleTreeSelectCheckChange(){}
    handleTreeSelectClick(){}
    treeSelected=[]
    Depts=[
  {
    id: 'a',
    title: 'a',
    children: [
      {
        id: 'a1',
        title: 'a-1',
        children: [
          {
            id: 112,
            title: '1-1-2'
          },
          {
            id: 'a12',
            title: 'a-1-2'
          },
          {
            id: 'a13',
            title: 'a-1-3'
          },
          {
            id: 'a14',
            title: 'a-1-4'
          }
        ]
      },
      {
        id: 'a2',
        title: 'a-2',
        children: [
          {
            id: 'a21',
            title: 'b-2-1'
          }
        ]
      }
    ]
  }
]
      Depts1=[
  {
    "id": "12",
    "code": "00001",
    "title": "山东智冠12",
    "children": [
      {
        "id": "13",
        "code": "00001.00001",
        "title": "开发部",
        "children": [
          {
            "id": "15",
            "code": "00001.00001.00001",
            "title": "开发一部",
            "children": []
          },
          {
            "id": "16",
            "code": "00001.00001.00002",
            "title": "开发二部",
            "children": []
          },
          {
            "id": "17",
            "code": "00001.00001.00003",
            "title": "开发三部",
            "children": []
          }
        ]
      },
      {
        "id": "14",
        "code": "00001.00002",
        "title": "实施部",
        "children": []
      }
    ]
  },
  {
    "id": "18",
    "code": "00002",
    "title": "潍坊东信",
    "children": []
  }
];
//treeselect
    tableInfo:{}
    constructor() {
        super();
        this.getOrgData()
    }
    async getOrgData() {
        await this.$store.dispatch({
            type: 'org/getOrgTreeData',
        })
    }
    get OrgData() {
        return this.$store.state.org.list;
    }
    get UsersData() {
        console.log(this.$store.state.user.list)
        return this.$store.state.user.list;
    }
    async selectNode(e: any) {
            this.DeptForm.DeptCode=e[0].code,
            this.DeptForm.DeptName=e[0].title,
            this.DeptForm.DeptId=e[0].key

        console.log(e[0].key)
        this.tableInfo={
            OrgId:e[0].key,
            MaxResultCount:10,
            SkipCount:0
        }
        await this.$store.dispatch({
            type: 'user/getUsersByOrgId',
            data:this.tableInfo
        })
    }
    test():void{
        let s=(this.$refs.tree as Tree).getSelectedNodes()
        console.log(s);
    }
}
</script>
<style>
.split {
    height: 560px;
    border: 1px solid #dcdee2;
}

.split-pane {
    padding: 10px;
}

.ivu-card-body {
    padding: 0
}
</style>
