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
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
    </div>
  );
}
