import { BrandItem } from "./brand-item";

interface BrandListProps {
  title: string;
  brandList: Brand[];
}

interface Brand {
  id: number;
  name: string;
  image: string;
}

const BrandList = ({ brandList, title }: BrandListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex w-full justify-between gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {brandList.map((brand) => (
          <BrandItem key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default BrandList;
