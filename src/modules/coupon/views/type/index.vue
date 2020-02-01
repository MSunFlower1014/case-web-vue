<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>类型名称</span>
        </el-col>
        <el-col :span="4">
          <span>发行方</span>
        </el-col>
        <el-col :span="4">
          <span>状态</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['categoryName']"
            placeholder="请输入类型名称"
            clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="small"
            v-model="issuerCodeArr"
            multiple
            clearable
            style="width:100%;"
            placeholder="请选择">
            <el-option v-for="item in issuerList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select size="small"
            v-model="statusArr"
            multiple
            style="width:100%;"
            placeholder="请选择">
            <el-option v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryCouponCategory()">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 列表 -->
    <el-card class="box-card">
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        fit
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="categoryResults">
        <el-table-column label="类型名称"
          show-overflow-tooltip
          prop="categoryName">
        </el-table-column>
        <el-table-column label="发行方类型"
          show-overflow-tooltip
          prop="issuerCode"
          :formatter="issuerFormatter">
        </el-table-column>
        <el-table-column label="类型状态"
          show-overflow-tooltip
          prop="status"
          :formatter="statusFormatter">
        </el-table-column>
        <el-table-column label="类型说明"
          show-overflow-tooltip
          prop="typeDesc">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="text"
                title="停用"
                v-show="(scope.row.status === 1)"
                @click="handleStartStopCategory(scope.row)"
                :loading="btnLoading">
                <i class="fa fa-stop-circle-o fa-lg funcBtn"></i>
              </el-button>
              <el-button type="text"
                title="启用"
                v-show="(scope.row.status === 0)"
                @click="handleStartStopCategory(scope.row)"
                :loading="btnLoading">
                <i class="fa fa-play-circle-o fa-lg funcBtn"></i>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background
          layout="total, prev, pager, next, jumper"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          :total="totalPage">
        </el-pagination>
      </div>
    </el-card>
    <!-- 新增/编辑对话框 -->
    <el-dialog :title="'编辑优惠券类型'"
      :visible.sync="showDialog"
      :show-close="true"
      :before-close="handleDialogClose">
      <category-edit ref="editForm"
        :record="currentRecord"
        :channels="channelList"
        @after-edit="afterEditChannel">
      </category-edit>
      <template slot="footer">
        <el-button size="mini"
          @click="handleCancel">取消</el-button>
        <el-button size="mini"
          type="primary"
          @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import couponCategoryService from '../../service/coupon-category-service.js'
import categoryEdit from './couponTypeEdit'

export default {
  name: 'typeList',
  components: {
    categoryEdit
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      showDialog: false,
      currentPage: 1,
      totalPage: 0,
      categoryResults: [],

      currentRecord: {},

      issuerCodeArr: [],
      channelCodesArr: [],
      statusArr: [],

      issuerList: [
        {
          value: '1',
          label: '平台'
        },
        {
          value: '2',
          label: '店铺'
        }
      ],
      channelList: [],
      statusList: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 0,
          label: '停用'
        }
      ],

      queryParam: {
        categoryName: '',
        channelCodes: '',
        issuerCode: '',
        pageNum: 1,
        pageSize: 10,
        status: ''
      }
    }
  },
  mounted() {
    this.handleQueryCouponCategory()
  },
  methods: {
    issuerFormatter(row, column, cellValue) {
      return cellValue === '1' ? '平台' : '店铺'
    },
    statusFormatter(row, column, cellValue) {
      return cellValue === 1 ? '启用' : '停用'
    },
    afterEditChannel() {
      this.showDialog = false
      this.handleQueryCouponCategory()
    },
    handleDialogClose(done) {
      this.showDialog = false
      this.$refs.editForm.handleCancel()
      done()
    },
    handleCancel() {
      this.showDialog = false
    },
    handleSubmit() {
      this.$refs.editForm.handleSubmit()
    },
    handleQueryCouponCategory(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      this.queryParam.status = this.statusArr.join(',')
      this.queryParam.issuerCode = this.issuerCodeArr.join(',')
      let self = this
      couponCategoryService
        .queryPageData(this.queryParam)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.categoryResults = rspData.data.results
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleReset() {
      this.queryParam.categoryName = ''
      this.issuerCodeArr = []
      this.channelCodesArr = []
      this.statusArr = []
    },
    handleCurrentChange(val) {
      this.handleQueryCouponCategory(val)
    },
    handleEditCategory(record) {
      let editRecord = JSON.parse(JSON.stringify(record))
      let channelCodes = editRecord.channelCodes
      let channelCodesArr = []
      if (channelCodes) {
        channelCodesArr = channelCodes.split(',')
      }
      editRecord.channelCodes = channelCodesArr

      this.currentRecord = Object.assign({}, editRecord)
      this.showDialog = true
    },
    handleStartStopCategory(record) {
      this.currentRecord = Object.assign({}, record)
      let param = this.currentRecord
      let tipMsg = ''
      if (param.status === 1) {
        param.status = 0
        tipMsg = '确定停止吗？'
      } else {
        param.status = 1
        tipMsg = '确定开启吗？'
      }
      const self = this
      this.$confirm(tipMsg, '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          self.btnLoading = true
          couponCategoryService.changeCategoryStatus(param).then(rspData => {
            self.btnLoading = false
            self.$message({
              showClose: true,
              type: 'success',
              message: '状态更新成功!'
            })
            self.handleQueryCouponCategory()
          })
        })
        .catch(e => {})
    }
  }
}
</script>

<style>
</style>
