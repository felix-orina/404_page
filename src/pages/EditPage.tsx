import { useEffect, useRef, useState } from 'react';

function cleanDomain(value: string): string {
  return value
    .replace(/^https?:\/\//i, '')
    .replace(/\/+$/, '')
    .trim();
}

export default function EditPage() {
  const [input, setInput] = useState('');
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('fakeDomain');
    if (stored) setInput(stored);
    inputRef.current?.focus();
  }, []);

  function handleSave() {
    const cleaned = cleanDomain(input);
    if (!cleaned) return;
    localStorage.setItem('fakeDomain', cleaned);
    setSaved(true);
    setTimeout(() => {
      window.location.pathname = '/';
    }, 400);
  }

  function handleReset() {
    localStorage.removeItem('fakeDomain');
    setInput('helbsacco.co.ke');
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSave();
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.backLink}>
          ← Back to error page
        </a>

        <h1 style={styles.heading}>Edit Domain</h1>
        <p style={styles.description}>
          Set the domain shown on the fake Chrome error page. You can enter any
          domain (e.g. <code style={styles.code}>facebook.com</code>).
        </p>

        <label style={styles.label} htmlFor="domain-input">
          Domain
        </label>
        <input
          id="domain-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="example.com"
          style={styles.input}
          spellCheck={false}
          autoComplete="off"
        />

        <div style={styles.buttonRow}>
          <button
            style={{
              ...styles.saveBtn,
              ...(saved ? styles.saveBtnSuccess : {}),
            }}
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? 'Saved!' : 'Save & Redirect'}
          </button>
          <button
            style={styles.resetBtn}
            onClick={handleReset}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.borderColor = '#5f6368')
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.borderColor = '#dadce0')
            }
          >
            Reset to default
          </button>
        </div>

        <p style={styles.hint}>
          Current value saved in <code style={styles.code}>localStorage</code> as{' '}
          <code style={styles.code}>"fakeDomain"</code>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Roboto", Arial, sans-serif',
    color: '#202124',
    padding: '24px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #dadce0',
    padding: '40px 48px',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  backLink: {
    display: 'inline-block',
    fontSize: '13px',
    color: '#1558b0',
    textDecoration: 'none',
    marginBottom: '24px',
    fontWeight: '500',
  },
  heading: {
    fontSize: '22px',
    fontWeight: '400',
    color: '#202124',
    margin: '0 0 8px 0',
  },
  description: {
    fontSize: '14px',
    color: '#5f6368',
    margin: '0 0 28px 0',
    lineHeight: '1.6',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#5f6368',
    marginBottom: '8px',
    letterSpacing: '0.01em',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#202124',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: '"Roboto", Arial, sans-serif',
    marginBottom: '20px',
    transition: 'border-color 0.15s ease',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '24px',
  },
  saveBtn: {
    backgroundColor: '#1558b0',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: '"Roboto", Arial, sans-serif',
    letterSpacing: '0.01em',
    transition: 'background-color 0.15s ease',
  },
  saveBtnSuccess: {
    backgroundColor: '#188038',
    cursor: 'default',
  },
  resetBtn: {
    backgroundColor: '#fff',
    color: '#5f6368',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: '"Roboto", Arial, sans-serif',
    letterSpacing: '0.01em',
    transition: 'border-color 0.15s ease',
  },
  hint: {
    fontSize: '12px',
    color: '#9aa0a6',
    margin: '0',
    lineHeight: '1.6',
  },
  code: {
    fontFamily: '"Roboto Mono", monospace',
    fontSize: '11px',
    backgroundColor: '#f1f3f4',
    padding: '1px 4px',
    borderRadius: '3px',
    color: '#5f6368',
  },
};
