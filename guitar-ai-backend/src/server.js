import "dotenv/config";
import app from "./app.js";
import { dbConnect } from "./utils/db.js";

dbConnect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});