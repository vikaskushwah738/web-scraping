"use client";
import useStore from "@/hooks/olx-products";
export default function Products() {
    const products = useStore((state: any) => state.products);
    return (
        <div className="w-full pt-10">
            {products?.length > 0 ? (  
                <div className="space-x-4">
                    {products?.map((product: any, index: number) =>  
                        product?.title ? (
                            <div key={index} className="border-4 bg-white rounded-lg border-neutral-200">
                                <div className="w-full flex items-top justify-between">
                                    <h3 className="text-xl font-medium text-gray-800">{product?.title}</h3> {/* Changed 'products' to 'product' */}
                                    <a 
                                        href={product?.url}  
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="hover:bg-gray-200 border px-3 py-1 ml-2 rounded-md h-[35px]"
                                    >
                                        Link
                                    </a>
                                </div>
                            <p className="text-md font-medium text-gray-500">
                                {product?.price}
                            </p>
                            <p className="text-sm text-gray-700 mt-2">
                                {product?.description}
                            </p>
                            </div>
                        ) : null
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-600">No Products Exist</p>  
            )}
        </div>
    );
}
