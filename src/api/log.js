import request from '@/utils/request'

// export funtion  方法名（参数：data params）

export function getLog(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://localhost:8770/log',
    method: 'get',
    params: { 'pathId': params.pathId, 'row': params.row }
  })
}

export function Close(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://localhost:8770/close',
    method: 'get'
  })
}

