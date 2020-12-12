<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="#/">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="#/">商品列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="products"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        :formatter="(r,c,cellValue) => currency(cellValue)"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template v-slot="scope">
          <el-button @click="addToCart(scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { currency } from '@/utils/formatter'

export default {
  name: 'ProductList',
  computed: {
    ...mapState('product', ['products'])
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    currency,
    ...mapActions('product', ['getProducts']),
    ...mapMutations('cart', ['addToCart'])
  }
}
</script>

<style></style>
