import Image from "next/image";
import { photos, type PhotoKey } from "@/content/site";
import styles from "./Photo.module.css";

type Props = {
  name: PhotoKey;
  /** Atitinka CSS išdėstymą, pvz. "(min-width: 900px) 50vw, 100vw" */
  sizes: string;
  /** Hero / LCP nuotrauka: įkeliama iškart su aukštu prioritetu */
  priority?: boolean;
  className?: string;
  /** object-position, pvz. "50% 20%" */
  position?: string;
  reveal?: boolean;
};

/**
 * Nuotrauka, užpildanti tėvinį konteinerį (dydį ir proporcijas nustato dizaino CSS).
 * Jei nuotraukos nėra – rodomas neutralus placeholderis.
 */
export default function Photo({ name, sizes, priority, className, position, reveal = true }: Props) {
  const photo = photos[name];
  const cls = [styles.frame, className].filter(Boolean).join(" ");

  if (!photo.src) {
    return (
      <div className={`${cls} ${styles.placeholder}`} role="img" aria-label={photo.alt}>
        <span>{photo.placeholder}</span>
      </div>
    );
  }

  return (
    <div className={cls} data-reveal={reveal ? "image" : undefined}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        quality={85}
        style={{ objectFit: "cover", objectPosition: position ?? "50% 30%" }}
      />
    </div>
  );
}
