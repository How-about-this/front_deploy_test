/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // 이 설정을 추가하면 src/app 디렉토리 구조를 사용할 수 있습니다.
  },
  images: {
    domains: ['d2v80xjmx68n4w.cloudfront.net']
  },
  output: 'standalone', // standalone 설정 추가
};

export default nextConfig;
