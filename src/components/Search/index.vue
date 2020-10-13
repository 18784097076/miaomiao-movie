<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="kw" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li v-for="movie in searchList" :key="movie.id">
          <div class="img"><img :src="movie.img  | formatImgUrl(120, 180)" /></div>
          <div class="info">
            <p><span>{{movie.nm}}</span><span v-if="movie.sc">{{movie.sc}}</span></p>
            <p>{{movie.enm}}</p>
            <p>{{movie.cat}}</p>
            <p>{{movie.rt}}上映</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CiList from '@/components/CiList'
export default {
  name: "Search",
  components: {
    CiList
  },
  data() {
    return {
      kw: "",
      searchList: []
    };
  },
  methods: {
    cancelReq() {
      if (typeof this.source === "function") {
        this.source("取消请求");
      }
    },
  },
  watch: {
    kw(newValue) {
      this.cancelReq();
      this.searchList = []

      this.$axios.get('/ajax/search',{
        params: {
          kw: this.kw,
          cityId: "40",
          stype: "-1",
        },
        cancelToken: new this.$axios.CancelToken((cancel) => {
          this.source = cancel;
        })
      })
        .then((res) => {
          if(res.status == 200 && res.data.movies){
            this.searchList = res.data.movies.list
          }
        })
        .catch((err) => {
          if (this.$axios.isCancel(err)) {
            // 返回取消请求信息
            console.log("Rquest canceled", err.message);
          } else {
            console.log(err);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#content .search_body {
  flex: 1;
  overflow: auto;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}
.search_body .search_result {
}
.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}
.search_body .search_result ul {
}
.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result .img {
  width: 60px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
}
</style>