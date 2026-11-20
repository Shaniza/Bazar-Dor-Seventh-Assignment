type Props = {
  name: string;
  image?: string | null;
  size?: number;
};

export default function Avatar({ name, image, size = 36 }: Props) {
  const style = { width: size, height: size };

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        style={style}
        referrerPolicy="no-referrer"
        className="shrink-0 rounded-full object-cover"
      />
    );
  }
 
  const initial = Array.from(name.trim())[0] ?? "?";
  return (
    <span
      style={style}
      className="flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-content"
    >
      {initial.toUpperCase()}
    </span>
  );
}