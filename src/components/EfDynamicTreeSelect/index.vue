<template>
  <treeselect :value="value"
    :placeholder="placeholder"
    @input="handleInput($event)"
    :options="treeData"
    :show-count="true"
    :load-options="loadOptions" />
</template>

<script>
import request from '@/utils/request'
import Treeselect from '@riophae/vue-treeselect'
export default {
  name: 'EfDynamicTreeSelect',
  components: {
    Treeselect
  },
  props: {
    value: {
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
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
    handleInput(newValue) {
      this.$emit('input', newValue)
    },
    loadOptions({ action, callback, instanceId }) {
      // TODO
    }
  }
}
</script>

