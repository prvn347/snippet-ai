import axios, { Axios } from "axios";
export const sendMessage = async (message: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/gemini", {
      messages: message,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
