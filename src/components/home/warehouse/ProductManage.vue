<template>
  <el-form :model="product" label-position="left">
    <el-form-item label="商品名称" label-width="100px">
      <el-input v-model="product.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品售价" label-width="100px">
      <el-input v-model="product.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品评分" label-width="100px">
      <el-input v-model="product.rate" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="封面图片" label-width="100px">
      <el-input v-model="product.cover" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="详情图片" label-width="100px">
      <el-input v-model="product.detail" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品规格">
      <div style="padding-top: 40px">
        <el-tag :key="spec.item" v-for="spec in product.specifications" closable size="medium"
                :disable-transitions="false" @close="removeSpecification(spec)">
          {{spec.item+':'+spec.value}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                  @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Spec</el-button>
      </div>
    </el-form-item>
    <el-form-item label="商品描述">
      <el-input type="textarea" v-model="product.description" :autosize="{ minRows: 7, maxRows: 7}"></el-input>
    </el-form-item>
    <div style="text-align: right; padding-right: 40px">
      <el-button @click="$emit('dismiss')">取 消</el-button>
      <el-button type="primary" @click="submitProduct">确 定</el-button>
    </div>
  </el-form>
</template>

<script>
import api from '@/api'

export default {
  name: 'ProductManage',
  props: {
    createMode: Boolean,
    product: Object
  },
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    refresh () {
    },

    /**
     * 提交产品修改到服务端
     */
    async submitProduct () {
      // 移除所有HTML标签，防止XSS
      let desc = api.stringUtil.pureText(this.product.description)
      // 将回车转回HTML的<p>
      desc = api.stringUtil.transToHTML(desc)

      const remote = this.createMode ? api.warehouse.createProduct : api.warehouse.updateProduct
      try {
        await remote({
          ...this.product,
          description: desc
        })
        this.$notify({title: '操作成功', message: (this.createMode ? '商品已成功创建' : '商品信息已修改'), type: 'success'})
        this.$emit('updated')
      } catch (e) {
        this.$notify({title: '操作失败', message: e.message, type: 'error'})
      }
    },

    /**
     * 移除一个产品规格标签
     */
    removeSpecification (spec) {
      this.product.specifications.splice(this.product.specifications.indexOf(spec), 1)
    },

    /**
     * 增加一个产品规格标签
     */
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    /**
     * 处理产品规格标签的输入确认
     */
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        inputValue = inputValue.replace('：', ':')
        if (inputValue.indexOf(':') > 0) {
          const spec = inputValue.split(':')
          this.product.specifications.push({
            item: spec[0],
            value: spec[1],
            productId: this.product.id
          })
        } else {
          this.$alert('产品规格应该以“项目:值”的形式录入')
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
