export default async function AboutPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return (
    <div>
      {data.map((item: { id: number; title: string }) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
