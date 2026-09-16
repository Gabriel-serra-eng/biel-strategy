/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async headers() {
    // Cabeçalhos de segurança HTTP padrão, sem risco de quebrar nada existente (nenhuma API de
    // câmera/mic/geolocalização/pagamento é usada no site, e o site nunca precisa ser embutido em
    // iframe). CSP fica de fora por enquanto — exigiria mapear com precisão todo script inline do
    // Next.js e do JSON-LD para não quebrar a hidratação; ver relatório da tarefa.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
