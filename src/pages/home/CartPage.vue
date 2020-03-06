<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>我的购物车</span>
        <span class="comment">温馨提示：产品是否购买成功，以最终支付为准哦，请尽快完成结算</span>
      </div>
      <div class="content">
        <el-table :data="items" ref="cartTable" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55" fixed show-overflow-tooltip></el-table-column>
          <el-table-column label="图片" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.cover" style="width: 120px"/>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="商品名称" sortable></el-table-column>
          <el-table-column prop="price" label="单价" width="100" sortable></el-table-column>
          <el-table-column label="数量" width="170" sortable>
            <template slot-scope="scope">
              <el-input-number size="mini" :min="0" :max="10" :value="scope.row.amount"
                               @change="(newValue,oldValue)=>{adjustAmount(scope.row,newValue,oldValue)}"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="小计" width="120" sortable>
            <template slot-scope="scope">
              <span class="subtotal">{{scope.row.price * scope.row.amount}} 元</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button plain size="mini" type="danger" @click="removeItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="actions">
          {{`购物车中共计 ${items.length} 件商品，已选择其中 ${multipleSelection.length} 件`}}
          <div class="total">
            总计： <span class="pay_price">{{this.total}}</span> 元
            <div class="pay_action">
              <el-button size="large" type="primary" style="position: relative; top: -6px"
                         :disabled="this.total<=0" @click="goSettlement">￥ 选好了，去结算
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <PayStepIndicator :step="1"/>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import PayStepIndicator from '@/components/home/cart/PayStepIndicator'

export default {
  name: 'CartPage',
  components: {
    PayStepIndicator
  },
  data () {
    return {
      multipleSelection: []
    }
  },
  computed: {
    ...mapState('cart', ['items']),
    /**
     * 商品总价
     **/
    total () {
      return this.multipleSelection.reduce((sum, product) => sum + (product.price * product.amount), 0)
    }
  },
  mounted () {
    // 转载时默认全选所有商品
    this.toggleSelection(this.items)
  },
  methods: {
    ...mapMutations('cart', ['adjustCartItems', 'removeCartItem']),
    ...mapActions('cart', ['setupSettlementBillWithDefaultValue']),
    /**
     * 调整购物车中产品的数量
     */
    adjustAmount (product, currentValue, oldValue) {
      let item = {...product}
      item.amount = currentValue - oldValue
      this.adjustCartItems(item)
    },
    /**
     * 删除购物车中的产品
     **/
    removeItem (id) {
      this.removeCartItem(id)
      // 删除后，原本选中的项目要继续保持选中
      this.$nextTick(() => this.toggleSelection(this.items))
    },
    /**
     * 选中购物车表格中指定商品
     */
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.cartTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.cartTable.clearSelection()
      }
    },
    /**
     *转到结算页面付款
     **/
    goSettlement () {
      this.setupSettlementBillWithDefaultValue({
        items: this.multipleSelection
      })
      this.$router.push('/settle')
    },
    /**
     * 维护表格选择集
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
  .subtotal {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }

  .total {
    float: right;
  }

  .actions {
    margin-top: 20px;
    line-height: 32px
  }

  .pay_action {
    display: inline-block;
    width: 180px;
    margin: 0 20px 10px 20px;
  }

  .pay_price {
    color: red;
    font-size: 32px;
    font-weight: bold
  }

</style>
