import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs/promises";

export interface InfographicConcept {
  concept: string;
  colorScheme: string[];
  badges: { text: string; style?: string }[];
  layout: string;
  callToAction: string;
  productName?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validHex(color: string): string {
  const hex = color.startsWith("#") ? color : `#${color}`;
  return /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#64748b";
}

function renderTemplate(
  concept: InfographicConcept,
  productImageBase64?: string,
): string {
  const [primary, accent, background] = concept.colorScheme.length >= 3
    ? concept.colorScheme.slice(0, 3).map(validHex)
    : ["#4f46e5", "#ec4899", "#f8fafc"];

  const badgesHtml = concept.badges
    .slice(0, 4)
    .map(
      (badge) => `
      <div style="
        background: ${primary};
        color: #ffffff;
        padding: 14px 22px;
        border-radius: 12px;
        font-size: 22px;
        font-weight: 700;
        box-shadow: 0 4px 14px rgba(0,0,0,0.12);
        white-space: nowrap;
      ">${escapeHtml(badge.text)}</div>
    `,
    )
    .join("");

  const imageHtml = productImageBase64
    ? `<img src="${productImageBase64}" style="
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 24px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      " />`
    : `<div style="
        width: 100%;
        height: 100%;
        border-radius: 24px;
        background: linear-gradient(135deg, ${primary}22, ${accent}22);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: ${primary};
        font-weight: 700;
      ">Фото товара</div>`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            width: 1000px;
            height: 1000px;
            background: ${background};
            padding: 48px;
          }
          .container {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 32px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.08);
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .top {
            display: flex;
            flex: 1;
            gap: 40px;
            padding: 48px;
          }
          .image-side {
            flex: 1.1;
            min-width: 0;
          }
          .info-side {
            flex: 0.9;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 28px;
            min-width: 0;
          }
          .badges {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
          }
          .cta {
            background: ${accent};
            color: #ffffff;
            padding: 22px 36px;
            border-radius: 16px;
            font-size: 28px;
            font-weight: 800;
            text-align: center;
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
          }
          .bottom-bar {
            background: ${primary};
            color: #ffffff;
            padding: 24px 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .brand {
            font-size: 26px;
            font-weight: 800;
          }
          .product-name {
            font-size: 22px;
            font-weight: 600;
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="top">
            <div class="image-side">${imageHtml}</div>
            <div class="info-side">
              <div class="badges">${badgesHtml}</div>
              <div class="cta">${escapeHtml(concept.callToAction)}</div>
            </div>
          </div>
          <div class="bottom-bar">
            <span class="brand">MasterSell</span>
            <span class="product-name">${escapeHtml(concept.productName || "")}</span>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function renderInfographic(
  concept: InfographicConcept,
  options: { productImageBase64?: string; outputDir?: string } = {},
): Promise<{ filePath: string; fileName: string; url: string }> {
  const outputDir = options.outputDir || path.join(process.cwd(), "public", "infographics");
  await fs.mkdir(outputDir, { recursive: true });

  const fileName = `infographic-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
  const filePath = path.join(outputDir, fileName);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1000, height: 1000 } });
  const page = await context.newPage();

  try {
    const html = renderTemplate(concept, options.productImageBase64);
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.screenshot({ path: filePath, type: "png" });
  } finally {
    await browser.close();
  }

  return {
    filePath,
    fileName,
    url: `/infographics/${fileName}`,
  };
}
