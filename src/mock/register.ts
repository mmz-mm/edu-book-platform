import Mock from 'mockjs'

// 只在开发环境启用 mock
if (import.meta.env.DEV) {
  // 模拟账号密码注册
Mock.mock('/api/u/registerByJson', 'post', (options: any) => {
    const body = JSON.parse(options.body)
    
    // 简化处理：只要用户名和密码不为空就认为注册成功
    if (body.username && body.password) {
      return {
        meta: {
          code: '10006',
          msg: '注册成功'
        },
        data: {
          accessToken: Mock.Random.string('lower', 32),
          refreshToken: Mock.Random.string('lower', 32),
          userId: Mock.Random.integer(10000, 99999),
          username: 'mock_user'
        }
      }
    } else {
      return {
        meta: {
          code: '10001',
          msg: '用户名或密码不能为空'
        },
        data: null
      }
    }
  })

  // 模拟手机验证码注册
  Mock.mock('/api/u/registerByMobile', 'post', (options: any) => {
    const body = JSON.parse(options.body)
    
    // 验证码简单验证：假设验证码为 123456
    if (body.mobile && body.captcha === '123456') {
      return {
        meta: {
          code: '10006',
          msg: '注册成功'
        },
        data: {
          accessToken: Mock.Random.string('lower', 32),
          refreshToken: Mock.Random.string('lower', 32),
          userId: Mock.Random.integer(10000, 99999),
          phone: body.mobile
        }
      }
    } else if (!body.mobile) {
      return {
        meta: {
          code: '10001',
          msg: '手机号不能为空'
        },
        data: null
      }
    } else {
      return {
        meta: {
          code: '10002',
          msg: '验证码错误，请重新输入'
        },
        data: null
      }
    }
  })
  
  console.log('✅ Mock 服务已启用 - 注册相关接口')
}
