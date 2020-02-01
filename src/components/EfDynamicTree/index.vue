<template>
  <el-tree :data="treeData"
    highlight-current
    node-key="id"
    :props="{label: 'label', children: 'children'}"
    @node-click="handleNodeClick"></el-tree>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'EfDynamicTree',
  props: {
    nodeClick: {
      type: Function
    },
    prefixUrl: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'post'
    },
    queryParam: {
      type: Object
    }
  },
  data() {
    return {
      treeData: []
    }
  },
  mounted() {
    let requestConfig = {
      url: `${this.prefixUrl}/bootstrapNavTreeData?nodeId=&async=false&sort=`,
      method: this.method
    }

    if (this.method === 'post') {
      requestConfig.data = this.queryParam
    }

    request(requestConfig)
      .then(response => {
        const jsonResult = response.data
        this.treeData = jsonResult.data
      })
      .catch(error => {
        console.error(error)
        this.treeData = []
      })
  },
  methods: {
    handleNodeClick(nodeData) {
      this.nodeClick(nodeData, this.treeData)
    }
  }
}
</script>

