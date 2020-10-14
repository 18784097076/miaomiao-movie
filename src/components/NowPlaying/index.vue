<template>
  <div class="movie_body">
    <Loading v-if="isLoading"/>
    <!-- 父组件给子组件传递一个Function，子组件中正在滚动时和滚动完成时调用传给它的方法。也可以使用传统的子传父 -->
    <Scroller v-else :handleToScroll="handleToScroll" :handleToScrollEnd="handleToScrollEnd">
      <ul>
        <li v-for="movie in nowPlayingList" :key="movie.id">
          <div class="pic_show"><img :src="movie.img | formatImgUrl(120, 180)" /></div>
          <div class="info_list">
            <h2>
              {{movie.nm}}
              <img v-if="movie.version" :src="require(`@/assets/${movie.version=='v2d imax'?'2':'3'}d.png`)"/>
            </h2>
            <p>观众评 <span class="grade">{{movie.sc}}</span></p>
            <p>主演: {{movie.star}}</p>
            <p>{{movie.showInfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
import {MessageBox} from '@/components/JS'

export default {
    name: 'NowPlaying',
    data() {
      return {
        nowPlayingList: [],
        isLoading: true,   // 是否显示loading
        prevCityId: -1
      }
    },
    // components: {
    //   Scroller
    // },
    methods: {
      handleToScroll(pos) {
        // 正在滚动   可以通过pos.y获取滚动的高度，当滚动的高度>30，重新发送请求，实现下拉刷新的操作
        console.log('正在滚动',pos)
      },
      handleToScrollEnd(pos) {
        // 滚动完成
        console.log('滚动完成',pos)
      }
    },
    activated() {
      let nowId = this.$store.state.city.nowId
      if(nowId == this.prevCityId){
        return;
      }
      this.isLoading = true
      this.$axios.get('/ajax/movieOnInfoList?cityId=' + nowId)
      .then(res => {
        // console.log(res)
        if(res.status == 200) {
          this.nowPlayingList = res.data.movieList
          // 关闭loading
          this.isLoading = false
          this.prevCityId = nowId
        }
      })
    }
    // beforeRouteEnter (to, from, next) {
    //   // 在路由进入之前，组件实例还未渲染
    //   // 无法获取this实例，只能通过vm来访问组件实例
    //   next(vm => vm.formPath = from.path)
    // },
    // 被 keep-alive 缓存的组件激活时调用，nowPlay组件被缓存了，它被激活时调用
    // activated() {
    //   // 如果from是来自/movie/city 或 /，再重新发请求                 
    //   if(this.formPath == '/movie/city' || this.formPath == '/'){
    //     this.isLoading = true
    //     // 当前城市id，可以从store中取，也可以从this.$store.query中取
    //     this.$axios.get('/ajax/movieOnInfoList?cityId=' + this.$store.state.city.nowId)
    //       .then(res => {
    //         // console.log(res)
    //         if(res.status == 200) {
    //           this.nowPlayingList = res.data.movieList
    //           // 关闭loading
    //           this.isLoading = false
    //         }
    //       })
    //   }
    // }
}
</script>

<style>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>