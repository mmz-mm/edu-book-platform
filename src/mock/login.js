import Mock from 'mockjs'

// 只在开发环境启用 mock
if (import.meta.env.DEV) {
  // 模拟账号密码登录
  Mock.mock('/api/u/loginByJson', 'post', (options) => {
    const body = JSON.parse(options.body)
    
    // 由于代码中使用了加密，这里简化处理：只要用户名和密码不为空就认为登录成功
    // 实际开发中，可以根据需要调整验证逻辑
    if (body.username && body.password) {
      return {
        meta: {
          code: '10006',
          msg: '登录成功'
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

  // 模拟手机验证码登录
  Mock.mock('/api/u/loginByMobile', 'post', (options) => {
    const body = JSON.parse(options.body)
    
    // 验证码简单验证：假设验证码为 123456
    if (body.mobile && body.captcha === '123456') {
      return {
        meta: {
          code: '10006',
          msg: '登录成功'
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

  // 模拟发送验证码
  Mock.mock(/\/api\/sms\/sendRegisterOrLoginCaptcha/, 'get', (options) => {
    // 简单返回成功，实际验证码在 mock 中固定为 123456
    return {
      meta: {
        code: '10006',
        msg: '验证码发送成功'
      },
      data: {
        // mock 环境下，验证码固定为 123456
        captcha: '123456'
      }
    }
  })
  
  console.log('✅ Mock 服务已启用 - 登录相关接口')
}
