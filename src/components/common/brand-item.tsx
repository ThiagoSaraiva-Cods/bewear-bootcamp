import Image from "next/image";

interface Brand {
  id: number;
  name: string;
  image: string;
}

export const BrandItem = ({ brand }: { brand: Brand }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2">
      <div className="flex min-h-24 min-w-24 items-center justify-center rounded-3xl border-2 border-solid border-[#F1F1F1]">
        <Image
          src={brand.image}
          alt={brand.name}
          width={12}
          height={12}
          sizes="100vw"
          className="h-4 w-auto"
        />
      </div>
      <p className="text-md font-medium">{brand.name}</p>
    </div>
  );
};
