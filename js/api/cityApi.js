import axiosClient from './axiosClient';

const cityApi = {
  getAll(params) {
    const url = '/cityApi';
    return axiosClient.get(url, { params });
  },

  getById(id) {
    const url = `/cityApi/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/cityApi';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/cityApi/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/cityApi/${id}`;
    return axiosClient.delete(url);
  },
};

export default cityApi;
