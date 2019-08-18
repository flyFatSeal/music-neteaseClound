// main.js
import Vue from "vue"; // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import Main from "./waterDrop.vue"; // 引入刚才的 toast 组件

let WaterConstructor = Vue.extend(Main);
let instance;

const WaterDrop = function (parentDom, coordinate) {
    instance = new WaterConstructor({
        data: coordinate
    }); // 渲染组件
    parentDom.appendChild(instance.$mount().$el);
};

export default WaterDrop;
