/**
 *  父组件引入子组件
 *    import导入：  import 子组件 from '路径'
 *    定义components： components:{  子组件  }
 *    template中使用： <子组件/> （多单词带-命名 <one-Row/>）
 *
 * 父子组件通信
 *   父组件 <子组件  :data="" />
 *   子组件 使用props接收 定义data属性
 *    props：{
 *      data:{
 *        type: 类型,
 *        default: 默认值,
 *        required: 是否必传
 *      }
 *    }
 *
 *  父组件调用子组件方法
 *    1.子组件定义ref：  <子组件 ref="子组件ref" />
 *    2.子组件中定义方法： 子组件方法名(){}
 *    3.父组件调用ref执行子组件方法: this.$refs.子组件ref.子组件方法名
 *  子组件回调执行父组件方法
 *    1.定义父组件方法: 父组件方法(){}
 *    2.子组件中使用emit回调： this.$emit('回调名', value（可传参数）)
 *    3.template中子组件定义回调方法: <子组件 @回调名="父组件方法" />
 *
 *  watch监听属性
 *      watch：{
 *        监听属性名:{
 *          deep: true, // 需要监听的数据的深度，一般用来监听对象中某个属性的变化,数组字符串一般不需要
 *          handler(){
 *            // watch中需要具体执行的方法
 *          }
 *        }
 *      }
 *
 *  @keyup.enter 回车事件
 */
