import Image from "next/image";

import ProductList from "@/components/common/product-list";
import { db } from "@/db";

import { Header } from "../components/common/header";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });

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

        <ProductList products={products} title="Mais vendidos" />

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
    </>
  );
};

export default Home;
