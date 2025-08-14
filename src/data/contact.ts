import axios from "axios";

const appHost = process.env.NEXT_PUBLIC_URL;

export async function fetchContacts() {
  const url = `${appHost}/api/contacts`;
  const response = await axios.get(url);
  return response.data.data || [];
}

export async function addContact({ phone }: { phone: string }) {
  const url = `${appHost}/api/contacts/add`;
  const payload = { phone };
  const response = await axios.post(url, payload);
  return response.data.data || [];
}
