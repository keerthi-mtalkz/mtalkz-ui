(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2584],{50743:function(t,e){!function(n,r){var a={version:"0.4.1",settings:{currency:{symbol:"$",format:"%s%v",decimal:".",thousand:",",precision:2,grouping:3},number:{precision:0,grouping:3,thousand:",",decimal:"."}}},o=Array.prototype.map,u=Array.isArray,i=Object.prototype.toString;function c(t){return!!(""===t||t&&t.charCodeAt&&t.substr)}function s(t){return u?u(t):"[object Array]"===i.call(t)}function f(t){return t&&"[object Object]"===i.call(t)}function l(t,e){var n;for(n in t=t||{},e=e||{})e.hasOwnProperty(n)&&null==t[n]&&(t[n]=e[n]);return t}function p(t,e,n){var r,a,u=[];if(!t)return u;if(o&&t.map===o)return t.map(e,n);for(r=0,a=t.length;r<a;r++)u[r]=e.call(n,t[r],r,t);return u}function h(t,e){return t=Math.round(Math.abs(t)),isNaN(t)?e:t}function d(t){var e=a.settings.currency.format;return"function"===typeof t&&(t=t()),c(t)&&t.match("%v")?{pos:t,neg:t.replace("-","").replace("%v","-%v"),zero:t}:t&&t.pos&&t.pos.match("%v")?t:c(e)?a.settings.currency.format={pos:e,neg:e.replace("%v","-%v"),zero:e}:e}var v=a.unformat=a.parse=function(t,e){if(s(t))return p(t,(function(t){return v(t,e)}));if("number"===typeof(t=t||0))return t;e=e||a.settings.number.decimal;var n=new RegExp("[^0-9-"+e+"]",["g"]),r=parseFloat((""+t).replace(/\((.*)\)/,"-$1").replace(n,"").replace(e,"."));return isNaN(r)?0:r},y=a.toFixed=function(t,e){e=h(e,a.settings.number.precision);var n=Math.pow(10,e);return(Math.round(a.unformat(t)*n)/n).toFixed(e)},b=a.formatNumber=a.format=function(t,e,n,r){if(s(t))return p(t,(function(t){return b(t,e,n,r)}));t=v(t);var o=l(f(e)?e:{precision:e,thousand:n,decimal:r},a.settings.number),u=h(o.precision),i=t<0?"-":"",c=parseInt(y(Math.abs(t||0),u),10)+"",d=c.length>3?c.length%3:0;return i+(d?c.substr(0,d)+o.thousand:"")+c.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+o.thousand)+(u?o.decimal+y(Math.abs(t),u).split(".")[1]:"")},m=a.formatMoney=function(t,e,n,r,o,u){if(s(t))return p(t,(function(t){return m(t,e,n,r,o,u)}));t=v(t);var i=l(f(e)?e:{symbol:e,precision:n,thousand:r,decimal:o,format:u},a.settings.currency),c=d(i.format);return(t>0?c.pos:t<0?c.neg:c.zero).replace("%s",i.symbol).replace("%v",b(Math.abs(t),h(i.precision),i.thousand,i.decimal))};a.formatColumn=function(t,e,n,r,o,u){if(!t)return[];var i=l(f(e)?e:{symbol:e,precision:n,thousand:r,decimal:o,format:u},a.settings.currency),y=d(i.format),m=y.pos.indexOf("%s")<y.pos.indexOf("%v"),g=0,O=p(t,(function(t,e){if(s(t))return a.formatColumn(t,i);var n=((t=v(t))>0?y.pos:t<0?y.neg:y.zero).replace("%s",i.symbol).replace("%v",b(Math.abs(t),h(i.precision),i.thousand,i.decimal));return n.length>g&&(g=n.length),n}));return p(O,(function(t,e){return c(t)&&t.length<g?m?t.replace(i.symbol,i.symbol+new Array(g-t.length+1).join(" ")):new Array(g-t.length+1).join(" ")+t:t}))},t.exports&&(e=t.exports=a),e.accounting=a}()},44174:function(t){t.exports=function(t,e,n,r){for(var a=-1,o=null==t?0:t.length;++a<o;){var u=t[a];e(r,u,n(u),t)}return r}},81119:function(t,e,n){var r=n(89881);t.exports=function(t,e,n,a){return r(t,(function(t,r,o){e(a,t,n(t),o)})),a}},89465:function(t,e,n){var r=n(38777);t.exports=function(t,e,n){"__proto__"==e&&r?r(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}},89881:function(t,e,n){var r=n(47816),a=n(99291)(r);t.exports=a},28483:function(t,e,n){var r=n(25063)();t.exports=r},47816:function(t,e,n){var r=n(28483),a=n(3674);t.exports=function(t,e){return t&&r(t,e,a)}},97786:function(t,e,n){var r=n(71811),a=n(69139);t.exports=function(t,e){for(var n=0,o=(e=r(e,t)).length;null!=t&&n<o;)t=t[a(e[n++])];return n&&n==o?t:void 0}},13:function(t){t.exports=function(t,e){return null!=t&&e in Object(t)}},2958:function(t,e,n){var r=n(46384),a=n(90939);t.exports=function(t,e,n,o){var u=n.length,i=u,c=!o;if(null==t)return!i;for(t=Object(t);u--;){var s=n[u];if(c&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++u<i;){var f=(s=n[u])[0],l=t[f],p=s[1];if(c&&s[2]){if(void 0===l&&!(f in t))return!1}else{var h=new r;if(o)var d=o(l,p,f,t,e,h);if(!(void 0===d?a(p,l,3,o,h):d))return!1}}return!0}},67206:function(t,e,n){var r=n(91573),a=n(16432),o=n(6557),u=n(1469),i=n(39601);t.exports=function(t){return"function"==typeof t?t:null==t?o:"object"==typeof t?u(t)?a(t[0],t[1]):r(t):i(t)}},91573:function(t,e,n){var r=n(2958),a=n(1499),o=n(42634);t.exports=function(t){var e=a(t);return 1==e.length&&e[0][2]?o(e[0][0],e[0][1]):function(n){return n===t||r(n,t,e)}}},16432:function(t,e,n){var r=n(90939),a=n(27361),o=n(79095),u=n(15403),i=n(89162),c=n(42634),s=n(69139);t.exports=function(t,e){return u(t)&&i(e)?c(s(t),e):function(n){var u=a(n,t);return void 0===u&&u===e?o(n,t):r(e,u,3)}}},40371:function(t){t.exports=function(t){return function(e){return null==e?void 0:e[t]}}},79152:function(t,e,n){var r=n(97786);t.exports=function(t){return function(e){return r(e,t)}}},71811:function(t,e,n){var r=n(1469),a=n(15403),o=n(55514),u=n(79833);t.exports=function(t,e){return r(t)?t:a(t,e)?[t]:o(u(t))}},55189:function(t,e,n){var r=n(44174),a=n(81119),o=n(67206),u=n(1469);t.exports=function(t,e){return function(n,i){var c=u(n)?r:a,s=e?e():{};return c(n,t,o(i,2),s)}}},99291:function(t,e,n){var r=n(98612);t.exports=function(t,e){return function(n,a){if(null==n)return n;if(!r(n))return t(n,a);for(var o=n.length,u=e?o:-1,i=Object(n);(e?u--:++u<o)&&!1!==a(i[u],u,i););return n}}},25063:function(t){t.exports=function(t){return function(e,n,r){for(var a=-1,o=Object(e),u=r(e),i=u.length;i--;){var c=u[t?i:++a];if(!1===n(o[c],c,o))break}return e}}},38777:function(t,e,n){var r=n(10852),a=function(){try{var t=r(Object,"defineProperty");return t({},"",{}),t}catch(e){}}();t.exports=a},1499:function(t,e,n){var r=n(89162),a=n(3674);t.exports=function(t){for(var e=a(t),n=e.length;n--;){var o=e[n],u=t[o];e[n]=[o,u,r(u)]}return e}},222:function(t,e,n){var r=n(71811),a=n(35694),o=n(1469),u=n(65776),i=n(41780),c=n(69139);t.exports=function(t,e,n){for(var s=-1,f=(e=r(e,t)).length,l=!1;++s<f;){var p=c(e[s]);if(!(l=null!=t&&n(t,p)))break;t=t[p]}return l||++s!=f?l:!!(f=null==t?0:t.length)&&i(f)&&u(p,f)&&(o(t)||a(t))}},15403:function(t,e,n){var r=n(1469),a=n(33448),o=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,u=/^\w*$/;t.exports=function(t,e){if(r(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!a(t))||(u.test(t)||!o.test(t)||null!=e&&t in Object(e))}},89162:function(t,e,n){var r=n(13218);t.exports=function(t){return t===t&&!r(t)}},42634:function(t){t.exports=function(t,e){return function(n){return null!=n&&(n[t]===e&&(void 0!==e||t in Object(n)))}}},24523:function(t,e,n){var r=n(88306);t.exports=function(t){var e=r(t,(function(t){return 500===n.size&&n.clear(),t})),n=e.cache;return e}},55514:function(t,e,n){var r=n(24523),a=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,o=/\\(\\)?/g,u=r((function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(a,(function(t,n,r,a){e.push(r?a.replace(o,"$1"):n||t)})),e}));t.exports=u},69139:function(t,e,n){var r=n(33448);t.exports=function(t){if("string"==typeof t||r(t))return t;var e=t+"";return"0"==e&&1/t==-Infinity?"-0":e}},27361:function(t,e,n){var r=n(97786);t.exports=function(t,e,n){var a=null==t?void 0:r(t,e);return void 0===a?n:a}},79095:function(t,e,n){var r=n(13),a=n(222);t.exports=function(t,e){return null!=t&&a(t,e,r)}},6557:function(t){t.exports=function(t){return t}},24350:function(t,e,n){var r=n(89465),a=n(55189)((function(t,e,n){r(t,n,e)}));t.exports=a},88306:function(t,e,n){var r=n(83369);function a(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError("Expected a function");var n=function(){var r=arguments,a=e?e.apply(this,r):r[0],o=n.cache;if(o.has(a))return o.get(a);var u=t.apply(this,r);return n.cache=o.set(a,u)||o,u};return n.cache=new(a.Cache||r),n}a.Cache=r,t.exports=a},39601:function(t,e,n){var r=n(40371),a=n(79152),o=n(15403),u=n(69139);t.exports=function(t){return o(t)?r(u(t)):a(t)}},46799:function(t,e,n){"use strict";var r=n(83454);e.bp=e.xj=e.AW=e.Fk=e.n4=e.$Q=e.x1=e.by=e.$I=void 0;var a=s(n(67294)),o=s(n(45697)),u=s(n(17757)),i=s(n(18446)),c=s(n(24350));function s(t){return t&&t.__esModule?t:{default:t}}function f(){return f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},f.apply(this,arguments)}function l(t){return l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function p(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){E(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function b(t,e,n){return e&&y(t.prototype,e),n&&y(t,n),t}function m(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&g(t,e)}function g(t,e){return g=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},g(t,e)}function O(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=w(t);if(e){var a=w(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return x(this,n)}}function x(t,e){return!e||"object"!==l(e)&&"function"!==typeof e?j(t):e}function j(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}function E(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var k="undefined"!==typeof r&&r.env&&"production",I=function(t){m(n,t);var e=O(n);function n(){var t;return v(this,n),E(j(t=e.call(this)),"handleOnClick",(function(e){var n=t.chartInstance,r=t.props,a=r.getDatasetAtEvent,o=r.getElementAtEvent,u=r.getElementsAtEvent,i=r.onElementsClick;a&&a(n.getDatasetAtEvent(e),e),o&&o(n.getElementAtEvent(e),e),u&&u(n.getElementsAtEvent(e),e),i&&i(n.getElementsAtEvent(e),e)})),E(j(t),"ref",(function(e){t.element=e})),t.chartInstance=void 0,t}return b(n,[{key:"componentDidMount",value:function(){this.renderChart()}},{key:"componentDidUpdate",value:function(){if(this.props.redraw)return this.destroyChart(),void this.renderChart();this.updateChart()}},{key:"shouldComponentUpdate",value:function(t){var e=this.props,n=(e.redraw,e.type),r=e.options,a=e.plugins,o=e.legend,u=e.height,c=e.width;if(!0===t.redraw)return!0;if(u!==t.height||c!==t.width)return!0;if(n!==t.type)return!0;if(!(0,i.default)(o,t.legend))return!0;if(!(0,i.default)(r,t.options))return!0;var s=this.transformDataProp(t);return!(0,i.default)(this.shadowDataProp,s)||!(0,i.default)(a,t.plugins)}},{key:"componentWillUnmount",value:function(){this.destroyChart()}},{key:"transformDataProp",value:function(t){var e=t.data;return"function"==typeof e?e(this.element):e}},{key:"memoizeDataProps",value:function(){if(this.props.data){var t=this.transformDataProp(this.props);return this.shadowDataProp=d(d({},t),{},{datasets:t.datasets&&t.datasets.map((function(t){return d({},t)}))}),this.saveCurrentDatasets(),t}}},{key:"checkDatasets",value:function(t){var e="production"!==k&&"prod"!==k,r=this.props.datasetKeyProvider!==n.getLabelAsKey,a=t.length>1;if(e&&a&&!r){var o=!1;t.forEach((function(t){t.label||(o=!0)})),o&&console.error('[react-chartjs-2] Warning: Each dataset needs a unique key. By default, the "label" property on each dataset is used. Alternatively, you may provide a "datasetKeyProvider" as a prop that returns a unique key.')}}},{key:"getCurrentDatasets",value:function(){return this.chartInstance&&this.chartInstance.config.data&&this.chartInstance.config.data.datasets||[]}},{key:"saveCurrentDatasets",value:function(){var t=this;this.datasets=this.datasets||{},this.getCurrentDatasets().forEach((function(e){t.datasets[t.props.datasetKeyProvider(e)]=e}))}},{key:"updateChart",value:function(){var t=this,e=this.props.options,n=this.memoizeDataProps(this.props);if(this.chartInstance){e&&(this.chartInstance.options=u.default.helpers.configMerge(this.chartInstance.options,e));var r=this.getCurrentDatasets(),a=n.datasets||[];this.checkDatasets(r);var o=(0,c.default)(r,this.props.datasetKeyProvider);this.chartInstance.config.data.datasets=a.map((function(e){var n=o[t.props.datasetKeyProvider(e)];if(n&&n.type===e.type&&e.data){n.data.splice(e.data.length),e.data.forEach((function(t,r){n.data[r]=e.data[r]}));e.data;var r=p(e,["data"]);return d(d({},n),r)}return e}));n.datasets;var i=p(n,["datasets"]);this.chartInstance.config.data=d(d({},this.chartInstance.config.data),i),this.chartInstance.update()}}},{key:"renderChart",value:function(){var t=this.props,e=t.options,r=t.legend,a=t.type,o=t.plugins,c=this.element,s=this.memoizeDataProps();"undefined"===typeof r||(0,i.default)(n.defaultProps.legend,r)||(e.legend=r),this.chartInstance=new u.default(c,{type:a,data:s,options:e,plugins:o})}},{key:"destroyChart",value:function(){if(this.chartInstance){this.saveCurrentDatasets();var t=Object.values(this.datasets);this.chartInstance.config.data.datasets=t,this.chartInstance.destroy()}}},{key:"render",value:function(){var t=this.props,e=t.height,n=t.width,r=t.id;return a.default.createElement("canvas",{ref:this.ref,height:e,width:n,id:r,onClick:this.handleOnClick})}}]),n}(a.default.Component);E(I,"getLabelAsKey",(function(t){return t.label})),E(I,"propTypes",{data:o.default.oneOfType([o.default.object,o.default.func]).isRequired,getDatasetAtEvent:o.default.func,getElementAtEvent:o.default.func,getElementsAtEvent:o.default.func,height:o.default.number,legend:o.default.object,onElementsClick:o.default.func,options:o.default.object,plugins:o.default.arrayOf(o.default.object),redraw:o.default.bool,type:function(t,e,n){if(!u.default.controllers[t[e]])return new Error("Invalid chart type `"+t[e]+"` supplied to `"+n+"`.")},width:o.default.number,datasetKeyProvider:o.default.func}),E(I,"defaultProps",{legend:{display:!0,position:"bottom"},type:"doughnut",height:150,width:300,redraw:!1,options:{},datasetKeyProvider:I.getLabelAsKey});var C=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"doughnut"}))}}]),n}(a.default.Component);e.$I=C;var P=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"pie"}))}}]),n}(a.default.Component);e.by=P;var D=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"line"}))}}]),n}(a.default.Component);e.x1=D;var A=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"bar"}))}}]),n}(a.default.Component);e.$Q=A;var _=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"horizontalBar"}))}}]),n}(a.default.Component);e.n4=_;var M=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"radar"}))}}]),n}(a.default.Component);e.Fk=M;var S=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"polarArea"}))}}]),n}(a.default.Component);e.AW=S;var K=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"bubble"}))}}]),n}(a.default.Component);e.xj=K;var $=function(t){m(n,t);var e=O(n);function n(){return v(this,n),e.apply(this,arguments)}return b(n,[{key:"render",value:function(){var t=this;return a.default.createElement(I,f({},this.props,{ref:function(e){return t.chartInstance=e&&e.chartInstance},type:"scatter"}))}}]),n}(a.default.Component);e.bp=$,u.default.defaults}}]);