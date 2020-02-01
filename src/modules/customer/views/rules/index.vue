<template>
  <div class="app-container">
    <!-- 搜索表单 -->
    <el-card class="box-card">
      <el-row :gutter="20"
        class="query_label_mgr">
        <el-col :span="4">
          <span>规则名称</span>
        </el-col>
        <el-col :span="4">
          <span>规则类型</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['query.ruleName||like']"
            clearable
            placeholder="请输入规则名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="small"
            v-model="typeArr"
            multiple
            style="width:100%;"
            placeholder="请选择">
            <el-option v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryRules()">
            <i class="fa fa-search"></i>搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 查询列表 -->
    <el-card class="box-card">
      <el-button type="primary"
        class="mgrb_20"
        size="medium"
        @click="handleAddRules">
        <i class="fa fa-plus"></i>新增规则</el-button>
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        fit
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="ruleResults">
        <el-table-column label="规则类型"
          show-overflow-tooltip
          :formatter="handleReturnRuleType">
        </el-table-column>
        <el-table-column label="规则名称"
          show-overflow-tooltip
          prop="ruleName">
        </el-table-column>
        <el-table-column label="规则内容"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text"
              title="下载"
              @click="handleDownloadContent(scope.row)">
              <i class="fa fa-download fa-lg funcBtn"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态"
          show-overflow-tooltip
          :formatter="statusFormatter">
        </el-table-column>
        <el-table-column label="创建人"
          show-overflow-tooltip
          prop="createBy">
        </el-table-column>
        <el-table-column label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createDate || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="text"
                title="编辑"
                v-show="showEditStatusBtns(scope.row)"
                @click="handleEditRule(scope.row)">
                <i class="fa fa-edit fa-lg funcBtn"></i>
              </el-button>
              <el-button type="text"
                title="上线"
                v-show="showEditStatusBtns(scope.row)"
                @click="handleOnlineOffline(scope.row)">
                <i class="fa fa-level-up fa-lg funcBtn"></i>
              </el-button>
              <el-button type="text"
                title="下线"
                v-show="showCacheStatusBtns(scope.row)"
                @click="handleOnlineOffline(scope.row)">
                <i class="fa fa-level-down fa-lg funcBtn"></i>
              </el-button>
              <el-button type="text"
                title="刷新缓存"
                v-show="showCacheStatusBtns(scope.row)"
                @click="handleRefreshRule(scope.row)">
                <i class="fa fa-refresh fa-lg funcBtn"></i>
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
    <el-dialog :title="modelType==='ADD'?'新增用户规则信息':'编辑用户规则信息'"
      :visible.sync="showDialog"
      :show-close="true"
      :before-close="handleDialogClose">
      <rule-edit ref="editForm"
        :modelType="modelType"
        :record="currentRecord"
        @after-edit="afterEditRule">
      </rule-edit>
      <template slot="footer">
        <el-button size="mini"
          @click="handleCancel">取消</el-button>
        <el-button size="mini"
          type="primary"
          :loading="editLoading"
          @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ruleService from '../../service/rules-service.js'
import ruleEdit from './ruleEdit'
import { downloadFile } from '@/utils/index'
let ruleType = {
  ADD: 'ADD',
  EDIT: 'EDIT'
}

export default {
  name: 'rules',
  components: {
    ruleEdit
  },
  mounted() {
    this.handleQueryRules()
  },
  data() {
    return {
      editLoading: false,
      loading: false,
      currentPage: 1,
      totalPage: 0,
      showDialog: false,
      modelType: ruleType.ADD,
      currentRecord: {},
      typeList: [
        {
          value: 3,
          label: '目标用户'
        },
        {
          value: 2,
          label: '白名单用户'
        },
        {
          value: 1,
          label: '黑名单用户'
        }
      ],
      statusList: [
        {
          value: 0,
          label: '草稿'
        },
        {
          value: 1,
          label: '上线'
        },
        {
          value: 2,
          label: '下线'
        }
      ],

      queryParam: {
        'query.targetType||in': '',
        'query.ruleName||like': '',
        'page.size': '10',
        'page.pn': '1'
      },

      typeArr: [],
      ruleResults: []
    }
  },
  methods: {
    // 1 === 启用
    statusFormatter(result) {
      let showStatus = ''
      for (let index = 0; index < this.statusList.length; index++) {
        const element = this.statusList[index]
        if (element.value === result.status) {
          showStatus = element.label
          break
        }
      }
      return showStatus
    },
    showEditStatusBtns(result) {
      if (result.status !== 1 && result.status !== 2) {
        return true
      }
      return false
    },
    showCacheStatusBtns(result) {
      if (result.status === 1) {
        return true
      }
      return false
    },
    handleReturnRuleType(result) {
      let showStatus = ''
      for (let index = 0; index < this.typeList.length; index++) {
        const element = this.typeList[index]
        if (element.value === result.targetType) {
          showStatus = element.label
          break
        }
      }
      return showStatus
    },
    handleQueryRules(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      let param = this.queryParam
      param['query.targetType||in'] = this.typeArr.join(',')
      let self = this
      ruleService
        .queryPageData(param)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.ruleResults = rspData.data.results
          self.loading = false
          // self.handleReset()
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleReset() {
      this.queryParam['query.ruleName||like'] = ''
      this.typeArr = []
    },
    handleCancel() {
      this.showDialog = false
    },
    handleSubmit() {
      this.editLoading = true
      this.$refs.editForm.handleSubmit()
    },
    handleDialogClose(done) {
      this.$refs.editForm.handleCancel()
      this.showDialog = false
      done()
    },
    afterEditRule() {
      this.editLoading = false
      this.showDialog = false
      this.handleQueryRules()
    },
    handleCurrentChange(val) {
      this.handleQueryRules(val)
    },
    handleDownloadContent(record) {
      let arr = record.ruleVal.split('/')
      let fileSuffixArr = arr[arr.length - 1].split('.')

      let fileName = fileSuffixArr[0]
      let suffix = fileSuffixArr[1]

      const self = this
      this.$confirm('您是否确定下载规则？', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ruleService.downloadFile(record.ruleVal).then(rspData => {
            downloadFile(rspData, fileName, suffix)
            self.$message({
              showClose: true,
              type: 'success',
              message: '正在下载，请稍等!'
            })
          })
        })
        .catch(() => {})
    },
    handleAddRules() {
      this.modelType = ruleType.ADD
      this.currentRecord = {
        targetType: null,
        ruleName: '',
        ruleVal: ''
      }
      this.showDialog = true
    },
    handleEditRule(record) {
      this.modelType = ruleType.EDIT
      this.currentRecord = Object.assign({}, record)
      this.showDialog = true
    },
    handleOnlineOffline(record) {
      this.currentRecord = Object.assign({}, record)
      let param = this.currentRecord
      let tipMsg = ''
      let successMsg = ''
      // 0,草稿 1，上线 2，下线
      if (param.status === 0) {
        param.status = 1
        tipMsg = '您是否确定上线活动规则？'
        successMsg = '上线成功！'
      } else {
        param.status = 2
        tipMsg = '您是否确定下线活动规则？'
        successMsg = '下线成功！'
      }
      const self = this
      this.$confirm(tipMsg, '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ruleService.updateRuleStatus(param).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: successMsg
            })
            self.handleQueryRules()
          })
        })
        .catch(() => {})
    },
    handleRefreshRule(record) {
      let param = Object.assign({}, record)
      let self = this

      this.$confirm('您是否确定刷新活动规则缓存？', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ruleService.updateRuleCache(param).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: '刷新成功!'
            })
            self.handleQueryRules()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
