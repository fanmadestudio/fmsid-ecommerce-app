import NextImage from "next/image";
import NextLink from "next/link";
import { useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useInView } from "react-intersection-observer";
import { TApiAllCategoriesResp } from "../types";

import Header from "./Header";
import HiddenFiltersSorting from "./HiddenFiltersSorting";
import SortByFilters from "./SortByFilters";

interface IProductGrid extends TApiAllCategoriesResp {
  showLink: boolean;
  hasMore?: boolean;
  loadMoreFun?: Function;
}

const ProductGrid = (props: IProductGrid) => {
  const { categories, showLink, loadMoreFun, hasMore } = props;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (loadMoreFun) loadMoreFun();
    }
  }, [inView, loadMoreFun]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Header />
        <HiddenFiltersSorting />

        <div className="lg:grid lg:grid-cols-4 lg:gap-6 ">
          <SortByFilters />

          {/* className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8" */}
          <div className="mt-4 lg:mt-8 lg:col-span-3 lg:grid lg:grid-cols-3 lg:items-start lg:gap-8">
            {categories.map((category) => (
              <div className="lg:col-span-3 lg:mx-auto" key={category.name}>
                <div className="flex justify-between my-6">
                  {/* Category Btn */}
                  <button className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring">
                    <span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
                      {category.name}
                    </span>
                  </button>
                  {showLink && (
                    <NextLink href={`/category/${category.id}`}>
                      <p className="flex flex-row gap-2 underline hover:cursor-pointer items-center">
                        View More
                        <AiOutlineRight />
                      </p>
                    </NextLink>
                  )}
                </div>

                <div className="lg:col-span-3">
                  {/* <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> */}
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-end">
                    {category?.products.map((product) => (
                      <li key={product.title}>
                        <a href="#" className="group block overflow-hidden">
                          <NextImage
                            priority={true}
                            src={`${product.image}`}
                            width={100}
                            height={350}
                            alt={product.title}
                            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                          />

                          <div className="relative bg-white pt-3">
                            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                              {product.title}
                            </h3>

                            <p className="mt-2">
                              <span className="sr-only"> Regular Price </span>

                              <span className="tracking-wider text-gray-900">
                                {" "}
                                {product.price}{" "}
                              </span>
                            </p>
                            <div className="mt-6 mb-6">
                              <NextLink href={`/product/${product.title}`}>
                                <p className="relative flex items-center justify-center rounded-md border border-transparent bg-sky-800 py-2 px-8 text-sm font-medium text-white hover:bg-sky-900 hover:cursor-pointer">
                                  View More Details
                                </p>
                              </NextLink>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {!showLink && (
                  <div className="flex items-center justify-center mt-8">
                    {hasMore ? (
                      <button
                        ref={ref}
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-sky-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-900"
                      >
                        Loading...
                      </button>
                    ) : (
                      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 w-full">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              You have viewed all the Products under this
                              category.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {showLink && (
                  <div className="w-full border-b border-gray-300 mt-24" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
