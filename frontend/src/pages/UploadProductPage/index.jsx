import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";

const continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Aisa" },
    { key: 4, value: "North America" },
    { key: 5, value: "AfriSouth America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
];

const UploadProductPage = () => {
    const [product, setProduct] = useState({
        title: "",
        discription: "",
        price: 0,
        continents: 1,
        images: [],
    });
    console.log(product);
    const userData = useSelector((state) => state.user?.userData);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleImages = (newImages) => {
        setProduct((prevState) => ({
            ...prevState,
            images: newImages,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userData);
        const body = {
            writer: userData.id,
            ...product,
        };
        try {
            await axiosInstance.post("/products", body);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <section>
            <div className="text-center m-7">
                <h1>예상 상품 업로드</h1>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
                <FileUpload
                    images={product.images}
                    onImageChange={handleImages}
                />
                <div className="mt-4">
                    <label htmlFor="title">이름</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        value={product.title}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="discription">설명</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        name="discription"
                        id="discription"
                        onChange={handleChange}
                        value={product.discription}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="price">가격</label>
                    <input
                        className="w-full px-4 py-2 bg-white border rounded-md"
                        type="number"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        value={product.price}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="continents">지역</label>
                    <select
                        className="w-full px-4 py-2 mt-2 bg-white border rounded-md "
                        name="continents"
                        id="continents"
                        onChange={handleChange}
                        value={product.continents}
                    >
                        {continents.map((item) => (
                            <option
                                className="w-full px-4 text-white bg-gray-700 rounded-md hover:bg-gray-700 py-2"
                                key={item.key}
                                value={item.key}
                            >
                                {item.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full px-4 text-white duration-200 transform bg-black rounded-md hover:bg-gray-700 py-2"
                    >
                        생성하기
                    </button>
                </div>
            </form>
        </section>
    );
};

export default UploadProductPage;
