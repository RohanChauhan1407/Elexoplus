import product from "../../assets/product.png"

//Dummy data is already filled for this card
//Product data will be fetched from the Backend
//Replace id with productname,category,price 
 
function MainCard ({ id }) {
    return (
        <div className="flex-shrink-0 bg-lightGray h-lg w-2xs overflow-hidden shadow-md hover:shadow-yellow-400/20 transition-shadow duration-300">
            <img src={product} alt="product" className="w-[18rem] h-[18rem] object-cover" />
            <div className="p-4">
                <h1 className="text-gray-200 font-semibold truncate">Product Name {id}</h1>{/*Fetch product Name */}
                <p className="text-gray-400 text-xs pb-4">Category</p>
                <p className="text-yellow font-bold">₹ {(Math.random() * 1000).toFixed(0)}</p>
            </div>
        </div>
    );
};

export default MainCard;