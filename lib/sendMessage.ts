import axios, { Axios } from "axios";
export const sendMessage = async (message: string) => {
  try {
    const response = await axios.post(
      "https://snippetai-xi.vercel.app/api/gemini",
      {
        messages: message,
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
