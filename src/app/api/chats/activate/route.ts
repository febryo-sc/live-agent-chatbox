import axios from "axios";

import { mapChatData } from "@/utils/mapping-data";

export async function POST(req: Request) {
  try {
    const { phone, message } = await req.json();
    const payload = {
      merchant_name: `${process.env.API_MERCHANT_NAME}`,
      to: phone,
      invoice_id: "213",
      questions: message || "",
    };
    const response = await axios.post(
      `${process.env.API_BASE_URL}/activate_session`,
      payload,
      {
        auth: {
          username: `${process.env.API_AUTH_USERNAME}`,
          password: `${process.env.API_AUTH_PASSWORD}`,
        },
      }
    );
    const mappedData = mapChatData(response.data, 3);
    return Response.json({
      error: false,
      message: "Success",
      data: mappedData,
    });
  } catch (error: any) {
    console.error("Error activating chat session:", `${error.message}`);
    return Response.json(
      {
        error: true,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
