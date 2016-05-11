webpackJsonp([0,2],[
/* 0 */
/***/ function(module, exports) {

	/**
	 *  @author: matt.liu
	 *  @lastModify：matt.liu
	 *  @lastModiftDate: 2016-03-02
	 *  @fileoverview: 库存日历组件,进行展示有效期呢的库存,最长有效期为12个月（跨年一次）
	 *  @others: 原生js
	 */
	(function() {
		'use strict'
		// require('handlebars/runtime');
		// var datepickerTmp = require('./../template/datepicker.js');

		function Datepicker(obj) {
			//用户可配置属性
			this.options = {
				$dom: document.body, //放置日历的dom
				startTime: new Date().getTime(), //开始时间，为毫秒数
				endTime: new Date().getTime(), //结束时间
				//要在日历上展示的其他信息，格式必须为下列格式
				otherData: {
					// "2016-02-28" : {
					//     "stockId": 1,     //库存Id，保存更新时使用
					//     "selledCount":0,  //已售数
					//     "stock":10        //库存数
					// },
					// "2016-02-29": {
					//     "stockId" : 2,
					//     "selledCount" : 1,
					//     "stock": 10
					// }
				}
			};
			//配置项，需要包括$dom
			this.options = this.extend(true, this.options, obj.options);
			//初始日历数据
			this.initData = [];
			//渲染页面的数据
			this.renderData = [];
			//是否有跨年
			this.isAcross = false;
			//开始日期的月份信息
			this.startMonthArr = [31, 28 + this.isLeapYear(this.options.startTime), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //每个月的天数
			//结束日期的月份信息
			this.endMonthArr = [31, 28 + this.isLeapYear(this.options.endTime), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			//格式化的开始日期
			this.formatStartDay = null;
			//格式化的结束日期
			this.formatEndDay = null;
			//需要渲染的数据
			this.renderData = [];
			this.preData = {};
			this.init();
		}
		Datepicker.prototype = {
			constructor: Datepicker,
			init: function() {
				//判断数据合法性
				var isLegal = this.checkIsLegal();
				if (!isLegal) {
					return;
				}
				//初始化数据
				this.formatStartDay = this.formatDate(this.options.startTime);
				this.formatEndDay = this.formatDate(this.options.endTime);
				this.isAcross = this.formatStartDay.year !== this.formatEndDay.year;
				this.getDatepickData();
				this.formatRenderData();
				this.render();
			},

			//渲染日历组件
			render: function() {
				// var html = Handlebars.compile(datepickerTmp);
				// this.options.$dom.innerHTML = html({
				// 	data: this.formatRenderData()
				// });
			},

			//处理所需展示的日历数据
			getDatepickData: function() {
				var me = this,
					startDay = me.formatStartDay,
					endDay = me.formatEndDay,
					startMonth = startDay.month,
					endMonth = endDay.month,
					startLastDaysNum = me.startMonthArr[startDay.month - 1] < 0 ? 12 : me.startMonthArr[startDay.month - 1],
					//第一个月日历中含有的上个月的天数
					startLastMonthDay = startDay.oneDay || 7,
					//最后一个月日历中含有的下个月的天数
					endLastDay = 7 - (me.endMonthArr[endMonth] + endDay.oneDay) % 7,
					data = {},
					//开始日期的上个月
					startLastMonth = startMonth < 10 ? '0' + startMonth : startMonth,
					//结束日期的下个月
					endNextMonth = (endMonth + 2) < 10 ? '0' + (endMonth + 2) : endMonth + 2,
					thisMonth,
					//当月的天数
					thisDaysNum;
				if (endLastDay + me.endMonthArr[endMonth] + endDay.oneDay < 42) {
					endLastDay += 7;
				}
				//渲染有效期内的日期
				var setDate = function(start, end) {
						for (var i = start; i <= end; i++) {
							thisMonth = (i + 1) > 10 ? i + 1 : '0' + (i + 1);
							thisDaysNum = me.startMonthArr[i];
							for (var k = 1; k <= thisDaysNum; k++) {
								k = k < 10 ? '0' + k : k;
								data[startDay.year + '-' + thisMonth + '-' + k] = {
									year: startDay.year,
									isShow: true,
									month: Number(thisMonth),
									text: Number(k), //显示数字
									date: startDay.year + '-' + thisMonth + '-' + k
								}
								k = Number(k);
							}
						}
					}
					//第一个月份日历中含有的上个月的数据
				for (startLastDaysNum = startLastDaysNum - startLastMonthDay; startLastMonthDay > 0; startLastMonthDay--) {
					startLastDaysNum++;
					data[startDay.year + '-' + startLastMonth + '-' + startLastDaysNum] = {
						year: startDay.year,
						isShow: false, //是否置灰
						month: Number(startLastMonth),
						text: startLastDaysNum, //显示数字
						date: startDay.year + '-' + startLastMonth + '-' + startLastDaysNum
					}
				}

				//有效期内的数据
				if (!this.isAcross) {
					setDate(startMonth, endMonth);
				} else {
					//如果有跨年，不同年的分开渲染
					setDate(startMonth, 11);
					for (var i = 0; i <= endMonth; i++) {
						thisMonth = (i + 1) > 10 ? i + 1 : '0' + (i + 1);
						thisDaysNum = me.endMonthArr[i];
						for (var k = 1; k <= thisDaysNum; k++) {
							k = k < 10 ? '0' + k : k;
							data[endDay.year + '-' + thisMonth + '-' + k] = {
								year: endDay.year,
								isShow: true,
								month: Number(thisMonth),
								text: Number(k), //显示数字
								date: endDay.year + '-' + thisMonth + '-' + k
							}
							k = Number(k);
						}
					}
				}
				//最后一个月份日历中含有的下个月的数据
				for (var i = 1; i <= endLastDay; i++) {
					data[endDay.year + '-' + endNextMonth + '-0' + i] = {
						isShow: false, //是否置灰
						month: Number(endNextMonth),
						text: Number(i), //显示数字
						date: endDay.year + '-' + endNextMonth + '-' + i,
						year: endDay.year
					}
				}
				if (this.options.otherData && !$.isEmptyObject(this.options.otherData)) {
					data = this.extend(true, {}, data, this.options.otherData);
				}
				this.formatData(data);
			},

			//检查传入的参数是否合法
			checkIsLegal: function() {
				if (this.options.startTime > this.options.endTime) {
					return false;
				}
				return true;
			},

			//将数据转化为数组,方便转换和排序、渲染
			formatData: function(data) {
				var arr = [];
				for (var attr in data) {
					if (data.hasOwnProperty(attr)) {
						arr.push(data[attr]);
					}
				}
				arr.sort(function(a, b) {
					if (a.month === b.month) {
						return a.text - b.text;
					} else {
						return a.month - b.month;
					}

				})
				this.initData = arr;
			},

			//根据页面展现形式处理数据，不同业务需求可修改此函数
			formatRenderData: function() {
				var me = this,
					data = {},
					year = this.formatStartDay.year,
					firstMonth = this.formatStartDay.month > 9 ? this.formatStartDay.month + 1 : '0' + (this.formatStartDay.month + 1),
					thisMonth,
					month,
					lastMonthDay = this.formatStartDay.oneDay || 7,
					_index,
					lastWeekIndex; //当前月份最后一周的索引
				data[year + '-' + firstMonth] = {
					year: year,
					month: Number(firstMonth),
					datepicker: this.initShowData(this.initData.slice(0, 42), Number(firstMonth))
				};
				_index = 42;
				lastWeekIndex = Math.ceil((this.startMonthArr[this.formatStartDay.month] + lastMonthDay) / 7);

				var loopData = function(startIndex, endIndex) {
					for (var i = startIndex; i < endIndex; i++) {
						month = i < 9 ? '0' + (i + 1) : i + 1;
						thisMonth = me.formatDate(year + '-' + month + '-01');
						lastMonthDay = thisMonth.oneDay || 7;
						data[year + '-' + month] = {
							year: year,
							month: thisMonth.month + 1,
							datepicker: me.initShowData(me.initData.slice(_index - (7 - lastWeekIndex) * 7, _index - (7 - lastWeekIndex) * 7 + 42), thisMonth.month + 1)
						}
						_index = _index - (7 - lastWeekIndex) * 7 + 42;
						lastWeekIndex = Math.ceil((me.startMonthArr[i] + lastMonthDay) / 7);
					}
				}

				if (!this.isAcross) {
					loopData(this.formatStartDay.month + 1, this.formatEndDay.month + 1);
				} else {
					loopData(this.formatStartDay.month + 1, 12);
					year = this.formatEndDay.year;
					loopData(0, this.formatEndDay.month + 1);

				}
				me.renderData = data;
				// return data;
			},

			//处理日历中的不可操作项
			initShowData: function(data, month) {
				// 处理规则：
				// 	1. 非本月日期置灰
				// 	2. 在今日前面的日期置灰
				var newData = [],
					today = this.formatDate(),
					weekArr = [];
				for (var i = 0, len = data.length; i < len; i++) {
					newData.push(this.extend({}, data[i]));
					if (data[i].month !== month || (data[i].text < today.date && data[i].month === today.month + 1)) {
						newData[i].isShow = false;
					}
				}
				for (var i = 0; i < 6; i++) {
					weekArr.push(newData.slice(i * 7, (i + 1) * 7));
				};
				return weekArr;
			},

			//解析日期
			formatDate: function(date) {
				var time = date ? new Date(date) : new Date(),
					year = time.getFullYear(),
					month = time.getMonth(),
					date = time.getDate(),
					day = time.getDay();
				return {
					year: year,
					month: month,
					date: date,
					day: day,
					oneDay: day > (date - 1) % 7 ? day - (date - 1) % 7 : 7 - ((date - 1) % 7 - day) //本月的第一天对应的星期几
				}
			},

			//判断是否为闰年
			isLeapYear: function(date) {
				var year = this.formatDate(date).year;
				if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
					return 1;
				}
				return 0;
			},

			//根据jquery的extend改写
			extend: function() {
				var options, name, src, copy, copyIsArray, clone,
					target = arguments[0] || {},
					i = 1,
					length = arguments.length,
					deep = false;

				if (typeof target === "boolean") {
					deep = target;
					target = arguments[1] || {};
					i = 2;
				}

				if (typeof target !== "object" && typeof target !== "function") {
					target = {};
				}

				if (length === i) {
					target = this;
					--i;
				}

				for (; i < length; i++) {
					if ((options = arguments[i]) != null) {
						for (name in options) {
							src = target[name];
							copy = options[name];

							if (target === copy) {
								continue;
							}

							if (deep && copy && (copy.constructor === Object || (copyIsArray = copy.constructor === Array))) {
								if (copyIsArray) {
									copyIsArray = false;
									clone = src && src.constructor === Array ? src : [];
								} else {
									clone = src && src.constructor === Object ? src : {};
								}

								target[name] = extend(deep, clone, copy);

							} else if (copy !== undefined) {
								target[name] = copy;
							}
						}
					}
				}
				return target;
			}

		}
	})()


	module.exports = Datepicker;

/***/ }
]);