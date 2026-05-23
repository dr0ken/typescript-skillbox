import * as QRCode from 'qrcode';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const text = args[1];

  if (command !== 'generate' || !text || text.startsWith('--')) {
    console.error('Ошибка: Укажите текст или ссылку.');
    process.exit(1);
  }

  let size;
  const sizeIndex = args.indexOf('--size');
  if (sizeIndex !== -1 && args[sizeIndex + 1]) {
    size = parseInt(args[sizeIndex + 1], 10);
  }

  try {
    const qrString = await QRCode.toString(text, {
      type: 'utf8',
      version: size as any
    });
    console.log(qrString);
  } catch (err: any) {
    console.error('Ошибка генерации QR-кода:', err.message);
  }
}

main();