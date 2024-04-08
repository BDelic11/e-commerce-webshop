import SingleProductPageComponent from "@/pages/client/SingleProductPageComponent";

export default function SingleProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <SingleProductPageComponent productId={params.id} />
    </>
  );
}
