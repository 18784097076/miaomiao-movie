<template>
  <div class="city_body">
    <div class="city_list" ref="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="city in hotCityList" :key="city.id">{{city.nm}}</li>
        </ul>
      </div>
      <div class="city_sort">
        <div v-for="(cities, letter) in formatCityList" :key="letter">
          <h2 :ref="letter">{{letter}}</h2>
          <ul>
            <li v-for="city in cities" :key="city.id">{{city.nm}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(city,letter) in formatCityList" :key="letter" @click="scrollToLetter(letter)">{{letter}}</li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: 'City',
  data() {
    return {
      cityList: []
    }
  },
  mounted() {
    this.$axios.get('/dianying/cities.json').then(res=>{
      if(res.status == 200) {
        this.cityList = res.data.cts
      }
    })
  },
  computed: {
    hotCityList() {
      return this.cityList.filter(city => city.id < 58)
    },
    formatCityList() {
      let obj = {}
      for(let i=65;i<91;i++){
        let letter = String.fromCharCode(i)
        obj[letter] = [] 
      }
      for(let letter in obj){
        obj[letter] = this.cityList.filter(city => city.py.substring(0,1).toUpperCase() == letter)
        if(!obj[letter].length){
          delete obj[letter]
        } 
      }
      return obj
    }
  },
  methods: {
    scrollToLetter(letter) {
      console.log(this.$refs[letter][0].offsetTop)
      // this.$refs[letter][0].offsetTop 获取h2相对于最近的已定位祖先元素(city_list)的上偏移
      // h2滚动至h2相对于city_list的偏移
      this.$refs['city_list'].scrollTop = this.$refs[letter][0].offsetTop
    }
  }
};
</script>

<style lang="scss" scoped>
#content .city_body{ flex: 1; display: flex; width:100%; overflow: auto;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;position: relative;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>