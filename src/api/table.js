import request from '@/utils/request'

// export 参数  data params

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
    url: 'http://localhost:8000/user/' + params.id,
    method: 'delete'
  })
}

export function editUser(data) {
  console.log(data)
  return request({
    url: 'http://localhost:8000/user/',
    method: 'put',
    data
  })
}
