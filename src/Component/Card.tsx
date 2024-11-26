import { useEffect, useState } from "react";
import { fetchProducts, filterByCategory, addtocart } from "../Reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import ProductCardProps from "../Type/Interface";

const Card: React.FC<ProductCardProps> = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedCategory, setSelectedCategory] = useState("All");

    const { filteredProducts, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Filter products when category changes
    useEffect(() => {
        dispatch(filterByCategory(selectedCategory));
    }, [dispatch, selectedCategory]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    function sendData(item: any) {
        dispatch(addtocart(item));
        alert('Data Added Successfully!');
    }

    function handleCategoryChange(category: string) {
        setSelectedCategory(category);
    }

    return (
        <>
            <section className="flex justify-between px-2 md:px-16 py-5 pt-5">
                <h1 className="text-xl font-bold">NEW PRODUCTS</h1>
                {/* Filter Category */}
                <ul className="flex gap-6 font-semibold text-gray-500">
                    <li>
                        <button className={`active:text-red-500 ${selectedCategory === "All" ? "text-red-500" : ""}`}
                            onClick={() => handleCategoryChange("All")}>All</button>
                    </li>
                    <li>
                        <button className={`active:text-red-500 ${selectedCategory === "Beauty" ? "text-red-500" : ""}`}
                            onClick={() => handleCategoryChange("Beauty")}>Beauty</button>
                    </li>
                    <li>
                        <button className={`active:text-red-500 ${selectedCategory === "Fragrances" ? "text-red-500" : ""}`}
                            onClick={() => handleCategoryChange("Fragrances")}>Fragrances</button>
                    </li>
                    <li>
                        <button className={`active:text-red-500 ${selectedCategory === "Furniture" ? "text-red-500" : ""}`}
                            onClick={() => handleCategoryChange("Furniture")}>Furniture</button>
                    </li>
                    <li>
                        <button className={`active:text-red-500 mr-3 ${selectedCategory === "Groceries" ? "text-red-500" : ""}`}
                            onClick={() => handleCategoryChange("Groceries")}>Groceries</button>
                    </li>
                </ul>
            </section>

            <main className="p-4 px-16 flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Card */}
                    {filteredProducts.map((item) => (
                        <div key={item.id} className="bg-white w-96 mx-auto md:w-56 lg:w-64 lg:mx-auto md:mx-auto rounded-lg shadow-lg hover:border-red-500 cursor-pointer relative border border-gray-300 transition-all duration-300 max-w-sm">

                            <img src={item.thumbnail} alt="" className="rounded-t-lg w-full h-48 object-cover p-4" />

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-gray-600 text-sm prose pb-3">{item.description}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="absolute bottom-2 left-3">
                                        <span className="text-base font-bold text-red-600">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-1 right-3">
                                        <button onClick={() => sendData(item)}
                                            className="px-4 py-2 bg-transparent font-semibold transition-all duration-300 hover:text-white text-black rounded-md hover:bg-red-600 ">
                                            <i className="fa-solid fa-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Card;