export default function ProductImage({ src, alt, className = "" }) {
  return (
    <img src={src} alt={alt} loading="lazy" className={className}
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x450/e8efff/2563eb?text=" + encodeURIComponent(alt.slice(0, 22)); }} />
  );
}
