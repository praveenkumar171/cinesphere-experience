const app = require("./src/app");
const { PORT, NODE_ENV } = require("./src/config/env");

app.listen(PORT, () => {
  console.log(`\n🎬 CineSphere API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${NODE_ENV}\n`);
});
