import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import SEO from '@/components/SEO';

// Dynamic component importing
const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
)

export default function Product() {
  const router = useRouter();
  const [cartModalVisible, setCartModalVisible] = useState(false);

  function handleAddToCart() {
    setCartModalVisible(true);
  }

  return (
    <div>
      <SEO title="DevCommerce, shop title" />
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      { cartModalVisible && <AddToCartModal /> }
    </div>
  )
}
