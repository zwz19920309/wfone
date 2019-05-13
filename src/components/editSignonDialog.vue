<template>
  <el-dialog title="编辑模板" :visible.sync="dialogShow">
    <el-form>
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="模板名称">
            <el-input placeholder="请填写模板名称" v-model="cSignon.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="签到类型:">
            <checkin-type-list :callBack="changeCheckInType" :value="cSignon.checkinype"></checkin-type-list>
          </el-form-item>
          <el-form-item label="签到周期:">
            <date-type-list
              :callBack="changeDateType"
              :type="cSignon.checkinype"
              :value="cSignon.datetype"
            ></date-type-list>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="cSignon.datetype == 5">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="自定义周期:">
            <el-input v-model="cSignon.cycleNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline" v-show="cSignon.checkinype === 2">
          <el-form-item label="支持补签:">
            <el-select v-model="cSignon.isResign" placeholder="请选择">
              <el-option
                v-for="item in supports"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="补签形式:" v-show="cSignon.isResign">
            <el-select v-model="cSignon.formId" placeholder="请选择">
              <el-option
                v-for="item in resignFormList"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline" v-show="cSignon.isResign">
          <el-form-item label="补签消耗:">
            <el-select v-model="cSignon.cost" placeholder="请选择">
              <el-option
                v-for="item in consts"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline" v-show="cSignon.isResign">
          <el-form-item label="可补签日期: ">
            <textarea
              rows="6"
              v-model="calendarObj.display"
              cols="40"
              @click="openMultiByDrop($event)"
            ></textarea>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="场景描述:">
            <el-input
              type="textarea"
              :rows="4"
              style="width: 350px;"
              placeholder="请填写描述"
              v-model="cSignon.rule_desc"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <transition name="fade">
          <div class="calendar-dropdown" v-if="calendarObj.show">
            <calendar
              :zero="calendarObj.zero"
              :lunar="calendarObj.lunar"
              :value="calendarObj.value"
              :multi="calendarObj.multi"
              @select="calendarObj.select"
            ></calendar>
          </div>
        </transition>
      </div>
      <div class="pad10 t-right">
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { DATETYPEVALUE } from '@/common/common'
import { getResignFormList } from '@/api/getData'
export default {
  components: {
    'checkin-type-list': () => import('@/components/checkinTypeList.vue'),
    'date-type-list': () => import('@/components/dateTypeList.vue'),
    'calendar': () => import('@/components/common/calendar/calendar.vue')
  },
  data() {
    return {
      cSignon: { name: '', rule_desc: '', period: '', checkinype: 1, datetype: 1, cycleNum: '0', isResign: 0, formId: 1, cost: 1, resignDates: [] },
      dialogShow: false,
      supports: [{ type: 0, name: '否' }, { type: 1, name: '是' }],
      consts: [{ type: 1, name: '无偿补签' }, { type: 2, name: '有偿补签' }],
      resignFormList: [],
      calendarObj: {
        display: '',
        multi: true,
        show: false,
        zero: true,
        value: [], // 默认日期
        lunar: true, // 显示农历
        select: value => {
          console.log('selectValue: ', value)
          let displayValue = []
          value.forEach(v => {
            let date =
              v[0] +
              '-' +
              (v[1] >= 10 ? v[1] : '0' + v[1]) +
              '-' +
              (v[2] >= 10 ? v[2] : '0' + v[2])
            displayValue.push(date)
          })
          this.calendarObj.value = value
          this.cSignon.resignDates = displayValue
          this.calendarObj.display = displayValue.join(',')
        }
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      let res = await getResignFormList()
      if (res.status === 200) {
        this.resignFormList = res.data.list
      }
    },
    changeCheckInType(data) { // 签到类型
      this.cSignon.checkinype = data.type
      this.cSignon.datetype = ''
    },
    changeDateType(data) {// 日期类型
      this.cSignon.datetype = data.type
    },
    submit() {
      console.log('new--signOn: ', this.cSignon)
      this.callBack && this.callBack(this.cSignon)
    },
    open(params) { // 参数dynamic
      this.dynamic = params
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
    },
    openMultiByDrop(e) {
      this.calendarObj.show = true
      e.stopPropagation()
      window.setTimeout(() => {
        document.addEventListener(
          'click',
          e => {
            this.calendarObj.show = false
            document.removeEventListener('click', () => { }, false)
          },
          false
        )
      }, 1000)
    }
  },
  props: ['signon', 'callBack'],
  watch: {
    'signon': function (newVal, oldVal) {
      if (newVal) {
        console.log('@changeSizeon: ', newVal)
        this.cSignon = newVal
        if (this.cSignon.resignDates) {
          let arr = []
          this.cSignon.resignDates.forEach(ele => {
            let dates = ele.split('-')
            arr.push([
              parseInt(dates[0]),
              parseInt(dates[1]),
              parseInt(dates[2])
            ])
          })
          this.calendarObj.select(arr)
        }
      }
      // this.cSignon.isResign = newVal.extra_text && newVal.extra_text.resign && newVal.extra_text.resign.isResign ? newVal.extra_text.resign.isResign : 1
      // this.cSignon.cost = newVal.extra_text && newVal.extra_text.resign && newVal.extra_text.resign.cost ? newVal.extra_text.resign.cost : 1
      // this.cSignon.formId = newVal.extra_text && newVal.extra_text.resign && newVal.extra_text.formId ? newVal.extra_text.resign.formId : 1
      //}
    }
  }
}
</script>

<style lang="less">
.t-right {
  text-align: right;
}
/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}

/*下拉框*/
.calendar-dropdown {
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
  margin-left: -250px;
  margin-top: -300px;
}
.calendar-dropdown:before {
  position: absolute;
  left: 30px;
  top: -10px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #dedede;
}
.calendar-dropdown:after {
  position: absolute;
  left: 30px;
  top: -9px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}

/*弹出框*/
.calendar-dialog {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.calendar-dialog-mask {
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
}

.calendar-dialog-body {
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}
</style>
