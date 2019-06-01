<template>
  <div>
    <Modal
      draggable
      :title="L('CreateNewUser')"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
    >
      <Form ref="userForm" :label-width="70" label-position="left" :rules="userRule" :model="user">
        <Tabs value="detail">
          <TabPane :label="L('UserDetails')" name="detail">
            <FormItem :label="L('UserName')" prop="userName">
              <Input v-model="user.userName" :maxlength="32" :minlength="2"></Input>
            </FormItem>
            <FormItem :label="L('Name')" prop="name">
              <Input v-model="user.name" :maxlength="32"></Input>
            </FormItem>
            <FormItem :label="L('Password')" prop="password">
              <Input v-model="user.password" type="password" :maxlength="32"></Input>
            </FormItem>
            <FormItem :label="L('ConfirmPassword')" prop="confirmPassword">
              <Input v-model="user.confirmPassword" type="password" :maxlength="32"></Input>
            </FormItem>
            <FormItem label="所属部门" prop="DeptID">
              <tree-select
                 v-model="treeSelected"
                :load-data="loadData"
                :data="Depts"
              ></tree-select>
            </FormItem>
            <FormItem>
              <Checkbox v-model="user.isActive">{{L('IsActive')}}</Checkbox>
            </FormItem>
          </TabPane>
          <TabPane :label="L('UserRoles')" name="roles">
            <CheckboxGroup v-model="user.roleNames">
              <Checkbox :label="role.normalizedName" v-for="role in roles" :key="role.id">
                <span>{{role.name}}</span>
              </Checkbox>
            </CheckboxGroup>
          </TabPane>
        </Tabs>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{L('Cancel')}}</Button>
        <Button @click="save" type="primary">{{L('OK')}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../../../lib/util";
import AbpBase from "../../../lib/abpbase";
import User from "../../../store/entities/user";
import TreeSelect from '@/components/tree-select'
import Ajax from '@/lib/ajax';
import { ArrayPropsDefinition } from "vue/types/options";
@Component({
components:{TreeSelect}
})
export default class CreateUser extends AbpBase {
constructor(){
  super();
  this.loadData();
}
  @Prop({ type: Boolean, default: false }) value: boolean;
  //Tree Data 开始
  treeSelected: any=[];
  Depts=[];
  Treevalue:any=null;
  loadData(){
    Ajax.get('/api/services/app/OrganizationUnit/GetOrganizationUnitsTree').then((result)=>{
    this.Depts=result.data.result.items;
    console.log('result')
    console.log(this.Depts)
  });  
  }
//   Depts=[
//   {
//     "key": "12",
//     "code": "00001",
//     "title": "山东智冠12",
//     "children": [
//       {
//         "key": "13",
//         "code": "00001.00001",
//         "title": "开发部",
//         "children": [
//           {
//             "key": "15",
//             "code": "00001.00001.00001",
//             "title": "开发一部",
//             "children": []
//           },
//           {
//             "key": "16",
//             "code": "00001.00001.00002",
//             "title": "开发二部",
//             "children": []
//           },
//           {
//             "key": "17",
//             "code": "00001.00001.00003",
//             "title": "开发三部",
//             "children": []
//           }
//         ]
//       },
//       {
//         "key": "14",
//         "code": "00001.00002",
//         "title": "实施部",
//         "children": []
//       }
//     ]
//   },
//   {
//     "key": "18",
//     "code": "00002",
//     "title": "潍坊东信",
//     "children": []
//   }
// ];

  changeTreeSelectData() {
    //this.treeSelected = [111, 114]
  }
  changeTreeData() {
    //   this.treeData = newTreeData
    // this.treeSelected = [];
  }
  //Tree Data 结束
  user: User = new User();
  get roles() {
    return this.$store.state.user.roles;
  }

  save() {
    (this.$refs.userForm as any).validate(async (valid: boolean) => {
      if (valid) {
        await this.$store.dispatch({
          type: "user/create",
          data: this.user
        });
        (this.$refs.userForm as any).resetFields();
        this.$emit("save-success");
        this.$emit("input", false);
      }
    });
  }
  cancel() {
    (this.$refs.userForm as any).resetFields();
    this.$emit("input", false);
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit("input", value);
    }
  }
  validatePassCheck = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error(this.L("ConfirmPasswordMsg")));
    } else if (value !== this.user.password) {
      callback(new Error(this.L("ConfirmPasswordNotMatch")));
    } else {
      callback();
    }
  };
  userRule = {
    userName: [
      {
        required: true,
        message: this.L("FieldIsRequired", undefined, this.L("UserName")),
        trigger: "blur"
      }
    ],
    name: [
      {
        required: true,
        message: this.L("FieldIsRequired", undefined, this.L("Name")),
        trigger: "blur"
      }
    ],
    password: [
      {
        required: true,
        message: this.L("FieldIsRequired", undefined, this.L("Password")),
        trigger: "blur"
      }
    ],
    confirmPassword: { validator: this.validatePassCheck, trigger: "blur" }
  };
}
</script>

