<template>
    <Header></Header>
    <div class="coursemain">
        <div class="course-main">
            <section class="search-container">
		        <div class="search-item">
		          <div class="title-name">课程方向：</div>
		          <div class="all-items">
		            <el-tag
		                class="category-poniter"
		                effect="plain"
		                type="info"
		            >全部</el-tag>
		            <el-tag
		            	v-for='item in firstCategorys'
		            	:key='item.id'
		                class="category-poniter-item"
		                effect="plain"
		                type="info"
		            >
		            	{{ item.categoryName }}
		            </el-tag>
		        </div>
		        </div>
		        <div class="search-item search-item-transition" style="top: 45px;">
		          <div class="title-name">课程分类：</div>
		          <div class="all-items">
		             <el-tag
		                class="category-poniter"
		                effect="plain"
		                type="info"
		            >全部</el-tag>
		            <el-tag
		            	v-for='item in secondCategorys'
		            	:key='item.id'
		                class="category-poniter-item"
		                effect="plain"
		                type="info"
		            >  {{ item.categoryName }}
		            </el-tag>
		          </div>
		        </div>
		        <div class="search-item" style="top: 90px;">
		          <div class="title-name">课程难度：</div>
		          <div class="all-items">
		            <el-tag
		                class="category-poniter"
		                effect="plain"
		                type="info"
		            >全部</el-tag>
		            <el-tag
		            	v-for='item in courseLevel'
		            	:key='item.id'
		                class="category-poniter-item"
		                effect="plain"
		                type="info"
		            >  {{ item.text }}
		            </el-tag>
		          </div>
		        </div>
     		</section>

        </div>
        <div class='main-container'>
			<div class="container-top">
		        <ul class="all">
		          <li class="item">综合</li>
		          <li class="item split">|</li>
		          <li class="item">最新课程</li>
		          <li class="item split">|</li>
		          <li class="item">最多购买 </li>
		          <li class="item split">|</li>
		          <li class="item-price">
		            <span>价格</span>  
		            <span class="arrow">
		              <i
		                  class="el-icon-caret-top"
		              ></i>
		              <i
		                  class="el-icon-caret-bottom"
		              ></i>
		            </span>
		          </li>
		        </ul>
		        <ul class="right">
		          <li class="right-item">
		            <el-radio-group>
		              <el-radio label="1">免费课程</el-radio>
		              <el-radio label="2">会员课程</el-radio>
		            </el-radio-group>
		          </li>
		        </ul>
		      </div>
		      <div class="container-body">
		        <div class="newCourseContent">
		          <ul class="courseUl">
		            <li 
		            	class='courseItem'
		            	v-for='item in courseList'
		            	:key='item.id'
		            >
						<div class='courseInfo'>
							<div class='courseBg'>
								<img :src="item.courseCover">
							</div>
							<div class="courseName">{{item.courseName}}</div>
	                        <div class="courseDegree">{{ courseTypeFn(item.courseLevel) }} · {{item.purchaseCounter + item.purchaseCnt}}人报名</div>
							
	                        <div class="coursePriceZero" v-if="item.discountPrice == 0">
	                            <div class="pricefree">免费学习</div>
	                            <img src="../assets/img/free.png" alt="">
	                        </div>

	                        <div class="coursePrice" v-else-if="item.isMember == 1">
	                            <div class="courseMemberbg"><span class="courseMember">会员免费</span></div>
	                            <div class="price">¥ {{item.discountPrice}}</div>
	                        </div>

	                        <div class="coursePricePri" v-else>
	                            <div class="pricePri">¥ {{item.discountPrice}}</div>
	                        </div>
						</div>
					</li>
		          </ul>
		        </div>
		        <div class='pages'>
			    	<el-pagination 
			    		background 
			    		layout="prev, pager, next" 
			    		:total="total" 
			    		@current-change='handleCurrentChange'
			    	/>
			    </div>
		   	</div>
		</div>
    </div>
    <Foot></Foot>
</template>

<script setup  >
    //mixin
    import mixin from '@/mixins/courseType.js'  
    let { courseTypeFn } = mixin;  //引入mixin中的方法
   //组件
    import Header from '@/components/common/Header.vue';
    import Foot from '@/components/common/Foot.vue';
    //api
    import { getFirstCategorys, getSecondCategorys, searchCourse } from '@/utils/api/courseManage';
    //获取一级分类数据
    let firstCategorys = ref([]);
    //获取二级分类数据
    let secondCategorys = ref([]);
    //课程难度的数据
    let courseLevel = ref([
	{text: '初级',code: '1'}, 
  	{text: '中级',code: '2'},
 	{text: '高级',code: '3'}
    ]);
    //查询课程标签
    let courseList = ref([]);
    //课程的总数量
    let total = ref(0);
    let queryCourseParams = reactive({
        pageNum:1,
	    pageSize:8
    });
    
</script>

<style scoped>
    .course-main {
    padding: 20px 0;
    width: 100%;
    height: 130px;
    background: #f3f5f9;
}
.main-container {
  width: 1200px;
  margin: 0 auto;
}

</style>