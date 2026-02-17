import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import './QrPage.css';

export const QrPage = () => {
  const [value, setValue] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [includeMargin, setIncludeMargin] = useState(true);
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const qrWrapRef = useRef<HTMLDivElement | null>(null);

  const normalizedValue = useMemo(() => value.trim(), [value]);

  const handleDownload = () => {
    const canvas = qrWrapRef.current?.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr.png';
    a.click();
  };

  return (
    <section className="qr-page">
      <div className="container">
        <motion.div
          className="qr-head"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1>QR генератор</h1>
          <p>Вставь ссылку или текст — получишь QR-код. Можно скачать PNG.</p>
        </motion.div>

        <div className="qr-grid">
          <motion.div
            className="qr-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <label className="qr-label" htmlFor="qrValue">
              Данные
            </label>
            <textarea
              id="qrValue"
              className="qr-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="https://..."
              rows={4}
            />

            <div className="qr-row">
              <div className="qr-field">
                <label className="qr-label" htmlFor="qrSize">
                  Размер: {size}px
                </label>
                <input
                  id="qrSize"
                  type="range"
                  min={160}
                  max={420}
                  step={8}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </div>
              <div className="qr-field">
                <label className="qr-label" htmlFor="qrLevel">
                  Коррекция ошибок
                </label>
                <select
                  id="qrLevel"
                  className="qr-select"
                  value={level}
                  onChange={(e) => setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                >
                  <option value="L">L (7%)</option>
                  <option value="M">M (15%)</option>
                  <option value="Q">Q (25%)</option>
                  <option value="H">H (30%)</option>
                </select>
              </div>
            </div>

            <label className="qr-check">
              <input
                type="checkbox"
                checked={includeMargin}
                onChange={(e) => setIncludeMargin(e.target.checked)}
              />
              <span>Добавить поля (quiet zone)</span>
            </label>

            <div className="qr-actions">
              <button type="button" className="btn primary" onClick={handleDownload} disabled={!normalizedValue}>
                Скачать PNG
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setValue('https://')}
              >
                Очистить
              </button>
            </div>
          </motion.div>

          <motion.div
            className="qr-preview"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <div className="qr-preview-inner" ref={qrWrapRef}>
              <QRCodeCanvas
                value={normalizedValue || ' '}
                size={size}
                includeMargin={includeMargin}
                level={level}
                bgColor="#ffffff"
                fgColor="#111827"
              />
            </div>
            <div className="qr-hint">
              Подсказка: для печати обычно хватает уровня <b>M</b>, для “шумных” условий бери <b>Q/H</b>.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

