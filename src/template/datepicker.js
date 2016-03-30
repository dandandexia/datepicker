module.exports = '{{#each data}}\
<div class="m_dadepicker_wrapper" data-rel="{{@key}}">\
	<h3 class="m_datepicker_title">{{year}}年{{month}}月</h3>\
	<table class="m_datepicker">\
		<tr class="m_datepicker_header">\
			<th>周日</th>\
			<th>周一</th>\
			<th>周二</th>\
			<th>周三</th>\
			<th>周四</th>\
			<th>周五</th>\
			<th>周六</th>\
		</tr>\
		<tbody class="m_datepicker_body">\
			{{#each this.datepicker}}\
			<tr>\
				{{#each this}}\
				<td class="{{#if isShow}}date-btn{{else}}gray{{/if}} {{date}}"  data-rel="{{date}}"\ data-pickUpId="{{stockId}}" data-stock="{{stock}}" {{#if isShow}}ms-click="setStock"\
				{{/if}}>\
				<p class="date">{{text}}</p>\
				<p class="date">\
				{{#if isShow}}<span class="orange">{{selledCount}}\
				</span>/<span class="inventory">{{stock}}</span>台{{/if}}\
				</p>\
				</td>\
				{{/each}}\
			</tr>\
			{{/each}}\
		</tbody>\
	</table>\
</div>\
{{/each}}';
