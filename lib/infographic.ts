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
  marketplace?: string;
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

type TemplateConfig = {
  width: number;
  height: number;
  viewport?: { width: number; height: number };
  render: (params: {
    concept: InfographicConcept;
    primary: string;
    accent: string;
    background: string;
    imageHtml: string;
    badgesHtml: string;
  }) => string;
};

const marketplaceTemplates: Record<string, TemplateConfig> = {
  Wildberries: {
    width: 1000,
    height: 1000,
    render: ({ primary, accent, background, imageHtml, badgesHtml, concept }) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Inter', system-ui, sans-serif;
              width: 1000px; height: 1000px;
              background: ${background};
              padding: 40px;
            }
            .container {
              width: 100%; height: 100%;
              background: #fff;
              border-radius: 32px;
              overflow: hidden;
              display: flex; flex-direction: column;
              box-shadow: 0 20px 60px rgba(0,0,0,0.08);
            }
            .top { flex: 1; display: flex; gap: 36px; padding: 44px; }
            .image-side { flex: 1.1; min-width: 0; }
            .info-side { flex: 0.9; display: flex; flex-direction: column; justify-content: center; gap: 24px; }
            .badges { display: flex; flex-wrap: wrap; gap: 14px; }
            .badge {
              background: ${primary}; color: #fff;
              padding: 14px 22px; border-radius: 14px;
              font-size: 22px; font-weight: 800;
              box-shadow: 0 4px 14px rgba(0,0,0,0.12);
            }
            .cta {
              background: ${accent}; color: #fff;
              padding: 24px 36px; border-radius: 18px;
              font-size: 30px; font-weight: 900;
              text-align: center;
              box-shadow: 0 6px 20px rgba(0,0,0,0.12);
            }
            .bottom-bar {
              background: ${primary}; color: #fff;
              padding: 24px 48px;
              display: flex; align-items: center; justify-content: space-between;
            }
            .brand { font-size: 26px; font-weight: 900; }
            .product-name { font-size: 22px; font-weight: 700; opacity: 0.95; }
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
    `,
  },
  Ozon: {
    width: 1200,
    height: 800,
    render: ({ primary, accent, background, imageHtml, badgesHtml, concept }) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Inter', system-ui, sans-serif;
              width: 1200px; height: 800px;
              background: ${background};
              padding: 36px;
            }
            .container {
              width: 100%; height: 100%;
              background: #fff;
              border-radius: 28px;
              overflow: hidden;
              display: flex; flex-direction: column;
              box-shadow: 0 20px 60px rgba(0,0,0,0.08);
            }
            .top { flex: 1; display: flex; gap: 40px; padding: 40px; }
            .image-side { flex: 1; min-width: 0; }
            .info-side { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 22px; }
            .badges { display: flex; flex-wrap: wrap; gap: 12px; }
            .badge {
              background: ${primary}; color: #fff;
              padding: 12px 20px; border-radius: 10px;
              font-size: 20px; font-weight: 700;
            }
            .cta {
              background: ${accent}; color: #fff;
              padding: 20px 32px; border-radius: 12px;
              font-size: 26px; font-weight: 800;
              text-align: center;
            }
            .bottom-bar {
              background: ${primary}; color: #fff;
              padding: 20px 40px;
              display: flex; align-items: center; justify-content: space-between;
            }
            .brand { font-size: 24px; font-weight: 800; }
            .product-name { font-size: 20px; font-weight: 600; }
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
    `,
  },
  "Яндекс.Маркет": {
    width: 1000,
    height: 1000,
    render: ({ primary, accent, background, imageHtml, badgesHtml, concept }) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Inter', system-ui, sans-serif;
              width: 1000px; height: 1000px;
              background: ${background};
              padding: 44px;
            }
            .container {
              width: 100%; height: 100%;
              background: #fff;
              border-radius: 24px;
              overflow: hidden;
              display: flex; flex-direction: column;
              border: 1px solid #e2e8f0;
            }
            .top { flex: 1; display: flex; flex-direction: column; gap: 30px; padding: 44px; }
            .image-side { flex: 1.2; min-width: 0; width: 100%; }
            .info-side { flex: 0.8; display: flex; flex-direction: column; justify-content: center; gap: 22px; }
            .badges { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
            .badge {
              background: #f1f5f9; color: ${primary};
              border: 2px solid ${primary};
              padding: 12px 22px; border-radius: 999px;
              font-size: 20px; font-weight: 700;
            }
            .cta {
              background: ${accent}; color: #fff;
              padding: 22px 36px; border-radius: 14px;
              font-size: 28px; font-weight: 800;
              text-align: center;
            }
            .bottom-bar {
              background: #f8fafc; color: #334155;
              padding: 22px 44px;
              display: flex; align-items: center; justify-content: space-between;
              border-top: 1px solid #e2e8f0;
            }
            .brand { font-size: 24px; font-weight: 800; color: ${primary}; }
            .product-name { font-size: 20px; font-weight: 600; }
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
    `,
  },
  Авито: {
    width: 1200,
    height: 900,
    render: ({ primary, accent, background, imageHtml, badgesHtml, concept }) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Inter', system-ui, sans-serif;
              width: 1200px; height: 900px;
              background: ${background};
              padding: 32px;
            }
            .container {
              width: 100%; height: 100%;
              background: #fff;
              border-radius: 20px;
              overflow: hidden;
              display: flex; flex-direction: column;
              box-shadow: 0 12px 40px rgba(0,0,0,0.06);
            }
            .top { flex: 1; display: flex; gap: 36px; padding: 36px; }
            .image-side { flex: 1.3; min-width: 0; }
            .info-side { flex: 0.7; display: flex; flex-direction: column; justify-content: flex-start; gap: 18px; padding-top: 16px; }
            .badges { display: flex; flex-direction: column; gap: 12px; }
            .badge {
              background: ${primary}; color: #fff;
              padding: 14px 20px; border-radius: 10px;
              font-size: 22px; font-weight: 700;
            }
            .cta {
              background: ${accent}; color: #fff;
              padding: 18px 28px; border-radius: 10px;
              font-size: 24px; font-weight: 800;
              text-align: center;
              margin-top: auto;
            }
            .bottom-bar {
              background: ${primary}; color: #fff;
              padding: 18px 36px;
              display: flex; align-items: center; justify-content: space-between;
            }
            .brand { font-size: 22px; font-weight: 800; }
            .product-name { font-size: 20px; font-weight: 600; opacity: 0.95; }
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
    `,
  },
};

function renderTemplate(
  concept: InfographicConcept,
  productImageBase64?: string,
): { html: string; width: number; height: number } {
  const [primary, accent, background] = concept.colorScheme.length >= 3
    ? concept.colorScheme.slice(0, 3).map(validHex)
    : ["#4f46e5", "#ec4899", "#f8fafc"];

  const config = marketplaceTemplates[concept.marketplace || "Wildberries"] ||
    marketplaceTemplates.Wildberries;

  const badgesHtml = concept.badges
    .slice(0, 4)
    .map(
      (badge) => `<div class="badge">${escapeHtml(badge.text)}</div>`,
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
      "&gt;Фото товара&lt;/div&gt;`;

  const html = config.render({
    concept,
    primary,
    accent,
    background,
    imageHtml,
    badgesHtml,
  });

  return { html, width: config.width, height: config.height };
}

export async function renderInfographic(
  concept: InfographicConcept,
  options: { productImageBase64?: string; outputDir?: string } = {},
): Promise<{ filePath: string; fileName: string; url: string }> {
  const outputDir = options.outputDir || path.join(process.cwd(), "public", "infographics");
  await fs.mkdir(outputDir, { recursive: true });

  const fileName = `infographic-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
  const filePath = path.join(outputDir, fileName);

  const { html, width, height } = renderTemplate(concept, options.productImageBase64);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();

  try {
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
