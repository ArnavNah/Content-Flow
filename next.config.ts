import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.20", "192.168.1.20:3000", "localhost:3000"],
  turbopack: {
    root: path.resolve(__dirname)
  }
};

export default nextConfig;


