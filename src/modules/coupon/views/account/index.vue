<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="20">
      <!-- <el-col :span="5">
        <el-card class="box-card"
          shadow="never">
          <div slot="header"
            class="clearfix">
            <span>选择组织</span>
          </div>
     
        </el-card>
      </el-col> -->
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
                v-model="queryParam['name']">
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
            highlight-current-row
            :data="pageData.records"
            v-loading="loading1"
            :default-sort = "{prop: 'levle', order: 'null'}"
            element-loading-text="拼命加载中">
            <!-- 数据列 -->
            <el-table-column key="userName"
              show-overflow-tooltip
              prop="userName"
              label="姓名">
            </el-table-column>
            <el-table-column key="hospital"
              show-overflow-tooltip
              prop="hospital"
              label="用户名">
            </el-table-column>
             <el-table-column key="levle"
              show-overflow-tooltip
              prop="levle"
              sortable
              label="医院级别">
            </el-table-column>
           
          </el-table>
          <!-- 分页信息 -->
          <div class="pagination-container">
            <el-pagination background
              layout="total, prev, pager, next, jumper"
              :current-page.sync="currentPage"
              :total="pageData.total">
            </el-pagination>
          </div>
        </el-card>

        <!-- 新增/编辑对话框 -->
        <el-dialog :title="mode==='add'?'添加用户':'编辑用户'"
          :visible.sync="showDialog">
          <user-edit :mode="mode"
            ref="editForm"
            :record="currentRecord"
            :auth-menus="authMenus"
            @after-edit="afterEdit">
          </user-edit>
        </el-dialog>
        <!-- 渠道商 -->
        <el-dialog :title="'用户信息'"
          :visible.sync="showShopDialog">
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
import UserEdit from './UserEdit.vue'
import productsService from '@/modules/products/service/products-service.js'
import couponService from '../../service/coupon-service'

export default {
  components: {
    UserEdit
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
      queryParam: {
        'name' : '',
        'pageSize': 10,
        'pageNum': 1
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
    tableRowClassName({row, rowIndex}) {
      if (rowIndex/2 === 1) {
        return 'warning-row';
      } else{
        return 'success-row';
      }
    },
    afterEdit() {
      this.showDialog = false
      // this.handleQuery()
    },
    afterEditShop() {
      this.showShopDialog = false
    },
    handleQuery(pn = 1) {
      this.loading1 = true
      let self = this
      this.showShop = false
      this.isSelect = false
      let queryParam = this.queryParam
      couponService.getUserList(queryParam)
      .then(rsp => {
          this.pageData = rsp
          this.loading1 = false
      }).catch(error => {
          this.loading1 = false
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
     
    },
    handleDelete(record) {
      const self = this
      this.$confirm('确定删除吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
         
        })
        .catch(e => {})
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
</style>

