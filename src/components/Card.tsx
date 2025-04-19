export default function Card({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <img src={imageUrl} alt={title} className="h-40 w-full object-cover" />
    </div>
  );
}
