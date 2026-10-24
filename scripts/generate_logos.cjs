const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('public/logo.png');
let idatChunks = [];
let pos = 8;
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const raw = zlib.inflateSync(Buffer.concat(idatChunks));

const width = 2999, height = 944, bpp = 4, rowBytes = width * bpp;
const uncompressed = Buffer.alloc(height * rowBytes);
let prevRow = Buffer.alloc(rowBytes);

for (let y = 0; y < height; y++) {
  const filter = raw[y * (rowBytes + 1)];
  const srcRow = raw.slice(y * (rowBytes + 1) + 1, (y + 1) * (rowBytes + 1));
  const dstRow = uncompressed.slice(y * rowBytes, (y + 1) * rowBytes);

  for (let x = 0; x < rowBytes; x++) {
    const a = x >= bpp ? dstRow[x - bpp] : 0;
    const b = prevRow[x];
    const c = x >= bpp ? prevRow[x - bpp] : 0;
    let val = srcRow[x];
    if (filter === 1) val = (val + a) & 0xff;
    else if (filter === 2) val = (val + b) & 0xff;
    else if (filter === 3) val = (val + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      val = (val + pr) & 0xff;
    }
    dstRow[x] = val;
  }
  prevRow = dstRow;
}

// Find boundary where the text starts
// The Oryx icon is on the left. Let's see the maximum x of the Oryx icon by finding where gap is.
// Let's create dark mode version:
// For x >= 950: Any non-transparent pixel (text "Tadbeer" and "transformations")
// Turn R, G, B to 255, 255, 255, preserving the antialiased Alpha!
// Also, even if text extends slightly to the left, let's check between x=900 and 1100.
const darkUncompressed = Buffer.from(uncompressed);

for (let y = 0; y < height; y++) {
  for (let x = 950; x < width; x++) {
    const idx = (y * width + x) * 4;
    const a = darkUncompressed[idx + 3];
    if (a > 0) {
      // It's the text! Make it pure white in dark mode
      darkUncompressed[idx] = 255;     // R
      darkUncompressed[idx + 1] = 255; // G
      darkUncompressed[idx + 2] = 255; // B
      // a stays the same for perfect antialiasing
    }
  }
}

// Pack into PNG
function packPNG(pixelBuf, w, h) {
  const packedRaw = Buffer.alloc(h * (1 + w * 4));
  for (let y = 0; y < h; y++) {
    packedRaw[y * (1 + w * 4)] = 0; // Filter 0 (None)
    pixelBuf.copy(packedRaw, y * (1 + w * 4) + 1, y * w * 4, (y + 1) * w * 4);
  }

  const deflated = zlib.deflateSync(packedRaw);

  function makeCRCTable() {
    const table = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c;
    }
    return table;
  }
  const crcTable = makeCRCTable();
  function crc32(b) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < b.length; i++) crc = (crc >>> 8) ^ crcTable[(crc ^ b[i]) & 0xff];
    return (crc ^ (-1)) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const toHash = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(toHash), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  return Buffer.concat([
    header,
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

const darkPNG = packPNG(darkUncompressed, width, height);
fs.writeFileSync('public/logo-dark.png', darkPNG);
console.log('Saved public/logo-dark.png, size:', darkPNG.length);

// Also copy original to logo-light.png
fs.copyFileSync('public/logo.png', 'public/logo-light.png');
console.log('Saved public/logo-light.png');
