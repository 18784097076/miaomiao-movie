<template>
  <div id="detailContainer" class="slide-enter-active">
    <HeaderTop title="详情">
        <i class="iconfont icon-right" @touchstart="goBack"></i>
    </HeaderTop>

    <Loading v-if="isLoading"/>
    <div id="content" class="contentDetail" v-else>
      <div class="detail_list">
        <!-- style中不支持过滤器 -->
        <div class="detail_list_bg" :style="{'background-image': 'url('+ detail.img.replace(/w\.h/,'120.180') +')'}"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detail.img | formatImgUrl(120, 180)" alt="" />
          </div>
          <div class="detail_list_info">
            <h2>{{detail.nm}}</h2>
            <p>{{detail.enm}}</p>
            <p>{{detail.sc}}</p>
            <p>{{detail.cat}}</p>
            <p>{{detail.src}} / {{detail.dur}}分钟</p>
            <p>{{detail.pubDesc}}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>
          {{detail.dra}}
        </p>
      </div>
      <div class="detail_player swiper-container">
        <Swiper>
          <SwiperSlide v-for="(photo,index) in detail.photos" :key="index">
            <div>
              <img :src="photo | formatImgUrl(140, 90)" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTop from '@/components/HeaderTop'

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
    name: 'Detail',
    components: {
        HeaderTop,
        Swiper,
        SwiperSlide
    },
    directives: {
      swiper: directive
    },
    props: ['movieId'],
    mounted() {
      this.getDetail(this.movieId)
    },
    data() {
      return {
        detail: null,
        isLoading: true,
        swiperOptions: {
          slidesPreView: 'auto',
          freeMode: true,
          freeModeSticky: true
        }
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      getDetail(id) {
        this.$axios.get('/ajax/detailmovie', {
          params: {
            movieId: id,
            optimus_uuid: 'BEDC8590053911EB9A5577ABB602C988CEF95AB0B1994C41A216B22F0A914DCB',
            optimus_risk_level: 71,
            optimus_code: 10
          }
        }).then(res=>{
          this.detail = res.data.detailMovie
          this.isLoading = false
          console.log(this.detail)
        })
      }
    }
}
</script>

<style lang="scss" scoped>
#detailContainer{position: absolute;display:flex;flex-direction:column;top:0;left: 0;width: 100%;height: 100%;background: #fff;z-index: 999;}
// 手动写一个动画，使用自带的<transition>组件，iphone有bug
#detailContainer.slide-enter-active{animation: slideMove 1s;}
@keyframes slideMove{
  0%{transform: translateX(100%);}
  100%{transform: translateX(0);}
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}

/deep/ .swiper-wrapper{height: auto;}
/deep/.swiper-slide{ width:70px!important; margin-right: 20px; text-align: center; font-size: 14px;}
/deep/.swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>