import styles from "./ScrollWords.module.css";

type Props = { text: string; className?: string; as?: "p" | "h2" };

/**
 * Tekstas, kurio žodžiai „užsidega“ slenkant (CSS scroll-driven animacijos).
 * Naršyklėse be palaikymo ir su reduced motion – tekstas iškart pilnai matomas.
 */
export default function ScrollWords({ text, className, as: Tag = "p" }: Props) {
  return (
    <Tag className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className={styles.word}>
          {w}{" "}
        </span>
      ))}
    </Tag>
  );
}
