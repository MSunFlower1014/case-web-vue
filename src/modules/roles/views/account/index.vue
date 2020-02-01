<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="box-card"
          shadow="never">
          <div slot="header"
            class="clearfix">
            <span>选择组织</span>
          </div>
          <ef-dynamic-tree prefix-url="/api/sys/organization"
            :node-click="handleOrganizationClick"></ef-dynamic-tree>
          <!--<el-button type="text"-->
            <!--size="small"-->
            <!--class="channelBtn"-->
            <!--:class="{channelBtnSelect : isSelect}"-->
            <!--@click="handleShopUserClick()">渠道商</el-button>-->
        </el-card>
      </el-col>
      <el-col :span="19">
        <!-- 查询表单 -->
        <el-card class="box-card"
          v-show="!showShop"
          shadow="never">
          <div slot="header"
            class="clearfix">
            <span>用户管理</span>
          </div>
          <el-row :gutter="20"
            class="query_input_style"
            style="margin-bottom: 10px">
            <el-col :span="4">
              <el-input @keyup.enter.native="handleQuery()"
                :placeholder="'请输入姓名'"
                clearable
                v-model="queryParam['query.realname||like']">
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary"
                size="small"
                class="query-search-button"
                @click="handleQuery()">
                <i class="fa fa-search"></i> 查询</el-button>
            </el-col>
          <el-col :span="2"
              style="margin-left:30px">
              <el-button type="primary"
                size="small"
                class="query-search-button"
                @click="handleAdd">
                <i class="fa fa-plus"></i> 添加</el-button>
            </el-col>
          </el-row>

          <!-- 数据表格 -->
          <el-table row-key="id"
            fit
            stripe
            highlight-current-row
            :header-cell-class-name="'table-head-th'"
            :data="pageData.results"
            v-loading="loading1"
            element-loading-text="拼命加载中">
            <!-- 数据列 -->
            <el-table-column key="realname"
              show-overflow-tooltip
              prop="realname"
              label="姓名">
            </el-table-column>
            <el-table-column key="username"
              show-overflow-tooltip
              prop="username"
              label="用户名">
            </el-table-column>
            <el-table-column key="email"
              show-overflow-tooltip
              label="邮箱">
              <template slot-scope="scope">
                {{scope.row.email || '-'}}
              </template>
            </el-table-column>
            <el-table-column key="phone"
              show-overflow-tooltip
              label="电话">
              <template slot-scope="scope">
                {{scope.row.phone || '-'}}
              </template>
            </el-table-column>
            <el-table-column key="status"
              prop="status"
              label="状态">
              <template slot-scope="scope">
                <el-tag type="primary"
                  v-if="scope.row.status==='-1'">{{userStatusDict[0].label}}</el-tag>
                <el-tag type="warning"
                  v-else-if="scope.row.status==='0'">{{userStatusDict[1].label}}</el-tag>
                <el-tag type="danger"
                  v-else-if="scope.row.status==='1'">{{userStatusDict[2].label}}</el-tag>
                <el-tag type="danger"
                  v-else>{{userStatusDict[3].label}}</el-tag>
              </template>
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button size="mini"
                    title="详情"
                    type="text"
                    @click="handleEdit(scope.row)">
                    <i class="fa fa-file-text-o fa-lg funcBtn"></i>
                  </el-button>
                  <!-- <el-button size="mini"
                    title="删除"
                    type="text"
                    @click="handleDelete(scope.row)">
                    <i class="fa fa-trash-o fa-lg funcBtn"></i>
                  </el-button> -->
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页信息 -->
          <div class="pagination-container">
            <el-pagination background
              layout="total, prev, pager, next, jumper"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :total="pageData.total">
            </el-pagination>
          </div>
        </el-card>

        <el-card class="box-card"
          v-show="showShop"
          shadow="never">
          <div slot="header"
            class="clearfix">
            <span>渠道商管理</span>
          </div>
          <el-row :gutter="20"
            class="query_input_style"
            style="margin-bottom: 10px">
            <el-col :span="4">
              <el-input @keyup.enter.native="handleShopUserClick()"
                :placeholder="'请输入姓名'"
                clearable
                v-model="shopUserQueryParam['userName']"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary"
                size="small"
                class="query-search-button"
                @click="handleShopUserClick()">
                <i class="fa fa-search"></i> 查询</el-button>
            </el-col>
          </el-row>

          <!-- <el-form :inline="true"
            ref="queryUserForm"
            :model="shopUserQueryParam"
            style="margin-bottom: 10px">
            <el-form-item>
              <el-input @keyup.enter.native="handleShopUserClick"
                :placeholder="'请输入姓名'"
                v-model="shopUserQueryParam['realname']">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                size="small"
                class="query-search-button"
                @click="handleShopUserClick">
                <i class="fa fa-search"></i> 查询</el-button>
            </el-form-item>
          </el-form> -->

          <!-- 数据表格 -->
          <el-table row-key="id"
            fit
            stripe
            highlight-current-row
            :header-cell-class-name="'table-head-th'"
            :data="shopUserData.results"
            v-loading="loading2"
            element-loading-text="拼命加载中">
            <!-- 数据列 -->
            <el-table-column key="realname"
              show-overflow-tooltip
              prop="realname"
              label="姓名">
            </el-table-column>
            <el-table-column key="username"
              show-overflow-tooltip
              prop="username"
              label="用户名">
            </el-table-column>
            <el-table-column key="shopName"
              show-overflow-tooltip
              prop="shopName"
              label="店铺名称">
            </el-table-column>
            <el-table-column key="orgName"
              show-overflow-tooltip
              prop="orgName"
              label="所属分公司">
            </el-table-column>
            <el-table-column key="phone"
              show-overflow-tooltip
              prop="phone"
              label="手机号码">
            </el-table-column>
            <el-table-column key="manageName"
              show-overflow-tooltip
              prop="manageName"
              label="渠道经理">
            </el-table-column>
            <el-table-column key="status"
              prop="status"
              label="状态">
              <template slot-scope="scope">
                <el-tag type="primary"
                  v-if="scope.row.status==='-1'">{{userStatusDict[0].label}}</el-tag>
                <el-tag type="warning"
                  v-else-if="scope.row.status==='0'">{{userStatusDict[1].label}}</el-tag>
                <el-tag type="danger"
                  v-else-if="scope.row.status==='1'">{{userStatusDict[2].label}}</el-tag>
                <el-tag type="danger"
                  v-else>{{userStatusDict[3].label}}</el-tag>
              </template>
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button size="mini"
                    title="详情"
                    type="text"
                    @click="handleDetail(scope.row)">
                    <i class="fa fa-file-text-o fa-lg funcBtn"></i>
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页信息 -->
          <div class="pagination-container">
            <el-pagination background
              layout="total, prev, pager, next, jumper"
              @current-change="handleShopCurrentChange"
              :current-page.sync="currentShopPage"
              :total="shopUserData.total">
            </el-pagination>
          </div>
        </el-card>
        <!-- 新增/编辑对话框 -->
        <el-dialog :title="mode==='add'?'添加用户':'编辑用户'"
          :visible.sync="showDialog"
          :before-close="handleDialogClose">
          <user-edit :mode="mode"
            ref="editForm"
            :record="currentRecord"
            :auth-menus="authMenus"
            @after-edit="afterEdit">
          </user-edit>
        </el-dialog>
        <!-- 渠道商 -->
        <el-dialog :title="'用户信息'"
          :visible.sync="showShopDialog"
          :before-close="handleShopDialogClose">
          <shop-user-edit ref="editShopForm"
            @after-edit-shop="afterEditShop"
            :record="currentShopRecord">
          </shop-user-edit>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userService from '../../service/user-service'
import UserEdit from './UserEdit'
import ShopUserEdit from './ShopUserEdit'
import EfDynamicTree from '@/components/EfDynamicTree'

export default {
  components: {
    UserEdit,
    ShopUserEdit,
    EfDynamicTree
  },
  data() {
    return {
      currentPage: 1,
      currentShopPage: 1,
      loading1: false,
      loading2: false,
      pageData: {},
      mode: 'edit',
      currentRecord: {},
      showDialog: false,
      authMenus: [],
      userStatusDict: [
        {
          status: -1,
          label: '删除'
        },
        {
          status: 0,
          label: '锁定'
        },
        {
          status: 1,
          label: '正常'
        },
        {
          status: 2,
          label: '未激活'
        }
      ],
      queryParam: {
        'query.realname||like': '',
        'page.size': 10,
        'page.pn': 1
      },
      organizationColumns: [
        {
          value: 'name',
          text: '名称'
        }
      ],
      currentOrganizationId: '',
      // 1、列表查询：姓名，用户名，店铺名称，所属分公司，手机号码，渠道经理，状态，操作

      isSelect: false,
      showShop: false,
      showShopDialog: false,
      currentShopRecord: {},
      shopUserQueryParam: {
        pageNum: 1,
        pageSize: 10,
        userName: ''
      },
      shopUserData: {}
    }
  },
  methods: {
    afterEdit() {
      this.showDialog = false
      // this.handleQuery()
    },
    afterEditShop() {
      this.showShopDialog = false
    },
    handleQuery(pn = 1) {
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      this.loading1 = true
      let self = this
      this.showShop = false
      this.isSelect = false
      this.queryParam['queryString'] = `?organizationid=${
        this.currentOrganizationId
      }`
      userService
        .queryPageData(this.queryParam)
        .then(rspData => {
          this.pageData = rspData.data
          self.loading1 = false
        })
        .catch(e => {
          self.loading1 = false
        })
    },
    handleAdd() {
      this.mode = 'add'
      this.showDialog = true
      this.currentRecord = {
        organization: {
          id: this.currentOrganizationId
            ? this.currentOrganizationId
            : undefined
        }
      }
    },
    handleEdit(record) {
      this.mode = 'edit'
      this.showDialog = true
      userService.getUserDetailById(record.id).then(rspData => {
        this.currentRecord = rspData.data
        if (!this.currentRecord.organization) {
          this.currentRecord.organization = {}
        }
      })
    },
    handleDelete(record) {
      const self = this
      this.$confirm('确定删除吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userService.deleteDataById(record.id).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: '删除成功!'
            })
            self.handleQuery()
          })
        })
        .catch(e => {})
    },
    handleCurrentChange(val) {
      this.handleQuery(val)
    },
    handleOrganizationClick(organization, treeData) {
      this.queryParam['query.realname||like'] = ''
      this.currentOrganizationId = organization.id
      this.handleQuery()
    },
    handleShopCurrentChange(val) {
      this.handleShopUserClick(val)
    },
    handleShopUserClick(pn = 1) {
      this.loading2 = true
      this.showShop = true
      this.isSelect = true
      this.currentShopPage = pn
      this.shopUserQueryParam['pageNum'] = pn
      let param = this.shopUserQueryParam
      let self = this
      userService
        .getShopUsers(param)
        .then(rspData => {
          self.shopUserData = rspData.data
          self.loading2 = false
        })
        .catch(e => {
          self.loading2 = false
        })
    },
    handleDetail(result) {
      this.showShopDialog = true
      let self = this
      userService.getShopUserDetail(result.id).then(rspData => {
        self.currentShopRecord = rspData.data
      })
    },
    handleDialogClose(done) {
      this.$refs.editForm.resetFields()
      done()
    },
    handleShopDialogClose(done) {
      this.showShopDialog = false
      this.$refs.editShopForm.resetFields()
      done()
    }
  },
  mounted() {
    this.handleQuery()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.channelBtn {
  width: 100%;
  font-size: 14.5px;
  color: #606266;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  padding: 3px 3px 3px 22px;
  margin-top: 3px;
}
.channelBtnSelect {
  background-color: #effcfe;
}
</style>

