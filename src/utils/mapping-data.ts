export type FirebaseChatType = {
  id: string;
  phone_number: string;
  merchant_name: string;
  date: string;
  name: string;
  data: {
    type: string;
    message: string;
  };
};

// chat status : 0 = sent, 1 = delivered, 2 = read, 3 = waiting activation

export function mapFirebaseChatData(data: FirebaseChatType[]) {
  return data.map((item: any) => ({
    id: item.id,
    message: item.data?.message || "",
    time: item?.date
      ? new Date(item.date).toISOString()
      : new Date().toISOString(),
    status: 0,
    sender: item.data?.type === "user_from" ? "me" : "",
  }));
}

export function mapChatData(data: any[], status = 0) {
  const filteredData = data.filter((item: any) => item.messages?.message);
  return filteredData.map((item: any) => ({
    id: item.id,
    message: item.messages?.message || "",
    time: item?.updated_at || new Date().toISOString(),
    status,
    sender: item.messages?.type === "user_from" ? "me" : "",
  }));
}

export function mapContactData(data: any[]) {
  const filteredData = data.filter((item: any) => item.phone_number);
  return filteredData.map((item: any) => ({
    id: item.phone_number,
    name: item.name,
    status: item.status,
    time: "",
    photoUrl: item.profile_img_url || "",
    notif: 0,
    phone: item.phone_number,
    email: item.email || "",
    address: item.address || "",
  }));
}
