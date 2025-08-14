import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Create a new FormData to send to external API
    const externalFormData = new FormData();
    externalFormData.append("file", file);

    const response = await axios.post(
      `${process.env.API_BASE_URL}/upload_data`,
      externalFormData,
      {
        auth: {
          username: `${process.env.API_AUTH_USERNAME}`,
          password: `${process.env.API_AUTH_PASSWORD}`,
        },
      }
    );

    return Response.json({
      error: false,
      message: "Success",
      data: response.data,
    });
  } catch (error) {
    console.error("Error upload chat file:", error);
    return Response.json(
      {
        error: true,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
