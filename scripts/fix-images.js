const fs = require("fs");
const path = require("path");

function norm(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function toSlug(name) {
  let s = name;
  s = s.replace(/\s*\(\s*\d+\s*Pcs\s*\)/gi, "");
  s = s.replace(/\s*\(\s*Add-on\s*\)/gi, "");
  s = s.replace(/\s*\(\s*Steamed\/Fried\s*\)/gi, "");
  s = s.replace(/\s*\(\s*Sweet\s*\/\s*Salt\s*\)/gi, "");
  s = s.replace(/\s*\(\s*Jaggery Tea\s*\)/gi, "");
  s = s.replace(/\s*\(\s*Dry Ginger Tea\s*\)/gi, "");
  s = s.replace(/\s*\(\s*6\s*Inch\s*\)/gi, "");
  s = s.replace(/\(([^)]+)\)/g, " $1");
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const content = fs.readFileSync("js/menu-data.js", "utf8");
eval("var menuData = " + content.match(/const menuData = ({[\s\S]*});/)[1]);

const allFiles = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory() && e.name !== "images") walk(p);
    else if (/\.(jpe?g|webp|png)$/i.test(e.name)) allFiles.push(p);
  }
}
walk("assets");

const byNorm = new Map();
for (const f of allFiles) {
  const base = path.basename(f, path.extname(f));
  const n = norm(base);
  if (!byNorm.has(n)) byNorm.set(n, []);
  byNorm.get(n).push(f);
}

const imagesDir = "assets/images";
const existing = new Set(fs.readdirSync(imagesDir));

console.log("=== Fix cafe-latte ===");
for (const f of fs.readdirSync(imagesDir)) {
  if (norm(f) === norm("cafe-latte.jpeg") && f !== "cafe-latte.jpeg") {
    const src = path.join(imagesDir, f);
    const dest = path.join(imagesDir, "cafe-latte.jpeg");
    if (!existing.has("cafe-latte.jpeg")) {
      fs.copyFileSync(src, dest);
      console.log("Copied", f, "-> cafe-latte.jpeg");
    }
  }
}

const unsplash = menuData.restaurant.filter((i) => i.image && i.image.startsWith("http"));
const updates = [];

console.log("\n=== Unsplash items with local assets ===");
for (const item of unsplash) {
  const n = norm(item.name);
  const slug = toSlug(item.name);
  const ext = item.name === "Banana Lassi" ? ".jpg" : ".jpeg";
  const target = `assets/images/${slug}${ext}`;
  const targetFile = `${slug}${ext}`;

  let src = byNorm.get(n)?.[0];
  if (!src) {
    for (const f of allFiles) {
      const base = path.basename(f, path.extname(f));
      if (norm(base) === norm(slug.replace(/-/g, " "))) {
        src = f;
        break;
      }
    }
  }

  if (src) {
    const destPath = path.join(imagesDir, targetFile);
    if (!existing.has(targetFile)) {
      fs.copyFileSync(src, destPath);
      console.log("COPY", path.basename(src), "->", targetFile);
      existing.add(targetFile);
    } else {
      console.log("EXISTS", targetFile);
    }
    updates.push({ name: item.name, image: target });
  } else {
    console.log("SKIP (no asset):", item.name);
  }
}

console.log("\n=== Updates for menu-data.js ===");
updates.forEach((u) => console.log(JSON.stringify(u)));
