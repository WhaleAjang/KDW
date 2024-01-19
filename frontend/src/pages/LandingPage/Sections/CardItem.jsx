import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";

//eslint-disable-next-line
const CardItem = ({ product }) => {
    return (
        <div className="border-[1px] border-gray-300">
            {/* eslint-disable-next-line */}
            <ImageSlider images={product.images} />
            {/* eslint-disable-next-line */}
            <Link to={`/product/${product._id}`}>
                {/* eslint-disable-next-line */}
                <p className="p-1">{product.title}</p>
                {/* eslint-disable-next-line */}
                <p className="p-1">{product.continents}</p>
                {/* eslint-disable-next-line */}
                <p className="p-1 text-xs text-gray-500">{product.price}원</p>
            </Link>
        </div>
    );
};

export default CardItem;
