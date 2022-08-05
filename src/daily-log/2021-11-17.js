/**
 *  毛玻璃css特效
 *  path: vue-element-admin\admin\index.vue
 *
 *  v-for循环组件需要prop传值，尽量不在子组件中更新父组件传来的值
 *
 *  获取数组中某一值位置，this.list.indexOf(data)
 *
 *  2022-08-05
 *    1. js  text.textContent 获取DOM纯文本
 *
 *  2. css毛玻璃特效
 *  <div id="glass" class="glass-container"/>
      .glass-container{
        width: 700px;
        height: 375px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        backdrop-filter: blur(13px);
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
        border: 0px rgba(255, 255, 255, 0.4) solid;
        border-bottom: 0px rgba(40, 40, 40 0.35) solid;
        border-right: 0px rgba(40, 40, 40 0.35) solid;
        border-radius: 100px;
      }
      https://glassgenerator.netlify.app/#
 *
 *
 * 3. npm install jszip
 *  jsZip 压缩解压
 */
