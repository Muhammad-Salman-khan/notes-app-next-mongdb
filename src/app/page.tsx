import dbConnent from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  await dbConnent();
  const res = await fetch("http://localhost:3000/api/notes", {
    cache: "default",
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data ");
    return;
  }
  const data = await res.json();
  console.log(data);
  return (
    <>
      {data.data.map(({ _id, title, content }) => (
        <div key={_id}>
          {title}
          {content}
        </div>
      ))}
    </>
  );
}
