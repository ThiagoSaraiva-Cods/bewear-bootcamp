import { desc } from "drizzle-orm";
import Image from "next/image";

import BrandList from "@/components/common/brand-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

import { Header } from "../components/common/header";

const Brands = [
  { id: 1, name: "Nike", image: "/brands/nike.svg" },
  { id: 2, name: "Adidas", image: "/brands/adidas.svg" },
  { id: 3, name: "Puma", image: "/brands/puma.svg" },
  { id: 4, name: "New Balance", image: "/brands/newBalance.svg" },
  { id: 5, name: "Converse", image: "/brands/converse.svg" },
  { id: 6, name: "Polo", image: "/brands/polo.svg" },
  { id: 7, name: "Zara", image: "/brands/zara.svg" },
];

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
    orderBy: [desc(productTable.createdAt)],
    limit: 4,
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-desktop-1.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="px-5">
          <BrandList brandList={Brands} title="Marcas parceiras" />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />

        <div className="px-5">
          <Image
            src="/banner-desktop-2.png"
            alt="Seja autêntico"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
