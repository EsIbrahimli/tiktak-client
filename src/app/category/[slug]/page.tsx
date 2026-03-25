

export default function Category({ params }: { params: { id: string } }) {
  return (
    <div>Category: {params.id}</div>
  );
}