import axios, { Axios } from "axios";
export const sendMessage = async (
  message: [{ role: string; content: string }]
) => {
  try {
    const response = await axios.post("http://localhost:3000/api/msg", {
      messages: message,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
};
