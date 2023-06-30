import axiosClient from './axiosClient';

const studentApi = {
  getAll(params) {
    const url = '/studentApi';
    return axiosClient.get(url, { params });
  },

  getById(id) {
    const url = `/studentApi/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/studentApi';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/studentApi/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/studentApi/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
