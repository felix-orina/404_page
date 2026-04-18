import { useEffect, useState } from 'react';

const ERROR_CODES = [
  'ERR_CONNECTION_REFUSED',
  'ERR_NAME_NOT_RESOLVED',
  'ERR_ADDRESS_UNREACHABLE',
  'ERR_CONNECTION_TIMED_OUT',
  'ERR_NETWORK_CHANGED',
];

function getRandomErrorCode() {
  return ERROR_CODES[Math.floor(Math.random() * ERROR_CODES.length)];
}

export default function ErrorPage() {
  const [domain, setDomain] = useState('helbsacco.co.ke');
  const [errorCode] = useState(getRandomErrorCode);

  useEffect(() => {
    const saved = localStorage.getItem('fakeDomain');
    if (saved) setDomain(saved);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.iconWrapper}>
          <svg
            style={styles.icon}
            viewBox="0 0 72 72"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <circle cx="36" cy="36" r="36" fill="#dadce0" />
            <path
              d="M36 20a16 16 0 1 0 0 32A16 16 0 0 0 36 20zm0 28a12 12 0 1 1 0-24 12 12 0 0 1 0 24z"
              fill="#9aa0a6"
            />
            <path
              d="M20 34h32v4H20z"
              fill="#9aa0a6"
              transform="rotate(-45 36 36)"
            />
          </svg>
        </div>

        <h1 style={styles.heading}>This site can't be reached</h1>
        <p style={styles.subtext}>
          <strong>{domain}</strong> refused to connect.
        </p>

        <div style={styles.suggestions}>
          <p style={styles.suggestionsTitle}>Try:</p>
          <ul style={styles.list}>
            <li>Checking the connection</li>
            <li>Checking the proxy and the firewall</li>
          </ul>
        </div>

        <p style={styles.errorCode}>{errorCode}</p>

        <div style={styles.buttonRow}>
          <button
            style={styles.reloadBtn}
            onClick={() => window.location.reload()}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1a73e8')
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1558b0')
            }
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Roboto", Arial, sans-serif',
    color: '#202124',
  },
  container: {
    maxWidth: '560px',
    width: '100%',
    padding: '48px 24px',
    textAlign: 'left',
  },
  iconWrapper: {
    marginBottom: '24px',
  },
  icon: {
    width: '72px',
    height: '72px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '400',
    color: '#202124',
    margin: '0 0 16px 0',
    lineHeight: '1.3',
  },
  subtext: {
    fontSize: '14px',
    color: '#5f6368',
    margin: '0 0 24px 0',
    lineHeight: '1.6',
  },
  suggestions: {
    marginBottom: '24px',
  },
  suggestionsTitle: {
    fontSize: '13px',
    color: '#5f6368',
    margin: '0 0 8px 0',
    fontWeight: '500',
  },
  list: {
    margin: '0',
    paddingLeft: '20px',
    fontSize: '13px',
    color: '#5f6368',
    lineHeight: '2',
  },
  errorCode: {
    fontSize: '12px',
    color: '#9aa0a6',
    marginBottom: '32px',
    letterSpacing: '0.01em',
  },
  buttonRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  reloadBtn: {
    backgroundColor: '#1558b0',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: '"Roboto", Arial, sans-serif',
    transition: 'background-color 0.15s ease',
    letterSpacing: '0.01em',
  },
};
