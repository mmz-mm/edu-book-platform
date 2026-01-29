import Mock from 'mockjs'

// 只在开发环境启用 mock
if (import.meta.env.DEV) {
  /**
   * 说明：
   * - 本项目 axios 响应拦截器会 return response.data（见 src/utils/api/request.js）
   * - 所以这里 Mock 返回的对象就是业务层拿到的 res
   * - 组件里用到的结构有：
   *   - res.data.list
   *   - res.data.pageInfo.list
   */

  const Random = Mock.Random

  // 课程封面图：尽量用可访问的占位图，避免本地/外链 404 导致页面看起来“没渲染”
  const cover = (seed) => `https://picsum.photos/seed/${seed}/640/360`
  const slider = (seed) => `https://picsum.photos/seed/slider-${seed}/1200/460`

  const firstCategories = [
    { id: '1001', categoryName: '前端开发' },
    { id: '1002', categoryName: '后端开发' },
    { id: '1003', categoryName: '移动开发' },
    { id: '1004', categoryName: '数据结构与算法' },
    { id: '1005', categoryName: '项目实战' },
    { id: '1006', categoryName: '人工智能' },
    { id: '1007', categoryName: '云计算' },
    { id: '1008', categoryName: '大数据' },
    { id: '1009', categoryName: '网络安全' },
    
  ]

  const secondCategoryMap = {
    '1001': [
      { id: '2001', categoryName: 'Vue' },
      { id: '2002', categoryName: 'React' },
      { id: '2003', categoryName: 'TypeScript' },
      { id: '2004', categoryName: '工程化' },
    ],
    '1002': [
      { id: '2101', categoryName: 'Node.js' },
      { id: '2102', categoryName: 'Java' },
      { id: '2103', categoryName: 'Spring Boot' },
      { id: '2104', categoryName: '数据库' },
    ],
    '1003': [
      { id: '2201', categoryName: 'Flutter' },
      { id: '2202', categoryName: 'Android' },
      { id: '2203', categoryName: 'iOS' },
    ],
    '1004': [
      { id: '2301', categoryName: '算法入门' },
      { id: '2302', categoryName: '刷题训练' },
      { id: '2303', categoryName: '面试专题' },
    ],
    '1005': [
      { id: '2401', categoryName: '电商项目' },
      { id: '2402', categoryName: '管理系统' },
      { id: '2403', categoryName: '全栈实战' },
    ],
    '1006': [
      { id: '2501', categoryName: '人工智能' },
      { id: '2502', categoryName: '机器学习' },
      { id: '2503', categoryName: '深度学习' },
    ],
    '1007': [
      { id: '2601', categoryName: '云计算' },
      { id: '2602', categoryName: '大数据' },
    ],
    '1008': [
      { id: '2701', categoryName: '网络安全' },
      { id: '2702', categoryName: '数据安全' },
      { id: '2703', categoryName: '加密技术' },
    ],
    '1009': [
      { id: '2801', categoryName: '网络安全' },
      { id: '2802', categoryName: '数据安全' },
      { id: '2803', categoryName: '加密技术' },
    ],
  }

  const buildCourse = (idx, overrides = {}) => {
    const courseLevelCode = (idx % 3) + 1 // 1/2/3 (数字类型，用于 courseTypeFn)
    const courseLevelText = courseLevelCode === 1 ? '初级' : courseLevelCode === 2 ? '中级' : '高级'

    const discountPrice = idx % 5 === 0 ? 0 : Random.integer(19, 199)
    const isMember = idx % 4 === 0 ? 1 : 0

    return {
      id: String(5000 + idx),
      courseName: `${Random.pick(['Vue', 'React', 'Node', 'TS', '算法', '项目'])} ${Random.pick([
        '从入门到实战',
        '进阶训练营',
        '高频面试题',
        '企业级最佳实践',
        '性能优化',
        '架构设计',
      ])}`,
      courseCover: cover(`course-${idx}`),
      // Course.vue 的 courseTypeFn 期望数字类型 1/2/3
      courseLevel: courseLevelCode,
      // NavSwiper 和 NewGoodCourse 直接显示中文等级
      courseLevelText: courseLevelText,
      purchaseCounter: Random.integer(100, 9999),
      purchaseCnt: Random.integer(0, 999),
      discountPrice,
      isMember,
      ...overrides,
    }
  }

  // 获取一级分类
  Mock.mock('/api/course/category/getFirstCategorys', 'get', () => {
    return {
      meta: { code: '10006', msg: 'success' },
      data: { list: firstCategories },
    }
  })

  // 获取二级分类
  // 约定：
  // - 如果带 firstCategoryId 参数：返回该一级分类下的二级分类
  // - 如果不带 firstCategoryId：返回所有一级分类下的所有二级分类（课程页“课程分类”用）
  Mock.mock(/\/api\/course\/category\/getSecondCategorys(\?.*)?$/, 'get', (options) => {
    const url = options.url || ''
    const queryString = url.split('?')[1] || ''
    const params = new URLSearchParams(queryString)
    const firstCategoryId = params.get('firstCategoryId')

    // 没有指定 firstCategoryId：返回全部二级分类
    if (!firstCategoryId) {
      const allSeconds = Object.values(secondCategoryMap).flat()
      return {
        meta: { code: '10006', msg: 'success' },
        data: { list: allSeconds },
      }
    }

    // 指定了 firstCategoryId：只返回对应一级下的二级分类
    return {
      meta: { code: '10006', msg: 'success' },
      data: { list: secondCategoryMap[firstCategoryId] || [] },
    }
  })

  // 图片轮播
  Mock.mock('/api/slider/getSliders', 'get', () => {
    return {
      meta: { code: '10006', msg: 'success' },
      data: {
        list: Array.from({ length: 4 }).map((_, i) => ({
          id: String(9000 + i),
          imageUrl: slider(i + 1),
        })),
      },
    }
  })

  // 查询课程标签
  Mock.mock('/api/course/tags/list', 'post', (options) => {
    let body = {}
    try {
      body = JSON.parse(options.body || '{}')
    } catch (e) {
      body = {}
    }
    const firstCategory = body?.entity?.firstCategory || '1001'

    const baseTags = {
      '1001': ['Vue3', 'React18', 'TypeScript', 'Vite', '工程化', '组件库', '性能优化', 'SSR'],
      '1002': ['Node', 'Express', 'Koa', 'NestJS', 'MySQL', 'Redis', 'JWT', '微服务'],
      '1003': ['Flutter', 'Dart', 'Android', 'Kotlin', 'iOS', 'Swift'],
      '1004': ['数组', '链表', '二叉树', '动态规划', '贪心', '回溯', '图论'],
      '1005': ['电商', '后台管理', '支付', '权限', '部署', 'CI/CD'],
      '1006': ['人工智能', '机器学习', '深度学习', '自然语言处理', '计算机视觉'],
      '1007': ['云计算', '大数据', '物联网', '区块链', '边缘计算'],
      '1008': ['网络安全', '数据安全', '加密技术', '漏洞扫描', '应急响应'],
      '1009':['网络安全', '数据安全', '加密技术', '漏洞扫描', '应急响应'],
    }

    const list = (baseTags[firstCategory] || []).slice(0, body?.pageSize || 10).map((t, i) => ({
      id: `${firstCategory}-tag-${i + 1}`,
      tagName: t,
    }))

    return {
      meta: { code: '10006', msg: 'success' },
      data: {
        pageInfo: {
          list,
          total: list.length,
          pageNum: body?.pageNum || 1,
          pageSize: body?.pageSize || 10,
        },
      },
    }
  })

  // 查询课程（导航 hover 会用它；也给 Course 列表页复用）
  Mock.mock('/api/course/search', 'post', (options) => {
    let body = {}
    try {
      body = JSON.parse(options.body || '{}')
    } catch (e) {
      body = {}
    }
    const pageNum = body?.pageNum || 1
    const pageSize = body?.pageSize || 8

    const total = 42
    const start = (pageNum - 1) * pageSize
    const end = Math.min(start + pageSize, total)

    const list = Array.from({ length: Math.max(0, end - start) }).map((_, i) => buildCourse(start + i + 1))

    return {
      meta: { code: '10006', msg: 'success' },
      data: {
        pageInfo: {
          list,
          total,
          pageNum,
          pageSize,
        },
      },
    }
  })

  // 最新课程
  Mock.mock('/api/course/mostNew', 'post', (options) => {
    let body = {}
    try {
      body = JSON.parse(options.body || '{}')
    } catch (e) {
      body = {}
    }
    const pageNum = body?.pageNum || 1
    const pageSize = body?.pageSize || 8

    const total = 36
    const start = (pageNum - 1) * pageSize
    const end = Math.min(start + pageSize, total)

    const list = Array.from({ length: Math.max(0, end - start) }).map((_, i) => buildCourse(100 + start + i + 1))

    return {
      meta: { code: '10006', msg: 'success' },
      data: {
        pageInfo: {
          list,
          total,
          pageNum,
          pageSize,
        },
      },
    }
  })

  console.log('✅ Mock 服务已启用 - 课程/首页相关接口')
}
