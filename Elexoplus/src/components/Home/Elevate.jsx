import product from "../../assets/product.png"

function Elevate (){
    return (
        <>
        <div className="flex justify-center max-md:flex-col max-md:px-10  md:px-20 py-20 gap-8 md:gap-4">
            <div className="content-center">
                <h1 className="text-4xl md:text-5xl text-yellow pb-2 md:pb-10 uppercase">Elevate Your Everyday</h1>
                <p className="text-base md:text-2xl text-gray-400">Introducing Elexoplus innovations, designed to redefine your daily comfort.</p>
            </div>
            <div className="w-full max-w-sm md:w-1/2 lg:w-2/3 md:max-w-md">
            <img 
                src={product} 
                alt="Elexoplus product innovation" 
                className="h-auto w-full shadow-2xl" 
            />
            </div>
        </div>
        </>
    )
}

export default Elevate