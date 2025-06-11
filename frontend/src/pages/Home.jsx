import Hero from '../components/Layout/Hero'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeatureSection from '../components/Products/FeatureSection'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductsDetails from '../components/Products/ProductsDetails'

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        {/* Best Sellers */}
        <h2 className="text-3xl text-center font-bold mb-4">Best Sellers</h2>
        <ProductsDetails/>
        <FeaturedCollection/>
        <FeatureSection/>
    </div>
  )
}

export default Home