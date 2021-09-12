import axiosClient from "./axiosClient";

const studentApi = {
  getAll(params) {
    const url = "/students";
    return axiosClient.get(url, {
      params,
    });
  },
  getById(id) {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = "/students";
    return axiosClient.post(url, data);
  },
  remove(id) {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
  update(data) {
    const url = "/students";
    return axiosClient.patch(url, data);
  },
};
export default studentApi;
