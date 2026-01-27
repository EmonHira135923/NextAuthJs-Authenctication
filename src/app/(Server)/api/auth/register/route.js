import { getUsers } from "@/app/(Server)/lib/connectDB";

// Get Method
export async function GET(request) {
  try {
    // 1. You MUST await the collection/connection
    const userCollection = await getUsers();

    // 2. Await the database query
    const result = await userCollection
      .find()
      .sort({ created_at: -1 })
      .toArray();

    console.log(result);

    return Response.json(
      {
        message: "All data fetch successfully.",
        success: true,
        result,
      },
      { status: 200 },
    );
  } catch (error) {
    // console.error("Database Error:", error);
    return Response.json(
      {
        message: "Failed to found users",
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// Post Method
export async function POST(request) {
  try {
    const userCollection = await getUsers();

    let name, email, password, image;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = body.name;
      email = body.email;
      password = body.password;
      image = body.image;
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name");
      email = formData.get("email");
      password = formData.get("password");
      image = formData.get("image"); // File object
    } else {
      return Response.json(
        { message: "Unsupported Content-Type", success: false },
        { status: 415 },
      );
    }

    // Validation
    if (!name || !email || !password) {
      return Response.json(
        { message: "All Fields are required", success: false },
        { status: 400 },
      );
    }

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "User Already Exists", success: false },
        { status: 409 },
      );
    }

    const data = {
      name,
      email,
      password,
      image,
      created_at: new Date(),
    };

    const result = await userCollection.insertOne(data);

    return Response.json(
      { message: "Added User Data successfully", success: true, result },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to add user", success: false, error: error.message },
      { status: 500 },
    );
  }
}
