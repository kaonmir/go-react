import dotenv from "dotenv";
dotenv.config();

const config = {
  SERVER_URL: process.env.REACT_APP_API_KEY!,
};

export default config;
