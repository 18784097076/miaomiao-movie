<template>
  <div id="main">
    <HeaderTop/>

    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{$store.state.city.nowCity}}</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link to="/movie/nowPlaying" tag="div" class="hot_item">正在热映</router-link>
          <router-link to="/movie/comingSoon" tag="div" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>

      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    
    <TabBar/>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop";
import TabBar from "@/components/TabBar";
import { messageBox } from '@/components/JS'

export default {
  name: 'Movie',
  components: {
    HeaderTop,
    TabBar
  },
  mounted() {
    setTimeout(()=>{
      // 调用获取位置api   返回城市id 和 nm
      // 如果返回的id和store中的nowId一致，那么就不应该弹出messageBox
      messageBox({
        title: '定位',
        content: '上海',
        cancel: '取消',
        ok: '切换定位',
        handleCancel() {
          console.log('取消')
        },
        handleOK() {
          console.log('确认')
          // 点击切换之后，应该修改localstrage中的nowCity和nowId
          // 然后window.location.reload()   重新加载页面
        }
      })
    }, 3000)
  }
};
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>