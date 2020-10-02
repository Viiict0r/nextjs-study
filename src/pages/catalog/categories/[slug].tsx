import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}


export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <ul>
        {products.map((product: IProduct) => {
          return (
            <li key={product.id}>
              {product.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3333/categories`);
  const categories = await response.json();

  /**
   * Buscar apenas conteúdos importantes,
   * ou deixar a lista de paths vazia (recomendado).
   */

  const paths =  categories.map(category => {
    return {
      params: {
        slug: category.id
      }
    }
  })

  return {
    paths,
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params; // Include normal params and query params

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60, // Generate a new static page in range of 5 seconds
  }
}
