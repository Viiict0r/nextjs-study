import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    /** Dynamic imports */
    const math = (await import('../lib/math')).default;

    alert(math.sum(2, 5));
  }

  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((product: IProduct) => {
            return (
              <li key={product.id}>
                {product.title}
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const data = await response.json();

  return {
    props: {
      recommendedProducts: data,
    }
  }
}
