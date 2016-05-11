"use strict";function Datepicker(t){this.options={$dom:document.body,startTime:(new Date).getTime(),endTime:(new Date).getTime(),otherData:{}},this.options=this.extend(!0,this.options,t.options),this.initData=[],this.renderData=[],this.isAcross=!1,this.startMonthArr=[31,28+this.isLeapYear(this.options.startTime),31,30,31,30,31,31,30,31,30,31],this.endMonthArr=[31,28+this.isLeapYear(this.options.endTime),31,30,31,30,31,31,30,31,30,31],this.formatStartDay=null,this.formatEndDay=null,this.renderData=[],this.preData={},this.init()}require("handlebars/runtime");var datepickerTmp=require("./../template/datepicker.js");Datepicker.prototype={constructor:Datepicker,init:function(){var t=this.checkIsLegal();t&&(this.formatStartDay=this.formatDate(this.options.startTime),this.formatEndDay=this.formatDate(this.options.endTime),this.isAcross=this.formatStartDay.year!==this.formatEndDay.year,this.getDatepickData(),this.render())},render:function(){var t=Handlebars.compile(datepickerTmp);this.options.$dom.innerHTML=t({data:this.formatRenderData()})},getDatepickData:function(){var t,a,r=this,e=r.formatStartDay,o=r.formatEndDay,i=e.month,n=o.month,s=r.startMonthArr[e.month-1]<0?12:r.startMonthArr[e.month-1],h=e.oneDay||7,m=7-(r.endMonthArr[n]+o.oneDay)%7,D={},f=10>i?"0"+i:i,y=10>n+2?"0"+(n+2):n+2;m+r.endMonthArr[n]+o.oneDay<42&&(m+=7);var c=function(o,i){for(var n=o;i>=n;n++){t=n+1>10?n+1:"0"+(n+1),a=r.startMonthArr[n];for(var s=1;a>=s;s++)s=10>s?"0"+s:s,D[e.year+"-"+t+"-"+s]={year:e.year,isShow:!0,month:Number(t),text:Number(s),date:e.year+"-"+t+"-"+s},s=Number(s)}};for(s-=h;h>0;h--)s++,D[e.year+"-"+f+"-"+s]={year:e.year,isShow:!1,month:Number(f),text:s,date:e.year+"-"+f+"-"+s};if(this.isAcross){c(i,11);for(var u=0;n>=u;u++){t=u+1>10?u+1:"0"+(u+1),a=r.endMonthArr[u];for(var d=1;a>=d;d++)d=10>d?"0"+d:d,D[o.year+"-"+t+"-"+d]={year:o.year,isShow:!0,month:Number(t),text:Number(d),date:o.year+"-"+t+"-"+d},d=Number(d)}}else c(i,n);for(var u=1;m>=u;u++)D[o.year+"-"+y+"-0"+u]={isShow:!1,month:Number(y),text:Number(u),date:o.year+"-"+y+"-"+u,year:o.year};this.options.otherData&&!$.isEmptyObject(this.options.otherData)&&(D=this.extend(!0,{},D,this.options.otherData)),this.formatData(D)},checkIsLegal:function(){return!(this.options.startTime>this.options.endTime)},formatData:function(t){var a=[];for(var r in t)t.hasOwnProperty(r)&&a.push(t[r]);a.sort(function(t,a){return t.month===a.month?t.text-a.text:t.month-a.month}),this.initData=a},formatRenderData:function(){var t,a,r,e,o=this,i={},n=this.formatStartDay.year,s=this.formatStartDay.month>9?this.formatStartDay.month+1:"0"+(this.formatStartDay.month+1),h=this.formatStartDay.oneDay||7;i[n+"-"+s]={year:n,month:parseInt(s),datepicker:this.initShowData(this.initData.slice(0,42),parseInt(s))},r=42,e=Math.ceil((this.startMonthArr[this.formatStartDay.month]+h)/7);var m=function(s,m){for(var D=s;m>D;D++)a=9>D?"0"+(D+1):D+1,t=o.formatDate(n+"-"+a+"-01"),h=t.oneDay||7,i[n+"-"+a]={year:n,month:t.month+1,datepicker:o.initShowData(o.initData.slice(r-7*(7-e),r-7*(7-e)+42),t.month+1)},r=r-7*(7-e)+42,e=Math.ceil((o.startMonthArr[D]+h)/7)};return this.isAcross?(m(this.formatStartDay.month+1,12),n=this.formatEndDay.year,m(0,this.formatEndDay.month)):m(this.formatStartDay.month+1,this.formatEndDay.month+1),i},initShowData:function(t,a){for(var r=[],e=this.formatDate(),o=[],i=0,n=t.length;n>i;i++)r.push(this.extend({},t[i])),(t[i].month!==a||t[i].text<e.date&&t[i].month===e.month+1)&&(r[i].isShow=!1);for(var i=0;6>i;i++)o.push(r.slice(7*i,7*(i+1)));return o},formatDate:function(t){var a=t?new Date(t):new Date,r=a.getFullYear(),e=a.getMonth(),t=a.getDate(),o=a.getDay();return{year:r,month:e,date:t,day:o,oneDay:Math.abs(t%7-o-1)}},isLeapYear:function(t){var a=this.formatDate(t).year;return a%400===0||a%4===0&&a%100!==0?1:0},extend:function(){var t,a,r,e,o,i,n=arguments[0]||{},s=1,h=arguments.length,m=!1;for("boolean"==typeof n&&(m=n,n=arguments[1]||{},s=2),"object"!=typeof n&&"function"!=typeof n&&(n={}),h===s&&(n=this,--s);h>s;s++)if(null!=(t=arguments[s]))for(a in t)r=n[a],e=t[a],n!==e&&(m&&e&&(e.constructor===Object||(o=e.constructor===Array))?(o?(o=!1,i=r&&r.constructor===Array?r:[]):i=r&&r.constructor===Object?r:{},n[a]=extend(m,i,e)):void 0!==e&&(n[a]=e));return n}},module.exports=Datepicker;