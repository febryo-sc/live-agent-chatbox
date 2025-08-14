import axios from "axios";

const appHost = process.env.NEXT_PUBLIC_URL;

export async function fetchChatHistory(phone: string) {
  const url = `${appHost}/api/chats`;
  const payload = { phone };
  const response = await axios.post(url, payload);
  return response.data.data || [];
}

export async function activateChatSession(phone: string, message: string) {
  const url = `${appHost}/api/chats/activate`;
  const payload = { phone, message };
  const response = await axios.post(url, payload);
  return response.data.data || [];
}

export async function deactivateChatSession(phone: string, message: string) {
  const url = `${appHost}/api/chats/deactivate`;
  const payload = { phone, message };
  const response = await axios.post(url, payload);
  return response.data.data || [];
}

export async function sendMessage(phone: string, message: string) {
  const url = `${appHost}/api/chats/send`;
  const payload = { phone, message };
  const response = await axios.post(url, payload);
  return response.data.data || [];
}
