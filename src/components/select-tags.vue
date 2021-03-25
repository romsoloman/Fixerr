<template>
  <el-select class="select-tags" v-model="value" multiple placeholder="Select" @change="updateGigEditFromSelect">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'programing and tech',
          label: 'Programing and Tech'
        }, {
          value: 'graphics and design',
          label: 'Graphics and Design'
        }, {
          value: 'digital marketing',
          label: 'Digital Marketing'
        }, {
          value: 'video and animation',
          label: 'Video and Animation'
        }, {
          value: 'gaming',
          label: 'Gaming'
        }, {
          value: 'writing and translation',
          label: 'Writing and Translation'
        }, {
          value: 'music and audio',
          label: 'Music and Audio'
        }, {
          value: 'business',
          label: 'Business'
        }, {
          value: 'lifestyle',
          label: 'Lifestyle'
        }, {
          value: 'data',
          label: 'Data'
        }],
        value: [],
      }
    },
    methods:{
      updateGigEditFromSelect(){
        this.$emit('updateGigEditFromSelect', this.value)
      }
    }
  }
</script>
