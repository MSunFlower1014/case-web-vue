<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>渠道编码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input placeholder="请输入渠道编码"
            clearable
            v-model="queryParam['query.channelCode||like']"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryChannelAuth()">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 查询列表 -->
    <el-card class="box-card">
      <el-button type="primary"
        class="mgrb_20"
        size="medium"
        @click="handleAddChannelAuth">
        <i class="fa fa-plus"></i> 新增渠道鉴权</el-button>
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        stripe
        fit
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="channelResults">
        <el-table-column show-overflow-tooltip
          label="渠道编码"
          prop="channelCode">
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="签名"
          prop="signature">
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="IP"
          prop="ip">
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createDate  || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="状态"
          :formatter="statusFormatter">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="text"
                title="编辑"
                @click="handleEditChannelAuth(scope.row)">
                <i class="fa fa-edit fa-lg funcBtn"></i>
              </el-button>
              <el-button type="text"
                title="删除"
                @click="handleDeleteChannelAuth(scope.row)">
                <i class="fa fa-trash-o fa-lg funcBtn"></i>
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
    <el-dialog :title="modelType==='ADD'?'新增渠道信息':'编辑渠道信息'"
      :visible.sync="showDialog"
      :show-close="true"
      :before-close="handleDialogClose">
      <channelAuth-edit ref="editForm"
        :modelType="modelType"
        :record="currentRecord"
        @after-edit="afterEditChannelAuth">
      </channelAuth-edit>
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
import channelAuthService from '../../service/channelAuth-service.js'
import channelAuthEdit from './channelAuthEdit'

let channelType = {
  ADD: 'ADD',
  EDIT: 'EDIT'
}

export default {
  name: 'ChannelAuthList',
  components: {
    channelAuthEdit
  },
  mounted() {
    this.handleQueryChannelAuth()
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      modelType: channelType.ADD,
      currentRecord: {},

      currentPage: 1,
      totalPage: 0,

      queryParam: {
        'query.channelCode||like': '',
        'page.size': 10,
        'page.pn': 1
      },

      channelResults: []
    }
  },
  methods: {
    // 1 === 启用
    statusFormatter(result) {
      return result.status === 1 ? '启用' : '停用'
    },
    handleCancel() {
      this.showDialog = false
    },
    handleSubmit() {
      this.$refs.editForm.handleSubmit()
    },
    handleDialogClose(done) {
      this.showDialog = false
      this.$refs.editForm.handleCancel()
      done()
    },
    afterEditChannelAuth() {
      this.showDialog = false
      this.handleQueryChannelAuth()
    },
    handleCurrentChange(val) {
      this.handleQueryChannelAuth(val)
    },
    handleQueryChannelAuth(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      let self = this
      channelAuthService
        .queryPageData(this.queryParam)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.channelResults = rspData.data.results
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleAddChannelAuth() {
      this.modelType = channelType.ADD
      this.currentRecord = {
        channelCode: '',
        signature: '',
        ip: '',
        status: 0
      }
      this.showDialog = true
    },
    handleEditChannelAuth(record) {
      this.modelType = channelType.EDIT
      this.currentRecord = Object.assign({}, record)
      this.showDialog = true
    },
    handleDeleteChannelAuth(record) {
      const self = this
      this.$confirm('确定删除吗？', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          channelAuthService.deleteDataById(record.id).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: '删除成功!'
            })
            self.handleQueryChannelAuth()
          })
        })
        .catch(e => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
