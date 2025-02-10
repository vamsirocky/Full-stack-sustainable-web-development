const bcrypt = require("bcrypt");
const pool = require("./db"); // Import your database connection

const rehashPasswords = async () => {
  try {
    // Fetch all users with plain text passwords
    const users = await pool.query("SELECT email, password_hash FROM Users");

    for (const user of users.rows) {
      const { email, password_hash: plainPassword } = user;

      // Skip if the password is already hashed (bcrypt hashes always start with $2)
      if (plainPassword.startsWith("$2")) {
        console.log(`Password for ${email} is already hashed. Skipping...`);
        continue;
      }

      // Hash the plain text password
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      console.log(`Rehashed password for ${email}: ${hashedPassword}`);

      // Update the database with the hashed password
      await pool.query("UPDATE Users SET password_hash = $1 WHERE email = $2", [
        hashedPassword,
        email,
      ]);
    }

    console.log("Rehashing complete!");
    process.exit(0); // Exit the script
  } catch (err) {
    console.error("Error during rehashing:", err.message);
    process.exit(1); // Exit with an error
  }
};

rehashPasswords();
