import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

const ApiCaller = axios.create({ baseURL: baseUrl });

export default ApiCaller;
