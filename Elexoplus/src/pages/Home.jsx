import HeroSection from "../components/Home/HeroSection"
import Elevate from "../components/Home/Elevate"
import CatalogSection from "../components/Home/CatalogSection"
import ProductCarousel from "../components/Home/ProductCarousel"
import NewsletterSubscription from "../components/Home/NewsletterSubscription"



function Home(){
    return (
        <>
        <HeroSection/>
        <div className="md:px-20">
            <ProductCarousel title={'New Arrivals'}/>
            <Elevate/>
            <ProductCarousel title={'Trending Now'}/>
            <ProductCarousel title={'Best Sellers'}/>
            <CatalogSection/>
            <NewsletterSubscription/>
        </div>
        </>
    )
}

export default Home