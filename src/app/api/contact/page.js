"use server";
export async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully.",
      });
    } catch (error) {
      console.error("Error handling form submission:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred. Please try again later.",
      });
    }
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed. Please use POST.`,
    });
  }
}
