<template>
  <div class="fillcontain">
    <div class="mar10">
      <div class="pad10">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="模板名称">
            <el-input placeholder="请填写模板名称" v-model="params.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <span>签到类型：</span>
        <checkin-type-list :callBack="getCheckinType"></checkin-type-list>
      </div>
      <div class="pad10">
        <span>签到时间：</span>
        <date-type-list :type="checkinTypeVal" :callBack="getDateType"></date-type-list>
      </div>
      <div class="pad10" v-if="dateTypeVal === deteMethods.USERDEFINED">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="自定义时间段:">
            <el-input placeholder="请填写时间" v-model="params.number"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10" v-show="checkinTypeVal === 2">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="支持补签:">
            <el-select v-model="resign.isResign" placeholder="请选择">
              <el-option
                v-for="item in supports"
                :key="item.type"
                :label="item.name"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10" v-show="checkinTypeVal === 2 && resign.isResign === 2">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="补签形式:">
            <el-select v-model="resign.formId" placeholder="请选择">
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
      <div class="pad10" v-show="checkinTypeVal === 2 && resign.isResign === 2">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="补签消耗:">
            <el-select v-model="resign.cost" placeholder="请选择">
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
      <div class="pad10" v-show="(checkinTypeVal === 2 && resign.isResign === 2)">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="可补签日期: ">
            <textarea
              rows="10"
              v-model="calendarObj.display"
              cols="40"
              @click="openMultiByDrop($event)"
            ></textarea>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="模板规则描述">
            <el-input
              type="textarea"
              :rows="8"
              style="width: 450px;"
              placeholder="请填写描述"
              v-model="params.desc"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <el-button type="primary" @click="submit">确认提交</el-button>
      </div>
    </div>
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
</template>

<script>
import calendar from '@/components/common/calendar/calendar.vue'
import { DATETYPE } from '@/common/common'
import { addSignon, getResignFormList, getResignDateList } from '@/api/getData'
export default {
  data() {
    return {
      arr: [],
      isEdit: true,
      dateList: [],
      deteMethods: {},
      dateTypeVal: 0,
      checkinTypeVal: 0,
      supports: [{ type: 1, name: '否' }, { type: 2, name: '是' }],
      consts: [{ type: 1, name: '无偿补签' }, { type: 2, name: '有偿补签' }],
      params: { name: '', desc: '', number: 0 },
      resign: { isResign: 1, formId: '', cost: '' },
      resignFormList: [],
      calendarObj: {
        display: '',
        multi: true,
        show: false,
        zero: true,
        value: [], // 默认日期
        lunar: true, // 显示农历
        select: value => {
          let displayValue = []
          let newResignData = []
          value.forEach(v => {
            let date =
              v[0] +
              '-' +
              (v[1] >= 10 ? v[1] : '0' + v[1]) +
              '-' +
              (v[2] >= 10 ? v[2] : '0' + v[2])
            displayValue.push(date)
            newResignData.push(date)
          })
          this.calendarObj.value = value
          this.resignDateList = newResignData
          this.calendarObj.display = displayValue.join(',')
        }
      }
    }
  },
  components: {
    calendar,
    'date-type-list': () => import('@/components/dateTypeList.vue'),
    'checkin-type-list': () => import('@/components/checkinTypeList.vue')
  },
  created() {
    this.deteMethods = DATETYPE
    this.initData()
  },
  methods: {
    async initData() {
      let res = await getResignFormList()
      if (res.status === 200) {
        this.resignFormList = res.data.list
      }
      let dateRes = await getResignDateList()
      if (dateRes.status === 200) {
        let datas = dateRes.data.list
        let arr = []
        datas.forEach(ele => {
          let dates = ele.split('-')
          arr.push([
            parseInt(dates[0]),
            parseInt(dates[1]),
            parseInt(dates[2])
          ])
        })
        this.arr = arr
        this.calendarObj.select(arr)
      }
    },
    getDateType(data) {
      this.params.dateType = this.dateTypeVal = data.type
    },
    getCheckinType(data) {
      this.params.checkinType = this.checkinTypeVal = data.type
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
    },
    async submit() {
      if (!this.params.name || !this.params.dateType || !this.params.checkinType || !this.params.desc) {
        this.$message({ message: '请补充信息', type: 'warning' })
        return
      }
      if (this.dateTypeVal === this.deteMethods.USERDEFINED) {
        if (this.params.number === 0) {
          this.$message({ message: '自定义周期不能为0', type: 'warning' })
          return
        }
      }
      this.params.isResign = this.resign.isResign
      this.params.formId = this.resign.formId
      this.params.cost = this.resign.cost
      this.params.pid = 1
      if (this.resign.cost === 2) {
        this.params.resignDates = this.resignDateList
      }
      let res = await addSignon(this.params)
      if (res.status === 200) {
        this.$message({ message: '操作成功', type: 'success' })
      }
    }
  }
}
</script>

<style lang="less">
.price-box {
  border: 1px solid #eee;
  border-radius: 3px;
  max-width: 400px;
  min-width: 100px;
  min-height: 100px;
  max-height: 200px;
  width: 200px;
  height: 100px;
  margin-left: 80px;
}
.price_num {
  padding: 0 5px;
  font-size: 11px;
  text-decoration: underline;
  color: blue;
  cursor: pointer;
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
