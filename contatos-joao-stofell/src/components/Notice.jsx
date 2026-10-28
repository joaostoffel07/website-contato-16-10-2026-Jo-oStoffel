export default function Notice({ message, variant = 'error' }) {
  if (!message) return null;
  return <p className={`notice notice-${variant}`} role={variant === 'error' ? 'alert' : 'status'}>{message}</p>;
}
