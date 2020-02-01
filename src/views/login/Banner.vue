<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
        v-for="(str, index) in listImg"
        :key="index">
        <img class="img_responsive"
          :src="str.url" />
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  props: ['listImg'],
  mounted() {
    new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      paginationHide: true,
      autoplayDisableOnInteraction: false,
      loop: true,
      speed: 2000,
      autoplay: 3000,
      effect: 'fade'
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.swiper-container {
  width: 100%;
  height: 100%;
  z-index: 4;
  .swiper-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-pagination-bullet {
    // width: 0.833rem;
    // height: 0.833rem;
    // display: inline-block;
    // background: #7c5e53;
    display: inline-block;
    width: 0.833rem;
    height: 0.833rem;
    margin: 0 8px;
    text-indent: -999em;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
    opacity: 0.4;
    -webkit-transition: background 0.5s, opacity 0.5s;
    -moz-transition: background 0.5s, opacity 0.5s;
    transition: background 0.5s, opacity 0.5s;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
}

</style>