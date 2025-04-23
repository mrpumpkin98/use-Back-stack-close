/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // TypeScript 파일을 상위 디렉토리에서도 처리할 수 있도록 설정
    config.module.rules.push({
      test: /\.tsx?$/,
      use: "ts-loader",
      include: [/src\//],
    });

    return config;
  },
};

module.exports = nextConfig;
