import axios from "axios";

import { mapContactData } from "@/utils/mapping-data";

export async function POST(req: Request) {
  try {
    const { phone, name } = await req.json();
    const payload = {
      merchant_name: `${process.env.API_MERCHANT_NAME}`,
      to: phone,
      name,
    };
    const response = await axios.post(
      `${process.env.API_BASE_URL}/register_number`,
      payload,
      {
        auth: {
          username: `${process.env.API_AUTH_USERNAME}`,
          password: `${process.env.API_AUTH_PASSWORD}`,
        },
      }
    );
    const mappedData = mapContactData(response.data);
    return Response.json({
      error: false,
      message: "Success",
      data: mappedData,
    });
  } catch (error: any) {
    console.error("Error add new contact:", error);
    return Response.json(
      {
        error: true,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
