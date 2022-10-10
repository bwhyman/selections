# mentor-selection
毕业设计选择导师前端实现   

后端源码：https://github.com/bwhyman/mentor-selection

### update 
#### 2022.10.10
移植到pinia  
pinia的vue-demi依赖vue，按cdn引入vue在本地打包时不会转换vue-demi中变量。也许通过cdn引入vue-demi


#### 2022.09.16
追加直接导入导师数据表格  
处理唯一约束异常  

#### 2021.11.27
添加插件，编译时直接生成gzip压缩文件，减少服务器执行压缩算法的资源消耗  

#### 2021.11.23
vite重构  
elment-plus官方将icon的使用方法改为引入组件的方式，几天时间就变了    
element-plus打包需在tsconfig.json，添加"skipLibCheck": true属性，推荐以下方式  
或引入rollup-plugin-external-globals插件，配置vite.config.ts，编译vue/element-plus/xlsx时忽略替换，引入外部CDN节点资源，可减少编译尺寸  
将外部xlsx在组件中动态引入，避免无需使用的全局引入  

#### 2021.11.08
改进选导师界面  
增加导出excel  
vue3-vuetify一直没出，当年vuefify更新的极快  
使用element-plus图快没有按需引入组件   
组件内逻辑全写setup()里了，没有分离为独立函数  
无权限请求跳转至登录页面  