<template>
  <div class="app-container">
    <el-row class="box-card">
      <el-row class="query_label_mgr mgrb_10">
        <span>品类名称</span>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-input v-model="filterText"
            clearable
            size="small"></el-input>
        </el-col>
      </el-row>
    </el-row>
    <el-tree class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      show-checkbox
      :filter-node-method="filterNode"
      ref="categoryTree">
    </el-tree>
  </div>
</template>
<script>
import categoryService from '@/modules/products/service/product-category-service.js'
export default {
  watch: {
    filterText(val) {
      this.$refs.categoryTree.filter(val)
    }
  },
  data() {
    return {
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleReturn() {
      this.multipleSelection = []
      this.$emit(
        'after-edit',
        this.$refs.categoryTree.getCheckedNodes(true, false)
      )
    },
    handleQueryData() {
      let self = this
      categoryService.bootstrapNavTreeData().then(rspData => {
        self.treeData = rspData.data
      })
    },
    handleSubmit() {
      // (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
      this.$emit(
        'after-edit',
        this.$refs.categoryTree.getCheckedNodes(true, false)
      )
    }
  },
  mounted() {
    this.handleQueryData()
  }
}
</script>
<style lang="scss" scoped>
</style>
