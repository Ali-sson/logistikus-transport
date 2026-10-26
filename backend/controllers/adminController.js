
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    console.log("Admin configuration check:", {
  emailLoaded: Boolean(adminEmail),
  passwordHashLoaded: Boolean(adminPasswordHash),
  jwtSecretLoaded: Boolean(jwtSecret),
});

    if (!adminEmail || !adminPasswordHash || !jwtSecret) {
      console.error("Admin login environment variables are missing.");

      return res.status(500).json({
        message: "Admin login is not configured.",
      });
    }

    if (email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      adminPasswordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: adminEmail,
      },
      jwtSecret,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Admin login successful.",
      token,
      admin: {
        email: adminEmail,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      message: "Unable to log in.",
    });
  }
}

module.exports = { loginAdmin };
