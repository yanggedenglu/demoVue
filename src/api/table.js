import request from '@/utils/request'

// export funtion  方法名（参数：data params）

export function getList(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://localhost:8000/user/',
    method: 'get',
    // params
    params: { pageSize: params.pageSize, pageCount: params.pageCount }
  })
}

export function deleteUser(params) {
  return request({
    url: 'http://localhost:8000/user/' + params.id + '/' + params.status,
    method: 'delete'
  })
}

export function editUser(data) {
  return request({
    url: 'http://localhost:8000/user/',
    method: 'put',
    data
  })
}

export function editPass(data) {
  return request({
    url: 'http://localhost:8000/user/updatePass',
    method: 'post',
    params: { id: data.id, oldPass: data.oldPass, newPass: data.newPass }
  })
}
