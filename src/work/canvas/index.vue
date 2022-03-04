<template>
  <div>1
    <div>
      <el-select v-model="font" @change="draw">
        <el-option
          v-for="item in selectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <img id="image" src="../../../static/img/06-oppo_default_wallpaper.jpg" width="300" height="700" alt="">
    <canvas id="myCanvas" width="300" height="700" />
    <canvas id="my_card" width="300" height="700" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      font: 'font64',
      selectList: [{ label: 'font64', value: 'font64' }, { label: 'fontWenyi', value: 'fontWenyi' }],
      imageUrl: '',
      iconList: [
        'https://stage.cdn-theme.thinkingcloud.net/theme/20210728/8bf354c581aa44cfac60166974779852/icon/com.apple.mobilephone_1627435693495.png',
        'https://stage.cdn-theme.thinkingcloud.net/theme/20210728/8bf354c581aa44cfac60166974779852/icon/com.autonavi.amap_1627435695612.png',
        'https://stage.cdn-theme.thinkingcloud.net/theme/20210728/8bf354c581aa44cfac60166974779852/icon/com.apple.weather_1627435693951.png'
      ],
      background: 'https://stage.cdn-theme.thinkingcloud.net/resource/theme/20220214/3f23fd7c8d4311ec9938765c87d8067e/cover/1644808459691desktop_thumbnail.jpg'
    }
  },
  created() {
    setTimeout(() => {
      this.draw('font64')
      this.createImage()
    }, 1000)
  },
  methods: {
    draw(value) {
      var image = document.getElementById('image')
      var mycanvas = document.getElementById('myCanvas')
      var ctx = mycanvas.getContext('2d')
      mycanvas.width = 300
      mycanvas.height = 700
      // 画图
      ctx.drawImage(image, 0, 0, 300, 700)
      // 写字
      if (value === 'font64') {
        ctx.font = '40px font64'
      } else if (value === 'fontWenyi') {
        ctx.font = '40px fontWenyi'
      }
      ctx.fillText('Hello!中国12345', 10, 50)
    },

    // 生成图片
    createImage() {
      var mycanvas = document.getElementById('my_card')
      var ctx = mycanvas.getContext('2d')
      const image = new Image()
      image.src = this.background

      const promise = new Promise(res => {
        image.onload = function() {
          ctx.drawImage(image, 0, 0, 300, 700)
          res()
        }
      }).then(() => {
        for (var i = 0; i < this.iconList.length; i++) {
          console.log(i)
          ctx.restore()
          const icon = new Image()
          icon.src = this.iconList[i]
          icon.onload = function() {
            ctx.drawImage(icon, 20, i * 50 + 100, 50, 50)
            ctx.save()
          }
        }
      })
    }
  }
}
</script>

<style scoped>
@font-face {
 font-family: 'font64';
 src: url('../../../static/font/font64.ttf');
 font-weight: normal;
 font-style: normal;
}
@font-face {
 font-family: 'fontWenyi';
 src: url('../../../static/font/font_wenyihei.ttf');
 font-weight: normal;
 font-style: normal;
}
</style>
